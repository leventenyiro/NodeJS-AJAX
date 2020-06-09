import "package:flutter/material.dart";
import 'package:mobile/pages/home.dart';
import 'package:mobile/pages/insert.dart';

void main() => runApp(MaterialApp(
  initialRoute: "/",
  routes: {
    "/": (context) => Home(),
    "/insert": (context) => Insert(),
  },
  debugShowCheckedModeBanner: false,
  theme: ThemeData(
    accentColor: Colors.pink[900],
    primaryColor: Colors.pink[900],
  ),
));

