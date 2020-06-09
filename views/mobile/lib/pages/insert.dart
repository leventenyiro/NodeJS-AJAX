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
                formInsert(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<bool> keszleten;

  @override
  void initState() {
    keszleten = [true, false];
    super.initState();
  }

  Widget formInsert() {
    return Form(
      child: Column(
        children: <Widget>[
          SizedBox(height: 20.0,),
          TextFormField(
            decoration: InputDecoration(
              labelText: "Név",
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.pink,
                ),
              ),
              border: OutlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.pink,
                ),
              ),
            ),
          ),
          SizedBox(height: 20.0,),
          TextFormField(
            decoration: InputDecoration(
              labelText: "Ár",
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.pink,
                ),
              ),
              border: OutlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.pink,
                ),
              ),
            ),
            keyboardType: TextInputType.number,
            inputFormatters: <TextInputFormatter>[
              WhitelistingTextInputFormatter.digitsOnly,
            ],
          ),
          SizedBox(height: 20.0,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Text(
                "Készleten",
                style: TextStyle(
                  color: Colors.grey[600],
                ),
              ),
              ToggleButtons(
                children: <Widget>[
                  Icon(Icons.close),
                  Icon(Icons.check),
                ],
                isSelected: keszleten,
                onPressed: (int index) {
                  setState(() {
                    for (int i = 0; i < keszleten.length; i++) {
                      keszleten[i] = i == index;
                    }
                  });
                },
              ),
            ],
          ),
          SizedBox(height: 20.0,),
          Align(
            alignment: Alignment.bottomRight,
            child: RaisedButton(
              elevation: 5.0,
              child: Text(
                "Rögzítés",
              ),
              onPressed: () {
                setState(() {
                });
              },
            ),
          )
        ],
      )
    );
  }
}