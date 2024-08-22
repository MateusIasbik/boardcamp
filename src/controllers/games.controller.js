import { createGameService, getGamesService } from "../services/games.services.js";

export async function getGames(req, res) {
    try {
        const resultado = await getGamesService();
        res.status(200).send(resultado)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createGame(req, res) {
    try {
        const resultado = await createGameService(req.body)

        if (resultado === null) {
            return res.status(400).send("Ocorreu um erro")
        }

        res.status(201).send(resultado);
    } catch (err) {
        res.status(500).send(err.message)
    }
}