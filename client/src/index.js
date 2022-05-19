import './css/index.css';
import React from 'react';
import {createRoot} from 'react-dom/client'
import InventoryDotCom from './components/ui-inventory-page';
import NetClient from './net-client';
import Model from './model';

Model.Init();
const root = createRoot(document.getElementById('root'));
root.render(<InventoryDotCom/>);
NetClient.Init();