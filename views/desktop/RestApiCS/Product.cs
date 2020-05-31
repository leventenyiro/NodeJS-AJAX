using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestApiCS
{
    class Product
    {
        public int id;
        public string nev;
        public int ar;
        public int keszleten;

        public Product(int id, string nev, int ar, int keszleten)
        {
            this.id = id;
            this.nev = nev;
            this.ar = ar;
            this.keszleten = keszleten;
        }
    }
}
