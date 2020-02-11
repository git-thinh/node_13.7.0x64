node --max-old-space-size=4096 logview.js
node --max-old-space-size=4096 logview-err.js

node --max-old-space-size=4096 app.js
node --max-old-space-size=4096 db2txt.js

.\txt2tcp.exe 1000


.\vcpkg install leveldb:x86-windows
.\vcpkg install restbed leveldb
.\vcpkg export restbed leveldb --zip
.\vcpkg export gtest zlib gtest:x64-windows zlib:x64-windows --nuget


protoc.exe --grpc_out=. --plugin=protoc-gen-grpc=grpc_cpp_plugin.exe message.proto
protoc.exe --grpc_out=. --plugin=protoc-gen-grpc=grpc_node_plugin.exe message.proto
protoc.exe --grpc_out=. --plugin=protoc-gen-grpc=grpc_csharp_plugin.exe message.proto

protoc.exe --cpp_out=message.proto



npm install grpc
npm install redis
npm install uuid















# https://github.com/coreybutler/node-windows

npm install dotenv mssql cron body-parser express socket.io lodash node-fetch -S

npm install node-windows dotenv mssql cron body-parser express web-push socket.io lodash node-fetch -S

npm install -g node-windows
npm install dotenv

npm install web-push

npm install node-cache --save
npm install lodash --save
npm install socket.io
npm install node-fetch --save

npm install cron



npm install body-parser express -S
npm install mssql
npm install --save cors







services.msc

httpd.exe -k install -n "Apache HTTP Server"
nginx.exe -k install -n "NGINX HTTP Server"

nginx.exe -s start
nginx.exe -s stop

TASKKILL /F /IM "nginx*"

TASKKILL /F /IM "httpd*"

Update-Package -reinstall

 cd C:\nginx
 .\nginx.exe

RUN > Certmgr.msc






