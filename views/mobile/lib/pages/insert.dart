import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/services/http_service.dart';

class Insert extends StatefulWidget {
  @override
  _InsertState createState() => _InsertState();
}

class _InsertState extends State<Insert> {

  HttpService httpService = new HttpService();
  String _nev;
  String _ar;
  bool _keszleten = false;

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Widget _buildNev() {
    return TextFormField(
      decoration: InputDecoration(
        labelText: "Név",
      ),
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
                      "Insert",
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
                            httpService.insertProduct(_nev, _ar, _keszleten ? "1" : "0");
                            Navigator.popAndPushNamed(context, "/");
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