import 'package:flutter/foundation.dart';

class Product {
  final int id;
  final String nev;
  final int ar;
  final int keszleten;

  Product({
    @required this.id, 
    @required this.nev, 
    @required this.ar, 
    @required this.keszleten
    });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json["id"] as int,
      nev: json["nev"] as String,
      ar: json["ar"] as int,
      keszleten: json["keszleten"] as int
    );
  }
}