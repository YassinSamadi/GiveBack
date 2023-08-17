import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Filter.scss'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const FilterOrganizations = () => {
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

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  // const handleLocationRangeChange = (range) => {
  //   setSelectedLocationRange(range);
  // };

  const dataForDisplay = expanded ? products : products.slice(0, 5);
  // const hideAllProducts =  [] ;


  return (
    <div>
      <div className="section">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h4>Organizations </h4>
            <button
                type="button"
                className={`expand-button ${hideList ? 'expanded' : ''}`}
                onClick={() => sethideList(!hideList)}
                >
                {hideList ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </button>
        </div>
      
    
  
        
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

    </div>
  );
};

export default FilterOrganizations;
