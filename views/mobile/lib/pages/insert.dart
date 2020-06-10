import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/services/http_service.dart';

class Insert extends StatefulWidget {
  @override
  _InsertState createState() => _InsertState();
}

class _InsertState extends State<Insert> {

  HttpService httpService = new HttpService();

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

  List<bool> keszlet;

  @override
  void initState() {
    keszlet = [true, false];
    super.initState();
  }

  final inputNev = TextEditingController();
  final inputAr = TextEditingController();
  
  @override
  void dispose() {
    inputNev.dispose();
    inputAr.dispose();
    super.dispose();
  }
  String keszleten = "Igen";

  Widget formInsert() {
    return Form(
      child: Column(
        children: <Widget>[
          SizedBox(height: 20.0,),
          TextFormField(
            controller: inputNev,
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
            controller: inputAr,
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
          /*Row(
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
                isSelected: keszlet,
                onPressed: (int index) {
                  setState(() {
                    for (int i = 0; i < keszlet.length; i++) {
                      keszlet[i] = i == index;
                    }
                    keszleten = index;
                  });
                },
              ),
            ],
          ),*/
          DropdownButtonFormField<String>(
            value: keszleten,
            
            icon: Icon(Icons.arrow_drop_down),
            elevation: 16,
            decoration: InputDecoration(
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
            onChanged: (value) {
              keszleten = value;
            },
            items: <String>["Igen", "Nem"].map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
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
                  // keszleten
                  httpService.insertProduct(inputNev.text, inputAr.text, keszleten);
                  Navigator.popAndPushNamed(context, "/");
                });
              },
            ),
          )
        ],
      )
    );
  }
}