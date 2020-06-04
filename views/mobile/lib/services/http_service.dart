import 'dart:convert';
import 'package:http/http.dart';
import 'package:mobile/services/product.dart';

class HttpService {
  final String url = "http://www.trophien.com:8080/products";
  
  Future<List<Product>> getProducts() async {
    Response res = await get(url);

    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);

      List<Product> products = body.map((dynamic item) => Product.fromJson(item)).toList();

      return products;
    } else {
      throw "Can't get products.";
    }
  }

  Future<Response> deleteProduct(id) async {
    Future<Response> res = delete("$url/$id");
    return res;
  }
}