using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RestApiCS
{
    public partial class FormProducts : Form
    {
        public string url = "http://192.168.0.2:8080/products";
        private List<Product> products;

        public FormProducts()
        {
            InitializeComponent();
            getAll();
        }

        public void getAll()
        {
            listViewProducts.Items.Clear();
            var client = new WebClient();
            client.Encoding = Encoding.UTF8;
            var input = client.DownloadString(url);
            products = JsonConvert.DeserializeObject<List<Product>>(input);
            foreach (var product in products)
            {
                string[] row = { product.nev, Convert.ToString(product.ar), product.keszleten == 0 ? "Nem" : "Igen" };
                listViewProducts.Items.Add(new ListViewItem(row));
            }
        }

        public void refresh()
        {
            listViewProducts.Refresh();
            /*var previousList = products;

            var client = new WebClient();
            client.Encoding = Encoding.UTF8;
            var input = client.DownloadString(url);
            products = JsonConvert.DeserializeObject<List<Product>>(input);
            foreach (var product in products)
            {
                if (!previousList.Contains(product))
                {
                    string[] row = { product.nev, Convert.ToString(product.ar), Convert.ToString(product.keszleten) };
                    listViewProducts.Items.Add(new ListViewItem(row));
                }
            }*/
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (listViewProducts.SelectedItems.Count == 0)
            {
                MessageBox.Show("Nincs kiválasztott termék!");
            }
            else
            {
                var prod = products[listViewProducts.Items.IndexOf(listViewProducts.SelectedItems[0])];
                delete(prod.id);
            }
        }

        private void delete(int id)
        {
            new WebClient().UploadValues(url + "/" + id, "DELETE", new NameValueCollection());
            getAll();
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
            FormInsert formInsert = new FormInsert(this);
            formInsert.ShowDialog();
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (listViewProducts.SelectedItems.Count == 0)
            {
                MessageBox.Show("Nincs kiválasztott termék!");
            }
            else
            {
                var prod = products[listViewProducts.Items.IndexOf(listViewProducts.SelectedItems[0])];
                FormUpdate formUpdate = new FormUpdate(this, prod.id);
                formUpdate.ShowDialog();
            }
        }
    }
}
