using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RestApiCS
{
    public partial class FormUpdate : Form
    {
        private FormProducts formProducts;
        private int productId;

        public FormUpdate(FormProducts formProducts, int productId)
        {
            this.formProducts = formProducts;
            this.productId = productId;

            InitializeComponent();
            getProduct();
        }

        private void getProduct()
        {
            var client = new WebClient();
            client.Encoding = Encoding.UTF8;
            var input = client.DownloadString(formProducts.url + "/" + productId);
            Product product = JsonConvert.DeserializeObject<Product>(input);
            
            inputNev.Text = product.nev;
            inputAr.Value = product.ar;
            if (product.keszleten == 1)
                inputKeszleten.Checked = true;
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (inputNev.Text == "" || inputAr.Value == 0)
                MessageBox.Show("Valami nincs kitöltve!");
            else
            {
                update();
                formProducts.getAll();
                Close();
            }
        }

        private void update()
        {
            var keszleten = "0";
            if (inputKeszleten.Checked)
                keszleten = "1";
            var data = new NameValueCollection
            {
                { "nev", inputNev.Text },
                { "ar", inputAr.Value.ToString() },
                { "keszleten", keszleten }
            };
            new WebClient().UploadValues(formProducts.url + "/" + productId, "PUT", data);
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
