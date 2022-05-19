let wh_mgr = undefined;

class WarehouseInterface {
    static setWHMgr(mgr) {
        wh_mgr = mgr;
    }

    /** 
     * Try to get a warehouse. Return false on fail and warehouse on success
     */
    static getWarehouse(name) {
        return wh_mgr.tryGetWarehouse(name);
    }
}

module.exports = WarehouseInterface;