import React from 'react';
import InventoryTable from '../../components/organization/InventoryTable';
import AddProduct from '../../components/organization/AddProduct';


export const Inventory = () => {
  return (
    <div className="centered-container"> 
      <AddProduct/>
      
      <InventoryTable/>
    </div>
  );
};

export default Inventory;
