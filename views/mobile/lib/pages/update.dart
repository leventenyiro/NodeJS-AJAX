import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/services/http_service.dart';
import 'package:mobile/services/product.dart';

class Update extends StatefulWidget {
  @override
  _UpdateState createState() => _UpdateState();
}

class _UpdateState extends State<Update> {

  HttpService httpService = new HttpService();
  Map data = {};
  String _nev;
  String _ar;
  bool _keszleten;

  @override
  void initState() {
    _keszleten = data["keszleten"] == 1 ? true : false;
    super.initState();
  }

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Future<bool> _onBackPressed() {
    Navigator.popAndPushNamed(context, "/");
  }

  Widget _buildNev() {
    return TextFormField(
      decoration: InputDecoration(
        labelText: "Név",
      ),
      initialValue: data["nev"],
      validator: (value) {
        if (value.isEmpty) {
          return "Adj meg egy nevet";
        }
        return null;
      },
      onSaved: (value) {
        _nev = value;
      },
    );
  }
  
  Widget _buildAr() {
    return TextFormField(
      decoration: InputDecoration(
        labelText: "Ár",
      ),
      initialValue: data["ar"].toString(),
      validator: (value) {
        if (value.isEmpty) {
          return "Adj meg egy árat";
        } else if (int.tryParse(value) < 0) {
          return "Az ár nem lehet kisebb, mint 0";
        }
        return null;
      },
      keyboardType: TextInputType.number,
      inputFormatters: <TextInputFormatter>[
        WhitelistingTextInputFormatter.digitsOnly,
      ],
      onSaved: (value) {
        _ar = value;
      },
    );
  }
  
  Widget _buildKeszleten() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text("Készleten:"),
        Checkbox(
          value: _keszleten,
          onChanged: (value) {
            setState(() {
              _keszleten = value;
            });
          },
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {

    data = ModalRoute.of(context).settings.arguments;


    return AnnotatedRegion(
      value: SystemUiOverlayStyle(
        statusBarColor: Colors.white,
        statusBarBrightness: Brightness.light,
        statusBarIconBrightness: Brightness.dark
      ),
      child: Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
          child: Padding(
            padding: EdgeInsets.fromLTRB(40, 0, 40, 0),
            child: Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Text(
                      "Update",
                      style: TextStyle(
                        fontSize: 40.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                //formInsert(),
                Form(
                  key: _formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      /*FutureBuilder<Product>(
                        future: futureProduct,
                        builder: (context, snapshot) {
                          _nev = snapshot.data.nev;
                          _ar = snapshot.data.ar.toString();
                          _keszleten = snapshot.data.keszleten == 1 ? true : false;
                        },
                      ),*/
                      _buildNev(),
                      _buildAr(),
                      _buildKeszleten(),
                      SizedBox(height: 10.0,),
                      RaisedButton(
                        child: Text("Rögzítés",
                          style: TextStyle(
                            color: Colors.blue,
                            fontSize: 16,
                          ),
                        ),
                        onPressed: () {
                          setState(() {
                            if (!_formKey.currentState.validate()) {
                              return;
                            }
                            _formKey.currentState.save();
                            httpService.updateProduct(data["id"], _nev, _ar, _keszleten ? "1" : "0");
                            Navigator.popAndPushNamed(context, "/");
                          });
                        },
                      ),
                      RaisedButton(
                        child: Text("Mégse",
                          style: TextStyle(
                            color: Colors.red,
                            fontSize: 16,
                          ),
                        ),
                        onPressed: () {
                          setState(() {
                            _onBackPressed();
                          });
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}