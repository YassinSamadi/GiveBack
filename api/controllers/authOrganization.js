import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = (req, res) => {
  const { name, email, password, address_id, logo } = req.body;

  const selectQuery = "SELECT * FROM organization WHERE email = ?";

  db.query(selectQuery, [email], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json("Email already exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const insertQuery = "INSERT INTO organization (name, email, password, address_id, logo) VALUES (?, ?, ?, ?, ?)";
    const values = [name, email, hash, address_id, logo];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Organization created successfully");
    });
  });
};

  

export const login = (req, res) => {
    const q = "SELECT * FROM organization WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Organization not found");

        const isValid = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isValid) return res.status(401).json("Invalid credentials");

        const token = jwt.sign({id: data[0].id}, "JWT");

        const{password, ...other} = data[0]

        res.cookie("organizationaccess_token", token, {
            httpOnly: true,
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie("token", {sameSite:"none", secure: true}).status(200).json("Logged out successfully")
}
