
#include <iostream>
#include <windows.h>
#include <string>
#include <map>

#include <grpcpp/grpcpp.h>
#include "message.pb.h"
#include "message.grpc.pb.h"
using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;

using CacheService::CacheRequest;
using CacheService::CacheMsgRequest;
using CacheService::CacheMsgReply;

#include "leveldb/db.h"

#include <restbed>
using namespace restbed;

#include <nlohmann/json.hpp>
using json = nlohmann::json;

using namespace std;

leveldb::DB* db;
leveldb::Options options;
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

	// Value-Defintions of the different String values
static enum STRING_COMMAND {
	CMD_NONE,
	CMD_GET_BY_KEY,
	CMD_ADDNEW,
	CMD_UPDATE,
	CMD_DELETE,
	CMD_GET_ALL_KEY,
	CMD_GET_ALL_KEY_VALUE
};
// Map to associate the strings with the enum values
static std::map<std::string, STRING_COMMAND> s_mapStringCommands;

class CacheServiceImplementation final : public CacheRequest::Service {

	Status SendMessage(
		ServerContext* context,
		const CacheMsgRequest* request,
		CacheMsgReply* reply
	) override {
		string _id = request->_id();
		string func = request->func();
		string key = request->key();
		string value = request->value();
		string config = request->config();

		string data = "";
		leveldb::Status state;
		bool ok = false;

		switch (s_mapStringCommands[func])
		{
		case CMD_GET_BY_KEY:
			state = db->Get(leveldb::ReadOptions(), key, &data);
			break;
		case CMD_ADDNEW:
		case CMD_UPDATE:
			state = db->Put(leveldb::WriteOptions(), key, value);
			break;
		case CMD_DELETE:
			state = db->Delete(leveldb::WriteOptions(), key);
			break;
		case CMD_GET_ALL_KEY:
			if (true) {
				vector<string> keys;
				leveldb::Iterator* its = db->NewIterator(leveldb::ReadOptions());
				for (its->SeekToFirst(); its->Valid(); its->Next()) {
					//cout << it->key().ToString() << ": " << it->value().ToString() << endl;
					keys.push_back(its->key().ToString());
				}
				//assert(it->status().ok());  // Check for any errors found during the scan
				ok = its->status().ok();
				delete its;

				if (ok) {
					json j = keys;
					data = j.dump(4);
				}
			}
			break;
		case CMD_GET_ALL_KEY_VALUE:
			if (true) {
				json j;
				leveldb::Iterator* it = db->NewIterator(leveldb::ReadOptions());
				for (it->SeekToFirst(); it->Valid(); it->Next()) {
					//cout << it->key().ToString() << ": " << it->value().ToString() << endl;
					j[it->key().ToString()] = it->value().ToString();
				}
				//assert(it->status().ok());  // Check for any errors found during the scan
				ok = it->status().ok();
				delete it;

				if (ok) {
					data = j.dump(4);
				}
			}
			break;
		default:
			break;
		}

		reply->set__id(_id.c_str());
		reply->set_data(data.c_str());
		reply->set_ok(ok);

		return Status::OK;
	}
};

void grpc_Start() { 
	s_mapStringCommands["KEY"] = CMD_GET_BY_KEY;
	s_mapStringCommands["ADDNEW"] = CMD_ADDNEW;
	s_mapStringCommands["UPDATE"] = CMD_UPDATE;
	s_mapStringCommands["DELETE"] = CMD_DELETE;
	s_mapStringCommands["ALL_KEY"] = CMD_GET_ALL_KEY;
	s_mapStringCommands["ALL_KEY_VALUE"] = CMD_GET_ALL_KEY_VALUE;

	std::string address("0.0.0.0:5000");
	CacheServiceImplementation service;

	ServerBuilder builder;

	builder.AddListeningPort(address, grpc::InsecureServerCredentials());
	builder.RegisterService(&service);

	std::unique_ptr<Server> server(builder.BuildAndStart());
	std::cout << "Server listening on port: " << address << std::endl;

	server->Wait();
}

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
	}
	else
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
	std::cout << "API PORT = " << port << std::endl;
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

int main(int argc, char** argv)
{
	options.create_if_missing = true;
	leveldb::Status status = leveldb::DB::Open(options, "c:\\leveldb", &db);
	std::cout << "leveldb state = " << to_string(status.ok()) << std::endl;

	grpc_Start();
	//httpServer_Start(argc, argv);

	return EXIT_SUCCESS;
}