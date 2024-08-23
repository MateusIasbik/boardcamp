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
        const resultado = await gamesService.createGame(req.body)

        if (resultado === null) {
            return res.status(400).send("Ocorreu um erro")
        }

        res.status(201).send(resultado);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const gamesController = {
    getGames,
    createGame
}

export default gamesController;