import React from 'react';
import MessageQueue from '../message-queue';
import Model from '../model';
import NetClient from '../net-client';
import { InputArea } from './ui-common';

export class CreateInventoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);
    this.onClickCreateInventory = this.onClickCreateInventory.bind(this);
    this.onClickCreateWarehouse = this.onClickCreateWarehouse.bind(this);

    this.state = {name: "", warehouse: "", address: ""};
  }

  render() {
    if(!this.props.show) return;

    return (
      <div>
        <div className='block'>
          <InputArea label="Inventory Name: " onInput={this.onInput}/>
          <button type='button' onClick={e => this.onClickCreateInventory()}> Create Inventory </button>
        </div>

        <div className='block'>
          <InputArea label="Ware House Name: " onInput={this.onInput}/>
          <InputArea label="Ware House Address: " onInput={this.onInput}/>
          <button type='button' onClick={e => this.onClickCreateWarehouse()}> Create WareHouse </button>
        </div>
      </div>
    );
  }

  onInput(target, value) {
    if(target === "Inventory Name: ") this.setState({name: value});
    if(target === "Ware House Name: ") this.setState({warehouse: value});
    if(target === "Ware House Address: ") this.setState({address: value});
  }

  onClickCreateInventory() {
    if(!this.validInput(this.state.name)) return;

    NetClient.CreateInventory(this.state.name);
  }

  onClickCreateWarehouse() {
    if(!this.validInput(this.state.warehouse) || !this.validInput(this.state.address)) return;

    NetClient.CreateWarehouse(this.state.warehouse, this.state.address);
  }

  validInput(text) {
    return text !== '' && text !== undefined;
  }
}