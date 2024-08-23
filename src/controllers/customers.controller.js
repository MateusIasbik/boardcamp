import customersService from "../services/customers.services.js";

export async function getCustomer(req, res) {
    try {
        const resultado = await customersService.getCustomer();
        res.status(200).send(resultado);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomerById(req, res) {
    try {
        const result = await customersService.getCustomerById(req.params);
        res.status(200).send(result);
    } catch (err) {

        if (err === "invalidId") {
            return res.status(404).send(err.message);
        }

        res.status(500).send(err.message)
    }
}

export async function createCustomer(req, res) {
    const { name, phone, cpf } = req.body;
    try {
        const resultado = await customersService.createCustomer(name, phone, cpf)
        res.status(201).send(resultado);
    } catch (err) {

        if (err === "conflict") {
            return res.status(409).send(err.message);
        }

        res.status(500).send(err.message)
    }
}

const customersController = {
    getCustomer,
    getCustomerById,
    createCustomer
}

export default customersController;