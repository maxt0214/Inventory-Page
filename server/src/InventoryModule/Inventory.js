const ItemManager = require("../ItemModule/ItemManager");

class Inventory {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.itmMgr = new ItemManager();
        this.warehouse = undefined;
    }

    assignWarehouse(wh) {
        this.warehouse = wh;
    }

    /**
     * Add item of stock to inventory
     * @param {string} item 
     * @param {number} stock 
     * @returns Response: On fail - false,errormsg-----On success - true,new item
     */
    addItem(item,stock) {
        return this.itmMgr.addItem(item,stock);
    }

    /**
    * Edit the stock of a certain item in the inventory
    * @param {string} name 
    * @param {number} stock 
    * @returns Response: On fail - false,errormsg-----On success - true,""
    */
    editItem(name, stock) {
        return this.itmMgr.editItem(name,stock);
    }

    /**
     * Delete item from the inventory
     * @param {*} name 
     * @returns Response: On fail - false,errormsg-----On success - true,""
     */
    deleteItem(name) { 
        return this.itmMgr.deleteItem(name);
    }

    //convert to the format that works for the client
    convert() {
        return {
            name: this.name,
            items: this.itmMgr.getItems(),
            warehouse: this.warehouse === undefined ? undefined : this.warehouse.convert()
        }
    }
}

module.exports = Inventory;