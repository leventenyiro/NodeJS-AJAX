import 'dart:js';

import "package:flutter/material.dart";
import "package:mobile_login/pages/home.dart";
import "package:mobile_login/pages/session.dart";

void main() => runApp(MaterialApp(
  initialRoute: "/",
  routes: {
    "/": (context) => Home(),
    "/session": (context) => Session()
  },
  debugShowCheckedModeBanner: false,
  theme: ThemeData(
    accentColor: Colors.pink[900],
    primaryColor: Colors.pink[900],
  ),
));

