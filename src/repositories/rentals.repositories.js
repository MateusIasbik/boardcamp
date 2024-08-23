import { db } from "../database/database.js";

async function getRentals() {
    const result = await db.query(`SELECT 
        rentals.*,
        customers.id AS "customerId", customers.name AS "customerName",
        games.id AS "gameId", games.name AS "gameName"
         FROM rentals
         JOIN customers ON rentals."customerId" = customers.id
         JOIN games ON rentals."gameId" = games.id;
         `)

    return result;
}

async function customerExist(customerId) {
    const customerResult = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId]);
    return customerResult;
}

async function gameExist(gameId) {
    const gameResult = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);
    return gameResult;
}

async function gameAvailable(gameId) {
    const rentalsResult = await db.query(`
        SELECT COUNT(*) FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;
    `, [gameId]);
    return rentalsResult;
}

async function createRental(customerId, gameId, rentDate, daysRented, originalPrice) {
    const result = await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [customerId, gameId, rentDate, daysRented, originalPrice, null, null]);
    return result;
}

async function finishRental(id) {
    const rentalResult = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
    return rentalResult;
}

async function updateRental(returnDate, delayFee, id) {
    const result = await db.query(`
        UPDATE rentals 
        SET "returnDate"=$1, "delayFee"=$2 
        WHERE id=$3;
    `, [returnDate, delayFee, id]);
    return result;
}

async function getRentalsById(id) {
    const rentalResult = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
    return rentalResult;
}

async function deleteRental(id) {
    const result = await db.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
    return result;
}

const rentalsRepository = {
    getRentals,
    customerExist,
    gameExist,
    gameAvailable,
    createRental,
    finishRental,
    updateRental,
    getRentalsById,
    deleteRental
}

export default rentalsRepository;