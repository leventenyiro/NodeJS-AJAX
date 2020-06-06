import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class Insert extends StatefulWidget {
  @override
  _InsertState createState() => _InsertState();
}

class _InsertState extends State<Insert> {

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
            child: Column(children: <Widget>[
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
              formInsert(),
            ],
            ),

          ),
        ),
      ),
    );
    


  }
}

Widget formInsert() {
  return Form(

    child: Column(
      children: <Widget>[
        TextField(
          decoration: InputDecoration(
            hintText: "Név",
          ),
        ),
        TextField(
          decoration: InputDecoration(
            hintText: "Ár",
          ),
          keyboardType: TextInputType.number,
        ),
        Switch(
          value: false,
          
        )
      ],
    )
  );
}