import { db } from "../database/database.js";
import dayjs from "dayjs";


export async function getRentals(req, res) {
    try {
        const result = await db.query(`SELECT 
            rentals.*,
            customers.id AS "customerId", customers.name AS "customerName",
            games.id AS "gameId", games.name AS "gameName"
             FROM rentals
             JOIN customers ON rentals."customerId" = customers.id
             JOIN games ON rentals."gameId" = games.id;
             `)

        const rentals = result.rows.map(row => {
            return {
                id: row.id,
                customerId: row.customerId,
                gameId: row.gameId,
                rentDate: dayjs(row.rentDate).format("YYYY-MM-DD"),
                daysRented: row.daysRented,
                returnDate: row.returnDate,
                originalPrice: row.originalPrice,
                delayFee: row.delayFee,
                customer: {
                    id: row.customerId,
                    name: row.customerName
                },
                game: {
                    id: row.gameId,
                    name: row.gameName
                }
            }
        })

        res.status(200).send(rentals)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        // Verifica se o cliente existe
        const customerResult = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId]);
        if (customerResult.rows.length === 0) {
            return res.status(404).send("Cliente não encontrado.");
        }

        // Verifica se o jogo existe
        const gameResult = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);
        if (gameResult.rows.length === 0) {
            return res.status(404).send("Jogo não encontrado.");
        }

        const game = gameResult.rows[0];

        // Verifica se o jogo está disponível (estoque)
        const rentalsResult = await db.query(`
            SELECT COUNT(*) FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;
        `, [gameId]);

        const rentalsCount = parseInt(rentalsResult.rows[0].count);
        if (rentalsCount >= game.stockTotal) {
            return res.status(422).send("Jogo indisponível.");
        }

        // Calcula o preço total do aluguel
        const rentDate = dayjs().format("YYYY-MM-DD");
        const originalPrice = daysRented * game.pricePerDay;

        // Insere o novo aluguel
        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [customerId, gameId, rentDate, daysRented, originalPrice, null, null]);

        res.sendStatus(201); // Retorna 201 (Created) em caso de sucesso

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function finshRentalById(req, res) {
    const { id } = req.params;

    try {
        // Verifica se o aluguel existe
        const rentalResult = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        if (rentalResult.rows.length === 0) {
            return res.status(404).send("Aluguel não encontrado.");
        }

        const rental = rentalResult.rows[0];

        // Verifica se o aluguel já está finalizado
        if (rental.returnDate !== null) {
            return res.status(422).send("Aluguel já está finalizado.");
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

        res.sendStatus(200); // Retorna 200 (OK) em caso de sucesso

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRentals(req, res) {
    const { id } = req.params;

    try {
        // Verifica se o aluguel existe
        const rentalResult = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        if (rentalResult.rows.length === 0) {
            return res.status(404).send("Aluguel não encontrado.");
        }

        const rental = rentalResult.rows[0];

        // Verifica se o aluguel já está finalizado
        if (rental.returnDate === null) {
            return res.status(400).send("Não é possível excluir um aluguel em aberto.");
        }

        // Apaga o aluguel
        await db.query(`DELETE FROM rentals WHERE id=$1;`, [id]);

        res.sendStatus(200); // Retorna 200 (OK) em caso de sucesso

    } catch (err) {
        res.status(500).send(err.message);
    }
}