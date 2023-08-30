import {
    db
} from "../db.js"
import jwt from "jsonwebtoken";

export const addTransaction = (req, res) => {
    const token = req.cookies.useraccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const userId = decoded.id;
        const {
            quantity,
            inventoryId
        } = req.body;
        const values = [quantity, new Date(), userId, inventoryId]
        try {
            let insertQuery = `INSERT INTO transaction (quantity, transaction_date, user_id, inventory_id) VALUES (?,?,?,?)`

            db.query(insertQuery, values, (err) => {
                if (err) {
                    console.error("Error inserting request:", err);
                    return res.status(500).json({
                        error: "An error occurred while inserting request."
                    });
                }
                return res.status(200).json({
                    message: "Request inserted successfully"
                });
            });
        } catch (error) {
            console.error("Caught an exception:", error);
            return res.status(500).json({
                error: "An internal server error occurred."
            });
        }
    });
}

export const getActiveTransactions = (req, res) => {
    const token = req.cookies.organizationaccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const organization_id = decoded.id;
        const selectQuery = `
        SELECT transaction.id,
        transaction.quantity,
        user.first_name,
        user.last_name,
        product.name,
        product.picture
        FROM transaction
        INNER JOIN user on transaction.user_id = user.id
        INNER JOIN inventory ON transaction.inventory_id = inventory.id
        INNER JOIN product ON inventory.product_id = product.id
        WHERE inventory.org_id = ? AND confirmation_date IS NULL`;

        db.query(selectQuery, organization_id, (err, results) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(results);
        });
    })
}

export const confirmPickup = (req, res) => {
    const transaction_id = req.query.id;

    try {
        let updateQuery =
            `UPDATE transaction 
        SET confirmation_date = NOW()
        WHERE id = ?`

        db.query(updateQuery, transaction_id, (err, data) => {
            if (err) {
                console.error("Error updating transaction:", err);
                return res.status(500).json({
                    error: "An error occurred while updating the transaction."
                });
            }
            return res.status(200).json({
                message: "Transaction updated successfully"
            });
        });
    } catch (error) {
        console.error("Caught an exception:", error);
        return res.status(500).json({
            error: "An internal server error occurred."
        });
    }
}

export const deleteTransaction = (req, res) => {
    const transaction_id = req.query.id;

    try {
        const updateQuery =
            `UPDATE inventory AS i
            JOIN transaction AS t ON i.id = t.inventory_id
            SET i.quantity = i.quantity + t.quantity
            WHERE t.id = ?`;

        db.query(updateQuery, transaction_id, (err, data) => {
            if (err) {
                console.error("Error updating inventory:", err);
                return res.status(500).json({
                    error: "An error occurred while updating the inventory."
                });
            }

            const transactionUpdateQuery =
                `UPDATE transaction
                SET confirmation_date = NOW(),
                    quantity = -1
                WHERE id = ?`;

            db.query(transactionUpdateQuery, transaction_id, (err, data) => {
                if (err) {
                    console.error("Error updating transaction:", err);
                    return res.status(500).json({
                        error: "An error occurred while updating the transaction."
                    });
                }
                
                return res.status(200).json({
                    message: "Transaction updated successfully"
                });
            });
        });
    } catch (error) {
        console.error("Caught an exception:", error);
        return res.status(500).json({
            error: "An internal server error occurred."
        });
    }
};
