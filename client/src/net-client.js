import axios from 'axios';
import MessageQueue from './message-queue';
import Model from './model';

let local_debug = false;
export default class NetClient {
  static Init() {
    NetClient.FetchInventories();
    NetClient.FetchWarehouses();
  }

  //Fectches all inventories and items from server. Only used on start
  static async FetchInventories() {
    console.log(`NetClient: Trying to fetch inventories`);
    if(local_debug) return;

    axios.get('http://localhost:8000/fetch-inven')
    .then(res => {
      Model.Init(res.data);
      MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryList"});
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to fetch inventories!");
    });
  }

  //Fectches all warehouses
  static async FetchWarehouses() {
    console.log(`NetClient: Trying to fetch warehouses`);
    if(local_debug) return;

    axios.get('http://localhost:8000/fetch-wh')
    .then(res => {
      Model.init_wh(res.data);
      MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryList"});
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to fetch warehouses!");
    });
  }

  //Create an inventory with name
  static async CreateInventory(name) {
    console.log(`NetClient: Trying to create inventory[${name}]`);
    if(local_debug) return;

    axios.post('http://localhost:8000/add-inven', {name: name})
    .then(res => {
      let response = res.data;
      console.log(`NetClient:CreateInventory Received[${JSON.stringify(response)}]`);
      if(response.result === true) {
        Model.add_inventory(response.param);
        MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryList"});
      } else {
        MessageQueue.Instance().FireMessage("Error", response.param);
      }
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to create an inventory!");
    });
  }

  static async DeleteInventory(inven) {
    console.log(`NetClient: Trying to delete inventory[${inven.name}]`);
    if(local_debug) return;

    axios.post('http://localhost:8000/del-inven', {name: inven.name})
    .then(res => {
      let response = res.data;
      console.log(`NetClient:DeleteInventory Received[${JSON.stringify(response)}]`);
      if(response.result === true) {
        Model.delete_inventory(inven.name);
        MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryList"});
      } else {
        MessageQueue.Instance().FireMessage("Error", response.param);
      }
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to delete inventory!");
    });
  }

  static async RelocateInventory(inven, warehouse) {
    console.log(`NetClient: Trying to relocate inventory[${inven.name}] to Warehouse[${warehouse}]`);
    if(local_debug) return;

    axios.post('http://localhost:8000/rel-inven', {name: inven.name, warehouse: warehouse})
    .then(res => {
      let response = res.data;
      console.log(`NetClient:RelocateInventory Received[${JSON.stringify(response)}]`);
      if(response.result === true) {
        Model.relocate_inven(inven.name, response.param);
        MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryList"});
      } else {
        MessageQueue.Instance().FireMessage("Error", response.param);
      }
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to relocate inventory!");
    });
  }

  static async CreateWarehouse(warehouse, whaddress) {
    console.log(`NetClient: Trying to create warehouse ${warehouse} at ${whaddress}`);
    if(local_debug) return;

    axios.post('http://localhost:8000/add-wh', {warehouse: warehouse, address: whaddress})
    .then(res => {
      let response = res.data;
      console.log(`NetClient:CreateWarehouse Received[${JSON.stringify(response)}]`);
      if(response.result === true) {
        Model.add_warehouse(response.param);
        MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryList"});
      } else {
        MessageQueue.Instance().FireMessage("Error", response.param);
      }
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to create warehouse!");
    });
  }
  
  static async AddInventoryItem(inven, item) {
    console.log(`NetClient: Trying to add inventory[${inven.name}] - item[${JSON.stringify(item)}]`);
    if(local_debug) return;

    axios.post('http://localhost:8000/add-itm', {inven: inven.name, name: item, stock: 0})
    .then(res => {
      let response = res.data;
      console.log(`NetClient:AddInventoryItem Received[${JSON.stringify(response)}]`);
      if(response.result === true) {
        Model.add_item(inven.name, response.param);
        MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryDetail", param: Model.get_inventory(inven.name)});
      } else {
        MessageQueue.Instance().FireMessage("Error", response.param);
      }
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to add item to inventory!");
    });
  }

  static async EditInventoryItem(inven, item, stock) {
    console.log(`NetClient: Trying to edit inventory[${inven.name}] - item[${JSON.stringify(item)}] to ${stock}`);
    if(local_debug) return;

    axios.post('http://localhost:8000/edi-itm', {inven: inven.name, name: item.name, stock: stock})
    .then(res => {
      let response = res.data;
      console.log(`NetClient:EditInventoryItem Received[${JSON.stringify(response)}]`);
      if(response.result === true) {
        Model.edit_item(inven.name, item, stock);
        MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryDetail", param: Model.get_inventory(inven.name)});
      } else {
        MessageQueue.Instance().FireMessage("Error", response.param);
      }
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail edit item in inventory!");
    });
  }

  static async DeleteInventoryItem(inven, item) {
    console.log(`NetClient: Trying to delete inventory[${inven.name}] - item[${JSON.stringify(item)}]`);
    if(local_debug) return;

    axios.post('http://localhost:8000/del-itm', {inven: inven.name, name: item.name})
    .then(res => {
      let response = res.data;
      console.log(`NetClient:DeleteInventoryItem Received[${JSON.stringify(response)}]`);
      if(response.result === true) {
        Model.delete_item(inven.name, item);
        MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryDetail", param: Model.get_inventory(inven.name)});
      } else {
        MessageQueue.Instance().FireMessage("Error", response.param);
      }
    })
    .catch(err => {
      console.log(err);
      MessageQueue.Instance().FireMessage("Error", "Fail to delete item from inventory!");
    });
  }
}