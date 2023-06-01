import {db} from "../db.js"

export const getAllNeeds = (req, res) => {
    const selectQuery = "SELECT * FROM need";
    
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
        const insertQuery = "INSERT INTO need (title, description, quantity_required, date, org_id, product_id) VALUES (?, ?, ?, ?, ?, ?)";
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
    
};
export const updateNeed = (req, res) => {
    const selectQuery = "SELECT * FROM need";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};
