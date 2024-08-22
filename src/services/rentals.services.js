import dayjs from "dayjs";
import { db } from "../database/database.js";

export async function getRentalsService() {
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

export async function createRentalService({ customerId, gameId, daysRented }) {
    // Verifica se o cliente existe
    const customerResult = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId]);
    if (customerResult.rows.length === 0) {
        return null;
    }

    // Verifica se o jogo existe
    const gameResult = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);
    if (gameResult.rows.length === 0) {
        return null;
    }

    const game = gameResult.rows[0];

    // Verifica se o jogo está disponível (estoque)
    const rentalsResult = await db.query(`
        SELECT COUNT(*) FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;
    `, [gameId]);

    const rentalsCount = parseInt(rentalsResult.rows[0].count);
    if (rentalsCount >= game.stockTotal) {
        return null;
    }

    // Calcula o preço total do aluguel
    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = daysRented * game.pricePerDay;

    // Insere o novo aluguel
    const resultado = await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [customerId, gameId, rentDate, daysRented, originalPrice, null, null]);

}

export async function finshRentalServiceById({ id }) {
    // Verifica se o aluguel existe
    const rentalResult = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
    if (rentalResult.rows.length === 0) {
        return null;
    }

    const rental = rentalResult.rows[0];

    // Verifica se o aluguel já está finalizado
    if (rental.returnDate !== null) {
        return null;
    }

    const returnDate = dayjs().format("YYYY-MM-DD");
    const rentDate = dayjs(rental.rentDate);
    const daysRented = rental.daysRented;

    // Calcula dias de atraso
    const expectedReturnDate = rentDate.add(daysRented, 'day');
    const delayDays = dayjs(returnDate).diff(expectedReturnDate, 'day');
    const delayFee = delayDays > 0 ? delayDays * rental.originalPrice / daysRented : 0;

    // Atualiza o aluguel com returnDate e delayFee
    await db.query(`
        UPDATE rentals 
        SET "returnDate"=$1, "delayFee"=$2 
        WHERE id=$3;
    `, [returnDate, delayFee, id]);
}

export async function deleteRentalsService({ id }) {
    const rentalResult = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
    if (rentalResult.rows.length === 0) {
        return null;
    }

    const rental = rentalResult.rows[0];

    // Verifica se o aluguel já está finalizado
    if (rental.returnDate === null) {
        return null;
    }

    // Apaga o aluguel
    await db.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
}