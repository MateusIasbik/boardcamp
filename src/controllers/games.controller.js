import { db } from "../database/database.js"

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`)
        res.status(200).send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    try {

        // Verifica se já existe um jogo com o mesmo nome
        const existingGame = await db.query(`SELECT * FROM games WHERE name=$1;`, [name]);
        if (existingGame.rows.length > 0) {
            return res.status(409).send("Nome do jogo já existe.");
        }

        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);
            `, [name, image, stockTotal, pricePerDay])
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message)
    }
}