import gamesRepository from "../repositories/games.repositories.js";

export async function getGames() {
    const games = gamesRepository.getGames()
    return games;
}

export async function createGame({ name, image, stockTotal, pricePerDay }) {

    const existingGame = await gamesRepository.getGameByName(name);
    if (existingGame.rows.length > 0) {
        return `Um jogo com nome ${name} já existe`;
    }

    const result = await gamesRepository.createGame(name, image, stockTotal, pricePerDay);
    return result;
}

const gamesService = {
    getGames,
    createGame
}

export default gamesService;