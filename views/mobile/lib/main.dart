import "package:flutter/material.dart";
import 'package:mobile/http_service.dart';
import 'package:mobile/product.dart';

void main() => runApp(JsonApp());

class JsonApp extends StatefulWidget {
  @override
  _JsonAppState createState() => _JsonAppState();
}

class _JsonAppState extends State<JsonApp> {
  final HttpService httpService = HttpService();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: FutureBuilder(future: httpService.getProducts(),
        builder: (BuildContext context, AsyncSnapshot<List<Product>> snapshot) {
          if (snapshot.hasData) {
            List<Product> products = snapshot.data;

            return ListView(
              children: products.map(
                (Product product) => ListTile(
                  title: Text(product.nev),
                  subtitle: Text(product.ar.toString()),
                )
              ).toList()
            );
          }
          return Center(child: CircularProgressIndicator());
        })
      )
    );
  }
}