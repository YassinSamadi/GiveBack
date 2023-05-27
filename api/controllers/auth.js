import {db} from "../db.js"
import bcrypt from "bcryptjs"

export const register = (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?"

    db.query(q, [req.body.email], (err, result) => {
        if(err) throw res.json(err)
        if(data.length) return res.status(409).json("Email already exists")

        const salt= bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user (email, password) VALUES (?, ?)"
        const values= [req.body.email, hash]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(201).json("User created successfully")
        })

    })
}

export const login = (req, res) => {
    
}

export const logout = (req, res) => {
    
}