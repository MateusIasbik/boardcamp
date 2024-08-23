import gamesService from "../services/games.services.js";

export async function getGames(req, res) {
    try {
        const resultado = await gamesService.getGames();
        res.status(200).send(resultado)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createGame(req, res) {
    try {
        const result = await gamesService.createGame(req.body)
        res.status(201).send(result);
    } catch (err) {

        if (err === "conflict") {
            return res.status(409).send(err.message);
        }

        res.status(500).send(err.message)
    }
}

const gamesController = {
    getGames,
    createGame
}

export default gamesController;