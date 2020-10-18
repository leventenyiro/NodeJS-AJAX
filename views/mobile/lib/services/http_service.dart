import 'dart:convert';
import 'package:http/http.dart';
import 'package:mobile/services/product.dart';


class HttpService {
  final String url = "http://192.168.0.4:8080";
  
  Future<Map<String, dynamic>> login(usernameEmail, password) async {
    Response res = await post(
      "$url/login",
      headers: <String, String> {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, String> {
        "usernameEmail": usernameEmail,
        "password": password
      })
    );
    
    return jsonDecode(res.body);
  }

  Future<List<Product>> getProducts() async {
    Response res = await get("$url/products");

    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);

      List<Product> products = body.map((dynamic item) => Product.fromJson(item)).toList();

      return products;
    } else {
      throw "Can't get products.";
    }
  }

  Future<Response> deleteProduct(id) async {
    Future<Response> res = delete("$url/products/$id");
    return res;
  }

  Future<Response> insertProduct(String nev, String ar, String keszleten) {
    return post(
      "$url/products",
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
      "$url/products/$id",
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