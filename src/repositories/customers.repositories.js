import { db } from "../database/database.js";

async function getCustomer() {
    const customers = await db.query(`SELECT * FROM customers;`)
    return customers.rows;
}

async function getCustomerById(id) {
    const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
    return customer;
}

async function getCustomerByCpf(cpf) {
    const existingCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);
    return existingCustomer;
}

async function createCustomer(name, phone, cpf) {
    const resultado = await db.query(`
        INSERT INTO customers (name, phone, cpf)
        VALUES ($1, $2, $3) RETURNING id;
        `, [name, phone, cpf])

    const idCustomer = resultado.rows[0].id;

    return {
        id: idCustomer,
        name,
        phone,
        cpf
    }
}

const customersRepository = {
    getCustomer,
    getCustomerById,
    getCustomerByCpf,
    createCustomer
}

export default customersRepository;