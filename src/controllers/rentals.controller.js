import { db } from "../database/database.js"

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`SELECT * FROM rentals;`)
        res.send(rentals.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    try {
        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "daysRented")
            VALUES ($1, $2, $3);
            `, [customerId, gameId, daysRented])
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function finshRentalById(req, res) {
    res.send("finshRentalById")
}

export async function deleteRentals(req, res) {
    const { id } = req.params;
    try {
        await db.query(`DELETE FROM rentals WHERE id=$1;`, [id])
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}