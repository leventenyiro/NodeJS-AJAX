import "package:flutter/material.dart";
import "package:http/http.dart" as http;

void main() => runApp(JsonApp());

class JsonApp extends StatefulWidget {
  @override
  _JsonAppState createState() => _JsonAppState();
}

class _JsonAppState extends State<JsonApp> {
  Future json = fetchAlbum();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: Text("Valami")
        )
      )
    );
  }
}

Future<http.Response> fetchAlbum() {
  return http.get("http://www.trophien.com:8080/products");
}