
#include <iostream>
#include <windows.h>

#include "leveldb/db.h"

#include <restbed>

#include <nlohmann/json.hpp>
// for convenience
using json = nlohmann::json;


using namespace restbed;
using namespace std;

leveldb::DB* db;
leveldb::Options options;
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

//Bytes to_bytes(const string& value)
//{
//	return Bytes(value.begin(), value.end());
//}

string to_string2(const Bytes& value)
{
	return string(value.begin(), value.end());
}

void post_method_handler(const shared_ptr< Session > session)
{
	const auto request = session->get_request();
	int content_length = request->get_header("Content-Length", 0);

	if (content_length == 0)
	{
		session->close(OK, "", { { "Content-Length", "0" } });
	}
	else {
		session->fetch(content_length, [](const shared_ptr< Session > session, const Bytes& body) {
			int size = (int)body.size();
			string key = session->get_request()->get_query_parameter("key", "");
			//const restbed::Byte* buf = body.data();
			string value = to_string2(body);

			//fprintf(stdout, "%.*s\n", size, buf);
			//std::cout << key << " = " << value << std::endl;
			
			if (key.length() == 0 || size == 0)
			{
				session->close(OK, "", { { "Content-Length", "0" } });
			}
			else {
				leveldb::Status s = db->Put(leveldb::WriteOptions(), key, value);
				if (s.ok()) {
					session->close(OK, "OK", { { "Content-Length", "2" } });
				}
				else {
					session->close(OK, "", { { "Content-Length", "0" } });
				}
			}
		});
	}
}

void get_all_keys_method_handler(const shared_ptr< Session > session)
{
	vector<string> keys;
	leveldb::Iterator* it = db->NewIterator(leveldb::ReadOptions());
	for (it->SeekToFirst(); it->Valid(); it->Next()) {
		//cout << it->key().ToString() << ": " << it->value().ToString() << endl;
		keys.push_back(it->key().ToString());
	}
	//assert(it->status().ok());  // Check for any errors found during the scan
	bool ok = it->status().ok();
	delete it;

	if (ok) {
		json j = keys;
		std::string value = j.dump(4);
		session->close(OK, value, { { "Content-Length", to_string(value.length()) }, { "Content-Type", "application/json" } });
	}else 
		session->close(OK, "[]", { { "Content-Length", "2" }, { "Content-Type", "application/json" } });
}

void get_all_keys_values_method_handler(const shared_ptr< Session > session)
{
	json j;
	leveldb::Iterator* it = db->NewIterator(leveldb::ReadOptions());
	for (it->SeekToFirst(); it->Valid(); it->Next()) {
		//cout << it->key().ToString() << ": " << it->value().ToString() << endl;
		j[it->key().ToString()] = it->value().ToString();
	}
	//assert(it->status().ok());  // Check for any errors found during the scan
	bool ok = it->status().ok();
	delete it;

	if (ok) {
		std::string value = j.dump(4);
		session->close(OK, value, { { "Content-Length", to_string(value.length()) }, { "Content-Type", "application/json" } });
	}
	else
		session->close(OK, "[]", { { "Content-Length", "2" }, { "Content-Type", "application/json" } });
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
void get_remove_method_handler(const shared_ptr< Session > session)
{
	string key = session->get_request()->get_query_parameter("key", "");
	if (key.length() > 0) {
		leveldb::Status s = db->Delete(leveldb::WriteOptions(), key);
		if (s.ok()) session->close(OK, "OK", { { "Content-Length", "2" } });
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
	resource->set_method_handler("DELETE", get_remove_method_handler);
	resource->set_method_handler("PUT", get_all_keys_method_handler);
	resource->set_method_handler("OPTIONS", get_all_keys_values_method_handler);

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