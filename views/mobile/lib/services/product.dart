import 'package:flutter/foundation.dart';
import 'package:http/http.dart';

class Product {
  final int id;
  final String nev;
  final int ar;
  final int keszleten;

  Product({
    this.id, 
    this.nev, 
    this.ar, 
    this.keszleten
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