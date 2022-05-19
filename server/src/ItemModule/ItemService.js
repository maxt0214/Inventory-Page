const InventoryInterface = require('../InventoryModule/InventoryInterface.js');
const NetResponse = require('../Network/Response.js');

class ItemService {
  /**
   * set up app connection and start handling services
   * @param {Express} app 
   */
  constructor(app) {
    this.app = app;
  }

  init() {
    this.app.post("/add-itm", this.validate, async(req,res) => this.onAddItem(req,res));
    this.app.post("/edi-itm", this.validate, async(req,res) => this.onEditItem(req,res));
    this.app.post("/del-itm", this.validate, async(req,res) => this.onDeleteItem(req,res));
  }

  /**
   * Add item: item_name under inventory: inven_name
   * @param {Request} req 
   * @param {Response} res 
   * @returns Response: On fail - false,errormsg-----On success - true,new item
   */
  async onAddItem(req, res) {
    let item_name = req.body.name, stock = req.body.stock, inven = res.locals.inventory;
    console.log(`ItemService:onAddItem item[${item_name}]-amt[${stock}] to inventory[${inven.name}]`);
    
    res.send(inven.addItem(item_name, stock));
  }

  /**
   * Edit the stock of item: item_name under inventory: inven_name
   * @param {Request} req 
   * @param {Response} res 
   * @returns Response: On fail - false,errormsg-----On success - true,""
   */
  async onEditItem(req, res) {
    let item_name = req.body.name, stock = req.body.stock, inven = res.locals.inventory;
    console.log(`ItemService:onEditItem item[${item_name}]-stock[${stock}] in inventory[${inven.name}]`);
    res.send(inven.editItem(item_name, stock));
  }
  
  /**
   * Delete item: item_name under inventory: inven_name
   * @param {Request} req 
   * @param {Response} res 
   * @returns Response: On fail - false,errormsg-----On success - true,""
   */
  async onDeleteItem(req, res) {
    let item_name = req.body.name, inven = res.locals.inventory;
    console.log(`ItemService:onDeleteItem item[${item_name}] in inventory[${inven.name}]`);

    res.send(inven.deleteItem(item_name));
  }

  validate(req, res, next) {
    let inven_name = req.body.inven;
    let inven = InventoryInterface.tryGetInventory(inven_name);
    if(inven === false) {
      res.send(new NetResponse(false, "Item Request Failed. Inventory Does Not Exist!"));
      return;
    }
    res.locals.inventory = inven;
    next();
  }
}

module.exports = ItemService;