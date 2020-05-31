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

Future<Product> fetchProduct() async {
  final response = await http.get("http://www.trophien.com:8080/products");

  if (response.statusCode == 200) {
    return Product.fromJson(json.decode(response.body));
  }
}

class Product {
  final int id;
  final String nev;
  final int ar;
  final int keszleten;

  Product({this.id, this.nev, this.ar, this.keszleten})

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      nev: json['nev'],
      ar: json['ar'],
      keszleten: json['keszleten']
    );
  }
}