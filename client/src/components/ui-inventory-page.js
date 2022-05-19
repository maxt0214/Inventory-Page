import React from 'react';
import MessageQueue from '../message-queue';
import Model from '../model';
import NetClient from '../net-client';
import { CreateInventoryPage } from './ui-create-inventory';
import { InventoryDetail } from './ui-inventory-detail';

//This is the main page component. 
export default class InventoryDotCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {page: "InventoryList", error: "", param: undefined};
  }

  componentDidMount() {
    MessageQueue.Instance().Subscribe("Error", this);
    MessageQueue.Instance().Subscribe("ShowPage", this);
  }

  render() {
    return (
      <div>
        <div className='header'>
          <a className='tab' onClick={e => MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryList"})}>Inventory List</a>
          <div className='title'>Inventory.Com</div>
        </div>
        <div className='main'>
          <ErrorPrompt show = {this.state.page === "Error"} error={this.state.error}/>
          <InventoryList show = {this.state.page === "InventoryList"}/>
          <CreateInventoryPage show = {this.state.page === "CreateInventory"}/>
          <InventoryDetail show = {this.state.page === "InventoryDetail"} inventory={this.state.param}/>
        </div>
      </div>
    );
  }

  update(message, context) {
    if(message === "Error") this.setState({page: "Error", error: context, param: undefined});
    if(message === "ShowPage") this.setState({page: context.page, error: "", param: context.param});
  }
}

//Shows a list of inventory
class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.onClickInventory = this.onClickInventory.bind(this);
    this.onClickCreateInventory = this.onClickCreateInventory.bind(this);
  }

  render() {
    if(!this.props.show) return;

    return (
      <div>
        <label>Inventory List: </label>
        <ul>{this.renderInventories()}</ul>
        <hr/>
        <label>Warehouse List: </label>
        <ul>{this.renderWarehouses()}</ul>
        <button type='button' onClick={e => this.onClickCreateInventory()}> Create Inventory </button>
      </div>
    );
  }

  renderInventories() {
    const inventories = Model.get_all();
    const list = [];
    for(const [key,val] of inventories.entries()) {
      list.push(
        <li key={val.name} className='block'>
          <div className='inline_block'>
            <a className='inventory_entry' onClick={e => this.onClickInventory(val)}>{key}</a>
            <button type='button' onClick={e => this.onClickDeleteInventory(val)}> Delete Inventory </button>
          </div>
        </li>
      );
    }
    return list;
  }

  renderWarehouses() {
    const warehouses = Model.get_warehouses();
    const list = [];
    for(const [key,val] of warehouses.entries()) {
      list.push(
        <li key={key}>
          <div className='inline_block'>
            <a className='inventory_entry'>{val.name} - {val.address}</a>
          </div>
        </li>
      );
    }
    return list;
  }

  onClickInventory(inventory) {
    MessageQueue.Instance().FireMessage("ShowPage", {page: "InventoryDetail", param: inventory});
  }

  onClickCreateInventory() {
    MessageQueue.Instance().FireMessage("ShowPage", {page: "CreateInventory"});
  }

  onClickDeleteInventory(inven) {
    NetClient.DeleteInventory(inven);
  }
}

class ErrorPrompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.show) return;
    return (
      <div className='error_prompt'>
        {this.props.error}
        <button type='button' onClick={e => NetClient.FetchInventories()}> Try Again </button>
      </div>
    );
  }
}