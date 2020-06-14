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

  Future<Response> insertProduct(String nev, String ar, String keszleten) {
    return post(
      "http://www.trophien.com:8080/products",
      headers: <String, String> {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: jsonEncode(<String, String> {
        "nev": nev,
        "ar": ar,
        "keszleten": keszleten.toString()
      }),
    );
  }

  /*Future<Product> getProduct(id) async {
    Response res = await get(url + "/$id");

    if (res.statusCode == 200) {
      print(json.decode(res.body));
      return json.decode(res.body);
    } else {
      throw Exception();
    }
  }*/

  Future<Response> updateProduct(String id, String nev, String ar, String keszleten) {
    print("lefut");
    return put(
      "http://www.trophien.com:8080/products/$id",
      headers: <String, String> {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: jsonEncode(<String, String> {
        "nev": nev,
        "ar": ar,
        "keszleten": keszleten.toString()
      }),
    );
  }
}