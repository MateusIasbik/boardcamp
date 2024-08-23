import { db } from "../database/database.js";

async function getGames() {
    const games = await db.query(`SELECT * FROM games;`)
    return games.rows;
}

async function getGameByName(name) {
    const existingGame = await db.query(`SELECT * FROM games WHERE name=$1;`, [name]);
    return existingGame;
}

async function createGame(name, image, stockTotal, pricePerDay) {
    const resultado = await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4) RETURNING id;
        `, [name, image, stockTotal, pricePerDay])

    const idGame = resultado.rows[0].id;

    return {
        id: idGame,
        name,
        image,
        stockTotal,
        pricePerDay
    };
}

const gamesRepository = {
    getGames,
    getGameByName,
    createGame
}

export default gamesRepository;