require("dotenv").config();
const express = require("express");

const route = require("./src/routes/routes");
const cors = require("cors");
const port = process.env.PORT || 3000;
const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const util = require("util");
const path = require("path");
const exists = util.promisify(fs.access);
const unlink = util.promisify(fs.unlinkSync);
const QRCode = require("qrcode");

function fileExists(path) {
   return new Promise((resolve, reject) => {
      exists(path, fs.F_OK)
         .then((ok) => {
            resolve(true);
         })
         .catch((err) => {
            resolve(false);
         });
   });
}

// process.title = "whatsapp-node-api";
global.client = new Client({
   authStrategy: new LocalAuth(),
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/upload", express.static("upload"));

global.client.on("authenticated", async (session) => {
   console.log("authenticated");
   const filename = path.join(process.cwd(), "upload/qr.png");
   const isExist = await fileExists(filename);
   if (isExist) {
      await unlink(filename);
   }
});

client.on("qr", async (qr) => {
   console.log("qr");

   const filename = path.join(process.cwd(), "upload/qr.png");

   const toFileSync = util.promisify(QRCode.toFile);
   await toFileSync(filename, qr, { width: 300, height: 300 }, (err) => {
      if (err) throw err;
      console.log("success create qr file");
   });
});

client.on("auth_failure", () => {
   console.log("AUTH Failed !");
});

client.on("ready", () => {
   console.log("Client is ready!");
});

client.on("message", async (msg) => {
   console.log(msg);
});
client.on("disconnected", () => {
   console.log("disconnected");
});

client.initialize();

app.use("/api/v1/", route);

app.listen(port, async () => {
   try {
      // db.recruitment.sync();
      // db.sdms.sync();
      console.log("Server is running on port " + port);
   } catch (error) {
      console.log(error);
   }
});
