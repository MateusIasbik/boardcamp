import dayjs from "dayjs";
import { createRentalService, deleteRentalsService, finshRentalServiceById, getRentalsService } from "../services/rentals.services.js";


export async function getRentals(req, res) {
    try {
        const result = await getRentalsService();

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
    try {
        
        const result = await createRentalService(req.body);

        if (result === null) {
            return res.status(400).send("Ocorreu um erro ao criar o aluguel. Verifique os dados fornecidos.");
        }

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function finshRentalById(req, res) {

    try {
        const result = await finshRentalServiceById(req.params);

        if (result === null) {
            return res.status(400).send("Não é possível finalizar um aluguel inexistente ou já finalizado.");
        }


        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRentals(req, res) {

    try {
        const result = await deleteRentalsService(req.params);

        if (result === null) {
            return res.status(400).send("Não é possível deletar um aluguel não finalizado ou inexistente.");
        }      

        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
}