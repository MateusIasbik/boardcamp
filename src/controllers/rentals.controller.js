import dayjs from "dayjs";
import rentalsService from "../services/rentals.services.js";

async function getRentals(req, res) {
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
}

async function createRental(req, res) {
    const result = await rentalsService.createRental(req.body);
    res.status(201).send(result);
}

async function finshRentalById(req, res) {
    const result = await rentalsService.finshRentalById(req.params);
    res.status(200).send(result);
}

async function deleteRentals(req, res) {
    const result = await rentalsService.deleteRentals(req.params);
    res.status(200).send(result);

}

const rentalsController = {
    getRentals,
    createRental,
    finshRentalById,
    deleteRentals
}

export default rentalsController;