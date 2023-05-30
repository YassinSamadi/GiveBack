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
    const selectQuery = "SELECT * FROM need";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};
export const deleteNeed = (req, res) => {
    const selectQuery = "SELECT * FROM need";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};
export const updateNeed = (req, res) => {
    const selectQuery = "SELECT * FROM need";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};
