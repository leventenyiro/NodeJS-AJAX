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
    public partial class FormInsert : Form
    {
        private FormProducts formProducts;

        public FormInsert(FormProducts formProducts)
        {
            InitializeComponent();
            this.formProducts = formProducts;
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
            if (inputNev.Text == "" || inputAr.Value == 0)
                MessageBox.Show("Valami nincs kitöltve!");
            else
            {
                insert();
                formProducts.getAll();
                Close();
            }
        }

        private void insert()
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
            //new HttpClient().PostAsync(formProducts.url, new FormUrlEncodedContent(data));
            new WebClient().UploadValues(formProducts.url, "POST", data);
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
