const Response = require('../Network/Response.js');
const IdGenerator = require('../Utils/IDGenerator.js');
const InputValidator = require('../Utils/InputValidator.js');
const WarehouseInterface = require('../WarehouseModule/WarehouseInterface.js');
const Inventory = require('./Inventory.js');

class InventoryManager {
  constructor() {
    //Inventories mapped as name-inventory
    this.inventories = new Map();
  }

  /**
   * Try to add an Inventory
   * @param {string} name Inventory Name
   * @returns Response: On fail - false,errormsg-----On success - true,new Inventory
   */
  tryAddInventory(name) {
    if(!InputValidator.ValidName(name)) return new Response(false, "Fail To Add. Invalid Inventory Name!");
    if(this.inventories.has(name)) return new Response(false, "Fail To Add. Inventory Already Exists!");

    const newInven = new Inventory(IdGenerator.GenId("Inventory",this.inventories.size), name);
    this.inventories.set(name, newInven);
    return new Response(true, newInven.convert());
  }

  /**
   * Try to delete inventory and all its items
   * @param {string} name Inventory Name
   * @returns Response: On fail - false,errormsg-----On success - true,""
   */
  tryDeleteInventory(name) {
    if(!InputValidator.ValidName(name)) return new Response(false, "Fail To Delete. Invalid Inventory Name!");
    if(!this.inventories.delete(name)) 
      return new Response(false, "Fail To Delete. Inventory Does Not Exist!");
    else
      return new Response(true, "");
  }

  /**
   * Try to relocate Inventory to warehouse
   * @param {string} name inventory name
   * @param {string} warehouse warehouse name
   * @returns Response: On fail - false,errormsg-----On success - true,new warehouse 
   */
  tryRelocateInventory(name, warehouse) {
    if(!InputValidator.ValidName(name)) return new Response(false, "Fail To Relocate. Invalid Inventory Name!");
    if(!InputValidator.ValidName(warehouse)) return new Response(false, "Fail To Relocate. Invalid Warehouse Name!");
    if(!this.inventories.has(name)) return new Response(false, "Fail To Relocate. Inventory Does Not Exist!");

    let inven = this.inventories.get(name), wh = WarehouseInterface.getWarehouse(warehouse);
    if(!wh) return new Response(false, "Fail To Relocate. Warehouse Does Not Exist!");

    inven.assignWarehouse(wh);
    return new Response(true, wh.convert());
  }

  /**
   * Aggregate all inventories and their items & warehouses
   * @returns Array of {Inventory Name - Inventory}
   */
  aggregate() {
    let toSend = [];
    for(const [key,value] of this.inventories) {
      toSend.push({name: key, inventory: value.convert()});
    }
    return toSend;
  }

  tryGetInventory(name) {
    if(!this.inventories.has(name)) return false;
    return this.inventories.get(name);
  }
}

module.exports = InventoryManager;