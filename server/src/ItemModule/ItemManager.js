const IdGenerator = require('../Utils/IDGenerator.js');
const InputValidator = require('../Utils/InputValidator.js');
const Item = require('./Item.js');
const Response = require('../Network/Response.js');

class ItemManager {
  constructor() {
    this.items = new Map();
  }

  /**
   * Adds an item to the list. Will merge same items
   * @param {string} name 
   * @param {number} stock 
   * @returns Response: On fail - false,errormsg-----On success - true,new item
   */
  addItem(name, stock) {
    if(!InputValidator.ValidItemName(name)) return new Response(false, "Fail To Add Item. Invalid Item Name!");
    if(!InputValidator.ValidStock(stock)) return new Response(false, "Fail To Add Item. Invalid Item Stock!");

    let itm;
    if(this.items.has(name)) {
      itm = this.items.get(name);
      itm.addStock(stock);
    }
    else {
      itm = new Item(IdGenerator.GenId("Item",this.items.size), name, stock);
      this.items.set(name,itm);
    }
    
    return new Response(true, itm.convert());
  }

  /**
   * Edit the stock of a certain item in the inventory
   * @param {string} name 
   * @param {number} stock 
   * @returns Response: On fail - false,errormsg-----On success - true,""
   */
  editItem(name, stock) {
    if(!InputValidator.ValidItemName(name)) return new Response(false, "Fail To Edit Item. Invalid Item Name!");
    if(!InputValidator.ValidStock(stock)) return new Response(false, "Fail To Edit Item. Invalid Item Stock!");
    if(!this.items.has(name)) return new Response(false, "Fail To Edit Item. Item Does Not Exist In The Inventory!");

    this.items.get(name).editStock(stock);
    return new Response(true, "");
  }

  /**
   * Delete item from the inventory
   * @param {string} name 
   * @returns Response: On fail - false,errormsg-----On success - true,""
   */
  deleteItem(name) {
    if(!InputValidator.ValidItemName(name)) return new Response(false, "Fail To Edit Item. Invalid Item Name!");
    if(!this.items.delete(name))
      return new Response(false, "Fail To Delete Item. Item Does Not Exist In The Inventory!");
    else
      return new Response(true, "");
  }

  getItems() {
    let items = [];
    for(const [name,itm] of this.items) {
      items.push(itm.convert());
    }
    return items;
  }
}

module.exports = ItemManager;