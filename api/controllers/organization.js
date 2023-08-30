import {db} from "../db.js"
import jwt from "jsonwebtoken";
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

export const getAllOrganizationsWithInventory = (req, res) => {
    const selectQuery = `
    SELECT organization.*
    FROM organization
    LEFT JOIN inventory ON organization.id = inventory.org_id
    WHERE inventory.id IS NULL`;
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};

export const getOrganization = (req, res) => {
    const token = req.cookies.organizationaccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const organization_id = decoded.id;
        
        const selectQuery = "SELECT * FROM organization where id = ?";
        
        db.query(selectQuery, [organization_id], (err, results) => {
            if (err) return res.status(500).json(err);
        
            return res.status(200).json(results);
        });
    });
};


export const getOrganizationsInventory = (req, res) => {
    const selectQuery = `
    SELECT organization.*
    FROM organization
    LEFT JOIN inventory ON organization.id = inventory.org_id
    WHERE inventory.quantity > 0
    GROUP BY organization.id`;
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};
