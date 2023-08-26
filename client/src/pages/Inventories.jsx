import React from 'react';
import InventoriesTable from '../components/InventoriesTable';


import '../style/home.scss';


export const Inventories = () => {
  return (
    <div className="centered-container"> 
      <InventoriesTable/>
    </div>
  );
};

export default Inventories;
