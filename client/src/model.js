import MessageQueue from "./message-queue";

let inventories = undefined;
let warehouses = undefined;
export default class Model {
  /**
   * Used to init model data. If not data passed in, will initiate to default values for testing purpose. Otherwise, update data in inventories
   * @param {[]} data 
   */
  static Init(data) {
    if(inventories === undefined) inventories = new Inventories();
    if(warehouses === undefined) warehouses = new Warehouses();
    
    if(data !== undefined) {
      inventories.data.clear();
      for(const kv of data) {
        inventories.data.set(kv.name, kv.inventory);
      }
    }
    console.log(`Inventories Initiated: ${JSON.stringify(this,inventories.data)}`);
  }

  //#region Inventory
  //get an inventory based on name
  static get_inventory(name) {
    return inventories.data.get(name);
  }

  //get all inventories in name,inventory pairs
  static get_all() {
    return inventories.data;
  }

  static add_inventory(inven) {
    console.log(`Model:add_inventory ${JSON.stringify(inven)}`);
    inventories.data.set(inven.name, inven);
  }

  static delete_inventory(inven_name) {
    console.log(`Model:delete_inventory ${inven_name}`);
    inventories.data.delete(inven_name);
  }

  static relocate_inven(inven_name, wh) {
    console.log(`Model:relocate_inventory ${inven_name} to warehouse - ${JSON.stringify(wh)}`);

    let inven = Model.get_inventory(inven_name);
    if(inven === undefined) MessageQueue.Instance().FireMessage("Error", "Trying to access a nonexisting inventory!");

    if(!warehouses.data.has(wh.name))
      warehouses.data.set(wh.name, wh);
    inven.warehouse = warehouses.data.get(wh.name);
  }
  //#endregion

  //#region Item
  static add_item(inven_name, item) {
    console.log(`Model:add_item item - ${JSON.stringify(item)} to ${inven_name}`);

    let inven = Model.get_inventory(inven_name);
    if(inven === undefined) MessageQueue.Instance().FireMessage("Error", "Trying to access a nonexisting inventory!");
    
    let merged = false;
    for(const itm of inven.items) {
      if(itm.name === item.name) {
        itm.stock += item.stock;
        merged = true;
      }
    }

    if(merged === false) inven.items.push(item);
  }

  static edit_item(inven_name, item, stock) {
    console.log(`Model:edit_item item - ${JSON.stringify(item)} to stock[${stock}] in ${inven_name}`);

    let inven = Model.get_inventory(inven_name);
    if(inven === undefined) MessageQueue.Instance().FireMessage("Error", "Trying to access a nonexisting inventory!");
    for(var itm of inven.items) {
      if(itm.name === item.name)
        itm.stock = stock;
    }
  }

  static delete_item(inven_name, item) {
    console.log(`Model:delete_item item - ${JSON.stringify(item)} in ${inven_name}`);

    let inven = Model.get_inventory(inven_name);
    if(inven === undefined) MessageQueue.Instance().FireMessage("Error", "Trying to access a nonexisting inventory!");
    inven.items = inven.items.filter(itm => itm.name !== item.name);
  }
  //#endregion

  //#region Warehouse
  static init_wh(data) {
    for(let wh of data) {
      Model.add_warehouse(wh.warehouse);
    }
  }

  static add_warehouse(warehouse) {
    console.log(`Model:add_warehouse warehouse - ${JSON.stringify(warehouse)}`);
    warehouses.data.set(warehouse.name, warehouse);
  }

  static get_warehouses() {
    return warehouses.data;
  }
  //#endregion
}

//All Inventories and items inside each
class Inventories {
  constructor() {
    this.data = new Map();
    this.data.set("Sample Inventory",
    {
      name: "Sample Inventory",
      items: [
        {
          name: "item 1",
          stock: 1,
        },
        {
          name: "item 2",
          stock: 1,
        }
      ],
      warehouse: {
        name: "Sunny Warehouse",
        address: "39 Long Beach, CA"
      }
    });
  }
}

class Warehouses {
  constructor() {
    this.data = new Map();
    this.data.set("Sunny Warehouse", {name: "Sunny Warehouse", address: "39 Long Beach, CA"});
  }
}