import React from 'react';
import MessageQueue from '../message-queue';
import Model from '../model';
import NetClient from '../net-client';
import { InputArea, LabelArea } from './ui-common';

export class InventoryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.onClickRelocate = this.onClickRelocate.bind(this);
    this.onClickAddItem = this.onClickAddItem.bind(this);
    this.onInput = this.onInput.bind(this);

    this.state = {relocate: "", item: ""};
  }

  render() {
    if(!this.props.show) return;

    const inven = this.props.inventory;
    return (
      <div>
        <div className='inline-block'>
          <LabelArea label="Warehouse: " text={inven.warehouse === undefined ? "None" : inven.warehouse.name}/>
          <LabelArea label="Address: " text={inven.warehouse === undefined ? "N/A" : inven.warehouse.address}/>
          <button type='button' onClick={e => this.onClickRelocate()}> Move To </button>
          <input type="text" placeholder='Enter Text' onChange={e => this.setState({relocate: e.target.value})}></input>
        </div>

        <ul>{this.renderItems(inven)}</ul>
        
        <div className='inline-block'>
          <InputArea label="Item Name: " onInput={this.onInput}/>
          <button type='button' onClick={e => this.onClickAddItem()}> Add Item </button>
        </div>
      </div>
    );
  }

  renderItems(inven) {
    const items = inven.items;
    console.log(`${JSON.stringify(items)}`);
    return items.map(item => <ItemEntry key={item.name} inventory={inven} item={item}/>);
  }

  onClickRelocate() {
    if(this.state.relocate === '' || this.state.relocate === undefined) return;
    //relocate is the name of warehouse to relocate this inventory to
    NetClient.RelocateInventory(this.props.inventory, this.state.relocate);
  }

  onClickAddItem() {
    if(this.state.item === '' || this.state.item === undefined) return;
    NetClient.AddInventoryItem(this.props.inventory, this.state.item);
  }

  onInput(target, value) {
    this.setState({item: value});
  }
}

class ItemEntry extends React.Component {
  constructor(props) {
    super(props);

    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onStockChanged = this.onStockChanged.bind(this);

    this.state = {stock: this.props.item.stock};
  }

  render() {
    return (
      <div className='inline-block'>
        <label>Item: {this.props.item.name} </label>
        <input type="text" placeholder='Enter Stock' onChange={this.onStockChanged} value={JSON.stringify(this.state.stock)}/>
        <button type='button' onClick={e => this.onClickEdit()}> Edit </button>
        <button type='button' onClick={e => this.onClickCancel()}> Cancel </button>
        <button type='button' onClick={e => this.onClickDelete()}> Delete </button>
      </div>
    );
  }

  onStockChanged(e) {
    let stock = parseInt(e.target.value);
    if(isNaN(stock)) return;
    this.setState({stock: stock});
  }

  onClickEdit() {
    NetClient.EditInventoryItem(this.props.inventory, this.props.item, this.state.stock);
  }

  onClickCancel() {
    this.setState({stock: this.props.item.stock});
  }

  onClickDelete() {
    NetClient.DeleteInventoryItem(this.props.inventory, this.props.item);
  }
}