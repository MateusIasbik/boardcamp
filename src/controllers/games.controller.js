import gamesService from "../services/games.services.js";

async function getGames(req, res) {
    const resultado = await gamesService.getGames();
    res.status(200).send(resultado)
}

async function createGame(req, res) {
    const result = await gamesService.createGame(req.body)
    res.status(201).send(result);
}

const gamesController = {
    getGames,
    createGame
}

export default gamesController;