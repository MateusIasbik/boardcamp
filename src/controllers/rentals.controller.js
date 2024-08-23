import dayjs from "dayjs";
import rentalsService from "../services/rentals.services.js";

async function getRentals(req, res) {
    try {
    const result = await rentalsService.getRentals();

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

async function createRental(req, res) {
    try {
        const result = await rentalsService.createRental(req.body);
        res.status(201).send(result);

    } catch (err) {

        if (err.type === "invalidId") {
            return res.status(404).send(err.message);
        }

        if (err.type === "invalidId") {
            return res.status(404).send(err.message);
        }

        if (err.type === "invalidStock") {
            return res.status(422).send(err.message);
        }

        res.status(500).send(err.message);
    }
}

async function finshRentalById(req, res) {

    try {
        const result = await rentalsService.finshRentalById(req.params);
        res.status(200).send(result);

    } catch (err) {

        if (err === "invalidId") {
            return res.status(404).send(err.message);
        }

        if (err === "RentNotFinalized") {
            return res.status(422).send(err.message);
        }

        res.status(500).send(err.message);
    }
}

async function deleteRentals(req, res) {

    try {
        const result = await rentalsService.deleteRentals(req.params);
        res.status(200).send(result);

    } catch (err) {

        if (err === "invalidId") {
            return res.status(404).send(err.message);
        }

        if (err === "RentNotFinalized") {
            return res.status(400).send(err.message);
        }

        res.status(500).send(err.message);
    }
}

const rentalsController = {
    getRentals,
    createRental,
    finshRentalById,
    deleteRentals
}

export default rentalsController;