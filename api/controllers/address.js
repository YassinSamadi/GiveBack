import {
  db
} from "../db.js"
import NodeGeocoder from 'node-geocoder';

const options = {
  provider: 'mapbox',
  apiKey: process.env.MAPBOX_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

export const registerAddress = async (req, res) => {
  const {
    street,
    number,
    city,
    country,
    postal_code,
    isOrganization
  } = req.body;

  try {
    const fullAddress = `${number} ${street}, ${city}, ${postal_code}, ${country}`;
    const geo = await geocoder.geocode(fullAddress);

    if (!geo.length) {
      return res.status(400).json({
        message: 'Could not geocode address'
      });
    }

    const [longitude, latitude] = [geo[0].longitude, geo[0].latitude];
    const insertQuery = "INSERT INTO address (street, number, city, country, postal_code, isOrganization, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [street, number, city, country, postal_code, isOrganization, longitude, latitude];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(201).json({
        id: result.insertId
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllAddressesWithOrganizations = (req, res) => {
  const selectQuery = `
      SELECT address.*, organization.name as organizationName, organization.id as organizationId, organization.logo as organizationLogo
      FROM address 
      LEFT JOIN organization ON address.id = organization.address_id 
      WHERE address.isOrganization = 1
    `;
  db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(results);
  });
};

export const getAllAddressesOrganizations = (req, res) => {
  const selectQuery = "SELECT * FROM address WHERE isOrganization = 1";

  db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(results);
  });
};

export const getAddressOrganization = (req, res) => {
  const org_id = req.params.id;

  const selectQuery = `SELECT * FROM address WHERE id = ${org_id}`;

  db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(results);
  });
}

export const updateAddress = async (req, res) => {
  const {
    id,
    street,
    number,
    city,
    country,
    postal_code
  } = req.body;

  try {
    const fullAddress = `${number} ${street}, ${city}, ${postal_code}, ${country}`;
    const geo = await geocoder.geocode(fullAddress);

    if (!geo.length) {
      return res.status(400).json({
        message: 'Could not geocode address'
      });
    }

    const [longitude, latitude] = [geo[0].longitude, geo[0].latitude];
    const updateQuery = `UPDATE address
            SET street = ?, 
                number = ?, 
                city = ?, 
                country = ?, 
                postal_code = ?, 
                longitude = ?, 
                latitude = ?
            WHERE id = ?;`;
    const values = [street, number, city, country, postal_code, longitude, latitude, id];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        message: "Address updated successfully"
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}