import { db } from "../database/database.js";

export async function getCustomer(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        res.status(200).send(customers.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])

        // Verifica se o cliente existe
        if (customer.rows.length === 0) {
            return res.status(404).send("Cliente não encontrado.");
        }

        res.status(200).send(customer.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomer(req, res) {
    const { name, phone, cpf } = req.body;
    try {

        // Verifica se já existe um cliente com o mesmo CPF
        const existingCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);
        if (existingCustomer.rows.length > 0) {
            return res.status(409).send("CPF já existe.");
        }

        await db.query(`
            INSERT INTO customers (name, phone, cpf)
            VALUES ($1, $2, $3);
            `, [name, phone, cpf])
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message)
    }
}