import "package:flutter/material.dart";
import 'package:mobile/pages/home.dart';
import 'package:mobile/pages/get.dart';
import 'package:mobile/pages/insert.dart';
import 'package:mobile/pages/update.dart';

void main() => runApp(MaterialApp(
  initialRoute: "/get",
  routes: {
    "/": (context) => Home(),
    "/get": (context) => Get(),
    "/insert": (context) => Insert(),
    "/update": (context) => Update(),
  },
  debugShowCheckedModeBanner: false,
  theme: ThemeData(
    accentColor: Colors.pink[900],
    primaryColor: Colors.pink[900],
  ),
));

