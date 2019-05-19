import { AppType } from "../server";
import express = require("express");
import { Server } from "http";
import { AddressInfo } from "net";

export function createExpress(globalApplication: AppType) {
  let app = express();

  app.get('/', function (req, res) {
    res.send('hello world!');
  });

  app.get('/savedEntity', (req, res) => {
    console.log('saved-entity path entered');
    return globalApplication.db.count().then((result) => {
      res.send(result.toString());
    });
  });

  let server: Server = app.listen(8080, function () {
    let address = server.address();
    if ((address as AddressInfo).port) {
      console.log(`Server started on port: ${(address as AddressInfo).port}`);
    }
  });

  return new Promise<Server>((resolve, reject) => {
    resolve(server);
  });
}