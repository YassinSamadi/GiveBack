import {db} from "../db.js"

export const getAllNeeds = (req, res) => {
    const selectQuery = "SELECT * FROM need";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
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
    const selectQuery = `SELECT need.*, organization.name AS organization_name, address.city AS organization_city, product.name AS product_name, product.picture AS product_picture
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
    const {title,description, quantity_required, date, org_id, product_id} = req.body; 

    try{
        const insertQuery = "INSERT INTO need (title, description, quantity_required, quantity_fulfilled, date, org_id, product_id) VALUES (?, ?, ?, 0 , ?, ?, ?)";
        const values = [title, description, quantity_required, date, org_id, product_id];
        db.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json("Need created successfully");
        });
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
    
};
export const deleteNeed = (req, res) => {
    const id = req.query.id; 
    
    try {
        const deleteQuery = `DELETE FROM need WHERE id = ?`;
        
        db.query(deleteQuery, id, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Need deleted successfully");
        });
    } catch(error) {
        console.log(error);
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
        console.log(error);
        return res.status(500).json(error);
    }    
};


