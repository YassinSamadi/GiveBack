import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Filter.scss'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const FilterNeeds = ({onProductFilterChange }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedLocationRange, setSelectedLocationRange] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [hideList, sethideList] = useState(false);

  useEffect(() => {
    axios
      .get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleClearFilters = () => {
    setSelectedCategories([]); 
    onProductFilterChange([]); 
  };


  const handleCategoryChange = (category) => {
    let updatedCategories;

    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(updatedCategories);

    onProductFilterChange(updatedCategories);
  };


  const dataForDisplay = expanded ? products : products.slice(0, 5);


  return (
    <div>
      <div className="section" >
        
      <h4 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    Needs 
    <button
      type="button"
      className={`expand-button ${hideList ? 'expanded' : ''}`}
      onClick={() => sethideList(!hideList)}
    >
    {hideList ? <ExpandMoreIcon /> : <ExpandLessIcon />}
    </button>
  </h4>
        
          {!hideList && dataForDisplay.map((product) => (
  <div key={product.id} className="checkbox-item">
    <input
      type="checkbox"
      id={product.id}
      checked={selectedCategories.includes(product.id)}
      onChange={() => handleCategoryChange(product.id)}
    />
    <label htmlFor={product.id}>{product.name}</label>
  </div>
))}

{!hideList && (
  <button
    type="button"
    className="expand-button"
    onClick={() => setExpanded(!expanded)}
  >
    {expanded ? 'Show Less' : 'Show More'}
  </button>
)}

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button className="expand-button" onClick={handleClearFilters}>Clear filters</button>
      </div>

    </div>
  );
};

export default FilterNeeds;
