using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace RestApiCS
{
    class Program
    {
        static void list()
        {
            var input = new WebClient().DownloadString("http://192.168.0.2:8080/products");

            List<Product> products = JsonConvert.DeserializeObject<List<Product>>(input);

            Console.WriteLine("id\tNév\tÁr\tKészleten");

            foreach (var product in products)
            {
                Console.WriteLine("{0}\t{1}\t{2}\t{3}", product.id, product.nev, product.ar, product.keszleten == 1 ? "Igen" : "Nem");
            }
            muvelet();
        }

        static void muvelet()
        {
            Console.WriteLine("\nTörlés - D");
            Console.WriteLine("\nÚj elem - I");
            Console.Write("Parancs: ");
            string parancs = Console.ReadLine();
            if (parancs == "D")
            {
                Console.Write("\nid: ");
                string url = "http://192.168.0.2:8080/products/" + Console.ReadLine();
                WebRequest request = WebRequest.Create(url);
                request.Method = "DELETE";
                //HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                request.GetResponse();
                Console.Clear();
                list();
            }
            else if (parancs == "I")
            {
                Console.Write("\nNév: ");
                string nev = Console.ReadLine();
                Console.Write("\nÁr: ");
                string ar = Console.ReadLine();
                string keszleten = "1";
                string url = "http://192.168.0.2:8080/products";
                var data = new Dictionary<string, string>
                {
                    { "nev", nev },
                    { "ar", ar },
                    { "keszleten", keszleten }
                };
                var json = new FormUrlEncodedContent(data);
                var client = new HttpClient();
                client.PostAsync(url, json);
                Console.Clear();
                list();
            }
        }

        static void Main(string[] args)
        {
            list();
            Console.ReadLine();
        }
    }
}
