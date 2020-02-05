using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Net.Sockets;

namespace raw2tcp
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length > 1)
            {
                string file = args[1];
                if (File.Exists(file))
                {
                    int port = 0;
                    if (int.TryParse(args[0], out port) && port > 0)
                    {
                        //Console.WriteLine(args[0] + " " + args[1]);
                        try
                        {
                            TcpClient client = new TcpClient();
                            //client.Connect("52.77.82.145", 80);
                            client.Connect("127.0.0.1", port);
                            //client.Connect(host, port);

                            //var client = new TcpClient("apimobi.f88.vn", 80);
                            //var client = new TcpClient("localhost", 9015);
                            //var client = new TcpClient("localhost", 3456);

                            //byte[] buffer = System.Text.Encoding.UTF8.GetBytes(message);
                            byte[] buffer = File.ReadAllBytes(file);

                            NetworkStream stream = client.GetStream();
                            stream.Write(buffer, 0, buffer.Length); //sends bytes to server
                            stream.Flush();
                            stream.Close();
                            client.Close();

                            Console.WriteLine("Send file " + file + "[" + buffer.Length.ToString() + "] to TCP:" + port.ToString() + " success");
                        }
                        catch
                        {
                        }
                    }
                }
            }
        }
    }
}
