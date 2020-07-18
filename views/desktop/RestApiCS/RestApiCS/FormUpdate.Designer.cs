namespace RestApiCS
{
    partial class FormUpdate
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnClose = new System.Windows.Forms.Button();
            this.btnUpdate = new System.Windows.Forms.Button();
            this.lblAr = new System.Windows.Forms.Label();
            this.lblNev = new System.Windows.Forms.Label();
            this.inputAr = new System.Windows.Forms.NumericUpDown();
            this.inputKeszleten = new System.Windows.Forms.CheckBox();
            this.inputNev = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.inputAr)).BeginInit();
            this.SuspendLayout();
            // 
            // btnClose
            // 
            this.btnClose.Location = new System.Drawing.Point(12, 216);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(118, 33);
            this.btnClose.TabIndex = 14;
            this.btnClose.Text = "Mégse";
            this.btnClose.UseVisualStyleBackColor = true;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnUpdate
            // 
            this.btnUpdate.Location = new System.Drawing.Point(154, 216);
            this.btnUpdate.Name = "btnUpdate";
            this.btnUpdate.Size = new System.Drawing.Size(118, 33);
            this.btnUpdate.TabIndex = 13;
            this.btnUpdate.Text = "Módosítás";
            this.btnUpdate.UseVisualStyleBackColor = true;
            this.btnUpdate.Click += new System.EventHandler(this.btnUpdate_Click);
            // 
            // lblAr
            // 
            this.lblAr.AutoSize = true;
            this.lblAr.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.lblAr.Location = new System.Drawing.Point(12, 75);
            this.lblAr.Name = "lblAr";
            this.lblAr.Size = new System.Drawing.Size(25, 20);
            this.lblAr.TabIndex = 12;
            this.lblAr.Text = "Ár";
            // 
            // lblNev
            // 
            this.lblNev.AutoSize = true;
            this.lblNev.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.lblNev.Location = new System.Drawing.Point(8, 9);
            this.lblNev.Name = "lblNev";
            this.lblNev.Size = new System.Drawing.Size(36, 20);
            this.lblNev.TabIndex = 11;
            this.lblNev.Text = "Név";
            // 
            // inputAr
            // 
            this.inputAr.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.inputAr.Increment = new decimal(new int[] {
            500,
            0,
            0,
            0});
            this.inputAr.Location = new System.Drawing.Point(12, 98);
            this.inputAr.Maximum = new decimal(new int[] {
            1410065407,
            2,
            0,
            0});
            this.inputAr.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.inputAr.Name = "inputAr";
            this.inputAr.Size = new System.Drawing.Size(260, 26);
            this.inputAr.TabIndex = 10;
            this.inputAr.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // inputKeszleten
            // 
            this.inputKeszleten.AutoSize = true;
            this.inputKeszleten.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.inputKeszleten.Location = new System.Drawing.Point(12, 151);
            this.inputKeszleten.Name = "inputKeszleten";
            this.inputKeszleten.Size = new System.Drawing.Size(98, 24);
            this.inputKeszleten.TabIndex = 9;
            this.inputKeszleten.Text = "Készleten";
            this.inputKeszleten.UseVisualStyleBackColor = true;
            // 
            // inputNev
            // 
            this.inputNev.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.inputNev.ForeColor = System.Drawing.SystemColors.WindowText;
            this.inputNev.Location = new System.Drawing.Point(12, 32);
            this.inputNev.Name = "inputNev";
            this.inputNev.Size = new System.Drawing.Size(260, 26);
            this.inputNev.TabIndex = 8;
            // 
            // FormUpdate
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Controls.Add(this.btnClose);
            this.Controls.Add(this.btnUpdate);
            this.Controls.Add(this.lblAr);
            this.Controls.Add(this.lblNev);
            this.Controls.Add(this.inputAr);
            this.Controls.Add(this.inputKeszleten);
            this.Controls.Add(this.inputNev);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "FormUpdate";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Módosítás";
            ((System.ComponentModel.ISupportInitialize)(this.inputAr)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnUpdate;
        private System.Windows.Forms.Label lblAr;
        private System.Windows.Forms.Label lblNev;
        private System.Windows.Forms.NumericUpDown inputAr;
        private System.Windows.Forms.CheckBox inputKeszleten;
        private System.Windows.Forms.TextBox inputNev;
    }
}