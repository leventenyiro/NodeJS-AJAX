import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class Session extends StatefulWidget {
  @override
  _SessionState createState() => _SessionState();
}

class _SessionState extends State<Session> {
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
                      "Valami",
                      style: TextStyle(
                        fontSize: 40.0,
                        fontWeight: FontWeight.bold
                      ),
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/*
_formKey.currentState.save();
                          var url = 'http://192.168.0.4:8080/login';
                          var response = await http.post(url, 
                            body: {'usernameEmail': _usernameEmail, 'password': _password});
                          /*print('Response status: ${response.statusCode}');*/
                          print('Response body: ${response.body}');
                          */