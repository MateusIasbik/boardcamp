import { db } from "../database/database.js";

export async function getGamesService() {
    const games = await db.query(`SELECT * FROM games;`)

    return games.rows;
}

export async function createGameService({ name, image, stockTotal, pricePerDay }) {

    // Verifica se já existe um jogo com o mesmo nome
    const existingGame = await db.query(`SELECT * FROM games WHERE name=$1;`, [name]);
    if (existingGame.rows.length > 0) {
        return null;
    }

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