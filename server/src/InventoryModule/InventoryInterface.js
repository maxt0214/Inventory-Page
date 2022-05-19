let inven_mgr = undefined;
class InventoryInterface {
  static SetInventoryManager(mgr) {
    inven_mgr = mgr;
  }

  /**
   * Try get the inventory based on name
   * @param {string} name 
   * @returns boolean | Inventory
   */
  static tryGetInventory(name) {
    if(inven_mgr === undefined) return false;
    return inven_mgr.tryGetInventory(name);
  }
}

module.exports = InventoryInterface;