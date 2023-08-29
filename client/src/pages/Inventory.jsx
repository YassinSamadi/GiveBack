import React from 'react';
import InventoryTable from '../components/Organization/InventoryTable';
import AddProduct from '../components/Organization/AddProduct';


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
