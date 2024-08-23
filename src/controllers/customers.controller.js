import customersService from "../services/customers.services.js";

async function getCustomer(req, res) {
    const resultado = await customersService.getCustomer();
    res.status(200).send(resultado);
}

async function getCustomerById(req, res) {
    const result = await customersService.getCustomerById(req.params);
    res.status(200).send(result);
}

async function createCustomer(req, res) {
    const { name, phone, cpf } = req.body;

    const resultado = await customersService.createCustomer(name, phone, cpf)
    res.status(201).send(resultado);
}

const customersController = {
    getCustomer,
    getCustomerById,
    createCustomer
}

export default customersController;