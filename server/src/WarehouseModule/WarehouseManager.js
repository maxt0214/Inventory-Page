const InputValidator = require('../Utils/InputValidator.js');
const Warehouse = require('./Warehouse.js');
const Response = require('../Network/Response.js');
const IdGenerator = require('../Utils/IDGenerator.js');

class WarehouseManager {
  constructor() {
    this.warehouses = new Map();
  }

  /**
   * Try to add a warehouse
   * @param {string} name Warehouse name - string len > 9
   * @param {string} address Warehouse address - string len > 9
   * @returns Response: On fail - false,errormsg-----On success - true,new Warehouse
   */
  tryAddWarehouse(name, address) {
    //Validation
    if(!InputValidator.ValidName(name)) return new Response(false, "Fail To Add. Warehosue must have a name that is no shorter than 10 characters!");
    if(!InputValidator.ValidName(address)) return new Response(false, `Fail To Add. Warehosue has an invalid address - ${address}!`);
    if(this.warehouses.has(name)) return new Response(false, `Fail To Add. Warehouse ${name} Already Exists!`);

    const newWH = new Warehouse(IdGenerator.GenId("Warehouse",this.warehouses.size), name, address);
    this.warehouses.set(name,newWH);
    return new Response(true,newWH.convert());
  }

  /**
   * Aggregate all Warehouses
   * @returns Array of {Warehouse Name - Warehouse}
   */
  aggregate() {
    let toSend = [];
    for(const [key,value] of this.warehouses) {
      toSend.push({name: key, warehouse: value.convert()});
    }
    return toSend;
  }

  //try to get a warehouse, only call this through WarehouseInterface
  tryGetWarehouse(name) {
    if(!this.warehouses.has(name)) return false;
    return this.warehouses.get(name);
  }
}

module.exports = WarehouseManager;