import { db } from "../database/database.js";
import { createCustomerService, getCustomerService, getCustomerServiceById } from "../services/customers.services.js";

export async function getCustomer(req, res) {
    try {
        const resultado = await getCustomerService();
        res.status(200).send(resultado);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomerById(req, res) {
    try {
        const resultado = await getCustomerServiceById(req.params);

        res.status(200).send(resultado);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomer(req, res) {
    const { name, phone, cpf } = req.body;
    try {

        // Verifica se já existe um cliente com o mesmo CPF
        const resultado = await createCustomerService(name, phone, cpf)
        res.status(201).send(resultado);
    } catch (err) {
        res.status(500).send(err.message)
    }
}