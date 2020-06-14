import "package:flutter/material.dart";
import 'package:flutter_slidable/flutter_slidable.dart';
import "package:mobile/services/http_service.dart";
import 'package:mobile/services/product.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  HttpService httpService = HttpService();

  void update(p) async {
    Navigator.pushReplacementNamed(context, "/update", arguments: {
      "id": p.id,
      "nev": p.nev,
      "ar": p.ar,
      "keszleten": p.keszleten,
    });
  }
  
  Widget slideAble(p) {
    return Slidable(
      actionPane: SlidableDrawerActionPane(),
      actionExtentRatio: 0.25,
      child: new Container(
        color: Colors.white,
        child: new ListTile(
          title: new Text(p.nev),
          subtitle: new Text(p.ar.toString()),
        ),
      ),
      secondaryActions: <Widget>[
        new IconSlideAction(
          caption: 'Update',
          color: Colors.blue[900],
          icon: Icons.edit,
          onTap: () {
            setState(() {
              update(p);
            });
          },
        ),
        new IconSlideAction(
          caption: 'Delete',
          color: Colors.red,
          icon: Icons.delete,
          onTap: () {
            setState(() {
              httpService.deleteProduct(p.id);
            });
          },
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Raktár"),
        centerTitle: true,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            Navigator.popAndPushNamed(context, "/insert");
          });
        },
        child: Icon(Icons.add),
      ),
      body: FutureBuilder(
        future: httpService.getProducts(),
        builder: (BuildContext context, AsyncSnapshot<List<Product>> snapshot) {
          if (snapshot.hasData) {
            List<Product> products = snapshot.data;
            return ListView(
              children: products.map((p) => slideAble(p)).toList()
            );
          }
          return Center(child: CircularProgressIndicator());
        }
      ),
    );
  }
}