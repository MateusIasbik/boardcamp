import dayjs from "dayjs";
import rentalsRepository from "../repositories/rentals.repositories.js";
import errors from "../errors/errors.js";

export async function getRentals() {
    const result = await rentalsRepository.getRentals();
    return result;
}

export async function createRental({ customerId, gameId, daysRented }) {
    // Verifica se o cliente existe
    const customerResult = await rentalsRepository.customerExist(customerId);
    if (customerResult.rows.length === 0) throw errors.invalidError("Cliente");

    // Verifica se o jogo existe
    const gameResult = await rentalsRepository.gameExist(gameId);
    if (gameResult.rows.length === 0) throw errors.invalidError("Jogo");
    const game = gameResult.rows[0];

    // Verifica se o jogo está disponível (estoque)
    const rentalsResult = await rentalsRepository.gameAvailable(gameId);

    const rentalsCount = parseInt(rentalsResult.rows[0].count);
    if (rentalsCount >= game.stockTotal) throw errors.invalidStockError();

    // Calcula o preço total do aluguel
    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = daysRented * game.pricePerDay;

    // Insere o novo aluguel
    await rentalsRepository.createRental(customerId, gameId, rentDate, daysRented, originalPrice);

}

export async function finshRentalById({ id }) {
    // Verifica se o aluguel existe
    const rentalResult = await rentalsRepository.finishRental(id);
    if (rentalResult.rows.length === 0) throw errors.invalidError("Aluguel");

    const rental = rentalResult.rows[0];

    // Verifica se o aluguel já está finalizado
    if (rental.returnDate !== null) throw errors.rentNotFinalizedError();

    const returnDate = dayjs(dayjs().format("YYYY-MM-DD"));
    const rentDate = dayjs(rental.rentDate);

    // Calcula dias de atraso
    const expectedReturnDate = rentDate.add(rental.daysRented, 'day');
    const delayDays = returnDate.diff(expectedReturnDate, 'day'); 
    const delayFee = delayDays > 0 ? delayDays * rental.originalPrice : 0;

    // Atualiza o aluguel com returnDate e delayFee
    await rentalsRepository.updateRental(returnDate, delayFee, id);
}

export async function deleteRentals({ id }) {
    const rentalResult = await rentalsRepository.getRentalsById(id);
    if (rentalResult.rows.length === 0) throw errors.invalidError("Aluguel");

    const rental = rentalResult.rows[0];

    // Verifica se o aluguel já está finalizado
    if (rental.returnDate === null) throw errors.rentNotFinalizedError();

    // Apaga o aluguel
    await rentalsRepository.deleteRental(id);
}

const rentalsService = {
    getRentals,
    createRental,
    finshRentalById,
    deleteRentals
}

export default rentalsService;