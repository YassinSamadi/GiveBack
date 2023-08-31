import {db} from "../db.js"
import jwt from "jsonwebtoken";


export const getAllNeeds = (req, res) => {
    const token = req.cookies.organizationaccess_token;
    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const org_id = decoded.id;

        const selectQuery = "SELECT * FROM need WHERE delete_date IS NULL AND org_id = ?";

        db.query(selectQuery, [org_id], (err, results) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(results);
        });
    });
};


export const getUserNeeds = (req, res) => {
    const selectQuery = `
    SELECT need.*, 
           organization.name AS organization_name, 
           address.city AS organization_city, 
           product.name AS product_name, 
           product.picture AS product_picture
    FROM need 
    LEFT JOIN organization ON need.org_id = organization.id 
    LEFT JOIN address ON organization.address_id = address.id
    LEFT JOIN product ON need.product_id = product.id
`;

    db.query(selectQuery, (err, results) => {
        if (err) return res.status(500).json(err);
    
        return res.status(200).json(results);
    });
};

export const getSpecificNeed = (req, res) => {
    const selectQuery = `SELECT need.*, organization.name AS organization_name, address.city AS organization_city,product.id AS product_id, product.name AS product_name, product.picture AS product_picture
    FROM need 
    LEFT JOIN organization ON need.org_id = organization.id 
    LEFT JOIN address ON organization.address_id = address.id
    LEFT JOIN product ON need.product_id = product.id `;

    db.query(selectQuery, (err, results) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(results);
        });

};




export const getNeed = (req, res) => {
    const selectQuery = "SELECT * FROM need";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};

export const addNeed = (req, res) => {
    const { title, description, quantity_required, date, product_id } = req.body;

    const token = req.cookies.organizationaccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const org_id = decoded.id;

        try {
            const insertQuery = "INSERT INTO need (title, description, quantity_required, quantity_fulfilled, date, org_id, product_id) VALUES (?, ?, ?, 0 , ?, ?, ?)";
            const values = [title, description, quantity_required, date, org_id, product_id];
            
            db.query(insertQuery, values, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(201).json("Need created successfully");
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    });
};

export const deleteNeed = (req, res) => {
    const id = req.query.id; 
    
    try {
        const deleteQuery = `UPDATE need SET delete_date = NOW() WHERE id = ?`;
        
        db.query(deleteQuery, id, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Need deleted successfully");
        });
    } catch(error) {
        return res.status(500).json(error);
    }    
};

export const updateNeed = (req, res) => {
    const { id, title, description, quantity_required, org_id, product_id } = req.body; 

    try {
        const updateQuery = `
            UPDATE need 
            SET 
                title = ?, 
                description = ?, 
                quantity_required = ?, 
                org_id = ?, 
                product_id = ? 
            WHERE 
                id = ?`;
        const values = [title, description, quantity_required, org_id, product_id, id];
        
        db.query(updateQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Need updated successfully");
        });
    } catch(error){
        return res.status(500).json(error);
    }    
};


