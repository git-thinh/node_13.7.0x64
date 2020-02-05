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
            if (args.Length > 0)
            {
                if (Directory.Exists("txt"))
                {
                    string[] fs = Directory.GetFiles("txt", "*.txt");
                    if (fs.Length == 0) return;

                    int port = 0;
                    if (int.TryParse(args[0], out port) && port > 0)
                    {
                        string file;
                        for (int i = 0; i < fs.Length; i++)
                        {
                            file = fs[i];

                            try
                            {
                                TcpClient client = new TcpClient();
                                client.Connect("127.0.0.1", port);

                                byte[] buffer = File.ReadAllBytes(file);

                                NetworkStream stream = client.GetStream();
                                stream.Write(buffer, 0, buffer.Length); //sends bytes to server
                                stream.Flush();

                                stream.Close();
                                client.Close();

                                Console.WriteLine("[" + (i + 1) + "|" + fs.Length + "] " + Path.GetFileName(file) + ": " + buffer.Length.ToString() + " bytes send ok");
                            }
                            catch
                            {
                            }
                        }//end for

                        //try
                        //{
                        //    TcpClient client = new TcpClient();
                        //    client.Connect("127.0.0.1", port);
                        //    byte[] buffer = Encoding.ASCII.GetBytes("OK");
                        //    NetworkStream stream = client.GetStream();
                        //    stream.Write(buffer, 0, buffer.Length); //sends bytes to server
                        //    stream.Flush();

                        //    stream.Close();
                        //    client.Close();
                        //}
                        //catch
                        //{
                        //}
                    }
                }
            }
        }
    }
}
