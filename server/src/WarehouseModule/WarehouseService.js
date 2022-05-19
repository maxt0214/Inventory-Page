const WarehouseInterface = require('./WarehouseInterface.js');
const WarehouseManager = require('./WarehouseManager.js');

class WarehouseService {
  //set up app connection and start handling services
  constructor(app) {
    this.app = app;
    this.manager = new WarehouseManager();
    WarehouseInterface.setWHMgr(this.manager);
  }

  init() {
    this.app.get("/fetch-wh", async(req,res) => this.onFetchWarehouses(req,res));
    this.app.post("/add-wh", async(req,res) => this.onAddWarehouse(req,res));
  }
  
  /**
   * Fetch Warehouses
   * @param {Request} req 
   * @param {Response} res 
   * @send Array of {Warehouse Name - Warehouse}
   */
  async onFetchWarehouses(req, res) {
    console.log('WarehouseService:onFetchWarehouses sends back avaliable Warehouses');

    res.send(this.manager.aggregate());
  }
  
  /**
   * Add warehouse: wh_name - wh_addr
   * @param {Request} req 
   * @param {Response} res 
   * @send Response: On fail - false,errormsg-----On success - true,new Warehouse
   */
  async onAddWarehouse(req, res) {
    let wh_name = req.body.warehouse, wh_addr = req.body.address;
    console.log(`WarehouseService:onAddWarehouse warehouse[${wh_name}] at address[${wh_addr}]`);
    
    res.send(this.manager.tryAddWarehouse(wh_name,wh_addr));
  }
}

module.exports = WarehouseService;