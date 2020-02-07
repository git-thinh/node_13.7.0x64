#include <iostream>

#include <windows.h>

/////////////////////////////////////////////////////////////////////////////////////////////

#include <restbed>
using namespace restbed;

/////////////////////////////////////////////////////////////////////////////////////////////

#include "leveldb/db.h"
leveldb::DB* db;
leveldb::Options options;

/////////////////////////////////////////////////////////////////////////////////////////////

using namespace std;

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

//Bytes String::to_bytes(const string& value)
//{
//	return Bytes(value.begin(), value.end());
//}
//
string String::to_string(const Bytes& value)
{
	return string(value.begin(), value.end());
}

void post_method_handler(const shared_ptr< Session > session)
{
	const auto request = session->get_request();
	int content_length = request->get_header("Content-Length", 0);

	if (content_length == 0)
	{
		session->close(OK, "0", { { "Content-Length", "1" } });
	}
	else {
		session->fetch(content_length, [](const shared_ptr< Session > session, const Bytes& body) {
			int size = (int)body.size();
			string key = session->get_request()->get_query_parameter("key", "");
			//const restbed::Byte* buf = body.data();
			string value = String::to_string(body);

			//fprintf(stdout, "%.*s\n", size, buf);
			std::cout << key << " = " << value << std::endl;
			
			if (key.length() == 0 || size == 0)
			{
				session->close(OK, "0", { { "Content-Length", "1" } });
			}
			else {
				leveldb::Status s = db->Put(leveldb::WriteOptions(), key, value);
				if (s.ok()) {
					session->close(OK, "1", { { "Content-Length", "1" } });
				}
				else {
					session->close(OK, "0", { { "Content-Length", "1" } });
				}
			}
		});
	}
}

void get_method_handler(const shared_ptr< Session > session)
{
	string key = session->get_request()->get_query_parameter("key", "");
	std::string value = "";
	if (key.length() > 0) {
		leveldb::Status s = db->Get(leveldb::ReadOptions(), key, &value);
		if (s.ok()) 
			session->close(OK, value, { { "Content-Length", to_string(value.length()) }, { "Content-Type", "text/plain" } });
		else session->close(OK, "", { { "Content-Length", "0" } });
	}
	else session->close(OK, "", { { "Content-Length", "0" } });
}

std::wstring s2ws(const std::string& s)
{
	int len;
	int slength = (int)s.length() + 1;
	len = MultiByteToWideChar(CP_ACP, 0, s.c_str(), slength, 0, 0);
	wchar_t* buf = new wchar_t[len];
	MultiByteToWideChar(CP_ACP, 0, s.c_str(), slength, buf, len);
	std::wstring r(buf);
	delete[] buf;
	return r;
}

void httpServer_Start(int argc, char** argv) {
	string ip = "127.0.0.1";
	//ip = "192.168.10.54";
	int port = 2626;

	//std::cout << "22222Have " << argc << " arguments:" << std::endl;
	for (int i = 0; i < argc; ++i) {
		//std::cout << argv[i] << std::endl;
		if (i == 1) {
			long arg = strtol(argv[i], NULL, 10);
			port = (int)arg;

			std::cout << "PORT = " << port << std::endl;
		}
	}

	std::wstring stemp = s2ws("leveldb " + ip + ":" + to_string(port));
	LPCWSTR result = stemp.c_str();
	SetConsoleTitle(result);

	auto resource = make_shared< Resource >();
	resource->set_path("/");
	resource->set_method_handler("GET", get_method_handler);
	resource->set_method_handler("POST", post_method_handler);

	auto settings = make_shared<Settings>();
	settings->set_port(port);
	settings->set_bind_address(ip);
	settings->set_default_header("Connection", "close");

	Service service;
	service.publish(resource);
	service.start(settings);
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

int main(int argc, char** argv)
{
	options.create_if_missing = true;
	leveldb::Status status = leveldb::DB::Open(options, "c:\\leveldb", &db);

	std::cout << "leveldb state = " << to_string(status.ok()) << std::endl;




	httpServer_Start(argc, argv);

	return EXIT_SUCCESS;
}