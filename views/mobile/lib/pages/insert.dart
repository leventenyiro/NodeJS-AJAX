import 'package:flutter/material.dart';

class Insert extends StatefulWidget {
  @override
  _InsertState createState() => _InsertState();
}

class _InsertState extends State<Insert> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: formInsert(),
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