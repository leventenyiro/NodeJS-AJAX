import 'package:flutter/cupertino.dart';
import "package:flutter/material.dart";
import 'package:flutter/services.dart';
//import "package:mobile/services/http_service.dart";
import 'package:http/http.dart' as http;
import 'dart:convert';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  //HttpService httpService = new HttpService();
  String _usernameEmail;
  String _password;

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Widget _buildUsernameEmail() {
    return TextFormField(
      decoration: InputDecoration(
        labelText: "Username or e-mail",
      ),
      onSaved: (value) {
        _usernameEmail = value;
      },
    );
  }

  Widget _buildPassword() {
    return TextFormField(
      decoration: InputDecoration(
        labelText: "Password",
      ),
      onSaved: (value) {
        _password = value;
      },
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion(
      // usernameEmail, password
      value: SystemUiOverlayStyle(
        statusBarColor: Colors.white,
        statusBarBrightness: Brightness.light,
        statusBarIconBrightness: Brightness.dark
      ),
      child: Scaffold(
        /*body: Container(
          child: Stack(
            children: <Widget>[
              Container(
                height: double.infinity,
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter,
                    colors: [Colors.red, Colors.blue]
                  )
                ),
              )
            ],
          ),
        ),*/
        backgroundColor: Colors.white,
        body: SafeArea(
          child: Padding(
            padding: EdgeInsets.fromLTRB(40, 0, 40, 0),
            child: Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Text(
                      "Valami"
                    ),
                    Text(
                      "Login",
                      style: TextStyle(
                        fontSize: 40.0,
                        fontWeight: FontWeight.bold
                      ),
                    )
                  ],
                ),
                Form(
                  key: _formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      _buildUsernameEmail(),
                      _buildPassword(),
                      SizedBox(height: 10.0,),
                      RaisedButton(
                        child: Text("Login",
                          style: TextStyle(
                            color: Colors.blue,
                            fontSize: 16,
                          ),
                        ),
                        onPressed: () async {
                          /*setState(() {
                            _formKey.currentState.save();
                            httpService.login(_usernameEmail, _password);
                            
                          });*/
                          _formKey.currentState.save();
                          var url = 'http://192.168.0.4:8080/login';
                          var response = await http.post(url, 
                            body: {'usernameEmail': _usernameEmail, 'password': _password});
                          /*print('Response status: ${response.statusCode}');*/
                          print('Response body: ${response.body}');
                          if (response.body.contains("error")) {
                            showDialog(
                              context: context,
                              builder: (_) => CupertinoAlertDialog(
                                title: Text('Error'),
                                content: Text(jsonDecode(response.body)["error"].toString()),
                                actions: [
                                  CupertinoButton(
                                    child: Text('OK'),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  )
                                ],
                              )
                            );
                          } else {
                            Navigator.popAndPushNamed(context, "/get");
                          }
                        },
                      )
                    ],
                  )
                )
              ],
            )
          )
        )
      ),
    );
  }
}