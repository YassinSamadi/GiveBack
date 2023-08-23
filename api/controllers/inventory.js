import {db} from "../db.js"

export const getInventory = (req, res) => {
    const id = req.query.id;
    const selectQuery = `
    SELECT inventory.*,
            product.id as product_id,
           product.name AS product_name, 
           product.picture AS product_picture
    FROM inventory
    LEFT JOIN product ON inventory.product_id = product.id
    WHERE inventory.org_id = ?
`;

    db.query(selectQuery, id, (err, results) => {
        if (err) return res.status(500).json(err);
    
        return res.status(200).json(results);
    });
};

export const addToInventory = (req, res) => {
    const { quantity } = req.body;
    const id = req.query.id;
    const values = [quantity, id]

    try {
        let updateQuery = 
        `UPDATE inventory 
        SET quantity = quantity + ?
        WHERE id = ?`
        
        db.query(updateQuery, values, (err, data) => {
            if (err) {
                console.error("Error updating inventory:", err);
                return res.status(500).json({ error: "An error occurred while updating the inventory." });
            }
            return res.status(200).json({ message: "Inventory updated successfully" });
        });
    } catch (error) {
        console.error("Caught an exception:", error);
        return res.status(500).json({ error: "An internal server error occurred." });
    }
}

export const removeFromInventory = (req, res) => {
    const { quantity } = req.body;
    const id = req.query.id;
    const values = [quantity, id]

    try {
        let updateQuery = 
        `UPDATE inventory 
        SET quantity = quantity - ?
        WHERE id = ?`
        
        db.query(updateQuery, values, (err, data) => {
            if (err) {
                console.error("Error updating inventory:", err);
                return res.status(500).json({ error: "An error occurred while updating the inventory." });
            }
            return res.status(200).json({ message: "Inventory updated successfully" });
        });
    } catch (error) {
        console.error("Caught an exception:", error);
        return res.status(500).json({ error: "An internal server error occurred." });
    }
}