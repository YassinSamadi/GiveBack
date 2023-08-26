import React from 'react';
import InventoryTable from '../components/InventoryTable';
import AddProduct from '../components/AddProduct';


import '../style/home.scss';


export const Inventory = () => {
  return (
    <div className="centered-container"> 
      <AddProduct/>
      <InventoryTable/>
    </div>
  );
};

export default Inventory;
