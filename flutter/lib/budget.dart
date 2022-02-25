import 'package:flutter/material.dart';

class MyCustomForm extends StatefulWidget {
  const MyCustomForm({Key? key}) : super(key: key);

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

class _MyCustomFormState extends State<MyCustomForm> {
  @override
  // MyCustomFormState createState() => MyCustomFormState();
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
          child: TextFormField(
            decoration: const InputDecoration(
              border: UnderlineInputBorder(),
              labelText: 'Enter your budget',
            ),
          ),
        ),
      ],
    );
  }
}

class _TextFormState extends State<MyCustomForm> {
  TextEditingController textController = TextEditingController();
  String displayText = "";

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: textController,
          maxLines: null,
        ),
        ElevatedButton(
            onPressed: () {
              setState(() {
                displayText = textController.text;
              });
            },
            child: Text("Show Text")),
        Text(
          displayText,
          style: TextStyle(fontSize: 20),
        )
      ],
    );
  }
}
