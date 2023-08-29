import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/user/filter.scss'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const FilterOrganizations = ({ onOrganizationFilterChange }) => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [hideList, sethideList] = useState(false);

  useEffect(() => {
    axios
      .get('/organization')
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
      });
  }, []);

  const handleClearFilters = () => {
    setSelectedCategories([]); 
    onOrganizationFilterChange([]); 
  };

  const handleCategoryChange = (category) => {
    let updatedCategories;

    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(updatedCategories);

    onOrganizationFilterChange(updatedCategories);
  };


  const dataForDisplay = expanded ? organizations : organizations.slice(0, 5);


  return (
    <div>
      <div className="section">
        <div className='title-needs'>
            <h4>Organizations </h4>
            <button
                type="button"
                className={`expand-button ${hideList ? 'expanded' : ''}`}
                onClick={() => sethideList(!hideList)}
                >
                {hideList ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </button>
        </div>
        
          {!hideList && dataForDisplay.map((organizations) => (
            <div key={organizations.id} className="checkbox-item">
              <input
                type="checkbox"
                id={organizations.id}
                checked={selectedCategories.includes(organizations.id)}
                onChange={() => handleCategoryChange(organizations.id)}
              />
              <label htmlFor={organizations.id}>{organizations.name}</label>
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
      <div className='container-expand'>
        <button className="expand-button" onClick={handleClearFilters}>Clear Filters</button>
      </div>

    </div>
  );
};

export default FilterOrganizations;
