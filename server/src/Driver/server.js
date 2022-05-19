const express = require('express');
const bodyParser = require('body-parser');
const InventoryService = require('../InventoryModule/InventoryService.js');
const ItemService = require('../ItemModule/ItemService.js');
const WarehouseService = require('../WarehouseModule/WarehouseService.js');
const cors = require("cors");
//#region Setup and middleware
let app = express();
let invenService = new InventoryService(app);
let itmService = new ItemService(app);
let whService = new WarehouseService(app);

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//#endregion

//Start each Service. Each of them will start listen for certain requests and init its module
invenService.init();
itmService.init();
whService.init();


app.listen(8000, function () {
  console.log("Server listening on port 8000!");
});
