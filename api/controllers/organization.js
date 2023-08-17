import {db} from "../db.js"

export const getAllOrganizations = (req, res) => {
    const selectQuery = "SELECT * FROM organization";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};

export const getOrganizationNeedsById = (req, res) => {
    const id = req.params.id;
    const selectQuery = `SELECT organization.*, need.id as needId, 
    need.title AS needTitle, 
    need.description AS needDescription, 
    need.quantity_required AS needQuantityRequired, 
    need.quantity_fulfilled AS needQuantityFulfilled, 
    need.date AS needDate, 
    need.product_id AS needProductId, 
    product.name AS productName, 
    product.picture AS productPicture
    FROM organization
    LEFT JOIN need ON organization.id = need.org_id
    LEFT JOIN product ON need.product_id = product.id
    WHERE organization.id IS NOT NULL AND organization.id = ? AND need.quantity_fulfilled < need.quantity_required ` ;
    
    db.query(selectQuery, [id], (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};
