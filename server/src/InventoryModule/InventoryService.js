const InventoryInterface = require('./InventoryInterface.js');
const InventoryManager = require('./InventoryManager.js');

class InventoryService {
  //set up app connection and start handling services
  constructor(app) {
    this.app = app;
    this.manager = new InventoryManager();
    InventoryInterface.SetInventoryManager(this.manager);
  }

  init() {
    this.app.get("/fetch-inven", async(req,res) => this.onFetchInventories(req,res));
    this.app.post("/add-inven", async(req,res) => this.onAddInven(req,res));
    this.app.post("/del-inven", async(req,res) => this.onDeleteInven(req,res));
    this.app.post("/rel-inven", async(req,res) => this.onRelocateInven(req,res));
  }
  
  /**
   * Fetch Inventores
   * @param {Request} req 
   * @param {Response} res 
   * @send Array of {Inventory Name - Inventory}
   */
  async onFetchInventories(req, res) {
    console.log('InventoryService:onFetchInventories sends back avaliable inventories');

    res.send(this.manager.aggregate());
  }
  /**
   * Add inventory: inven_name
   * @param {Request} req 
   * @param {Response} res 
   * @send Response: On fail - false,errormsg-----On success - true,new Inventory
   */
  async onAddInven(req, res) {
    let inven_name = req.body.name;
    console.log(`InventoryService:onAddInven inventory[${inven_name}]`);

    res.send(this.manager.tryAddInventory(inven_name));
  }

  /**
   * Delete inventory: inven_name & its items
   * @param {Request} req 
   * @param {Response} res 
   * @send Response: On fail - false,errormsg-----On success - true,""
   */
  async onDeleteInven(req, res) {
    let inven_name = req.body.name;
    console.log(`InventoryService:onDeleteInven inventory[${inven_name}]`);

    res.send(this.manager.tryDeleteInventory(inven_name));
  }

  /**
   * Relocate inventory: inven_name to warehouse: warehouse
   * @param {Request} req 
   * @param {Response} res 
   * @send Response: On fail - false,errormsg-----On success - true,warehouse
   */
  async onRelocateInven(req, res) {
    let inven_name = req.body.name, warehouse = req.body.warehouse;
    console.log(`InventoryService:onRelocateInven inventory[${inven_name}] to warehouse[${warehouse}]`);

    res.send(this.manager.tryRelocateInventory(inven_name, warehouse));
  }
}

module.exports = InventoryService;