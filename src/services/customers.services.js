import { db } from "../database/database.js";

export async function getCustomerService() {
    const customers = await db.query(`SELECT * FROM customers;`)
    return customers.rows;
}

export async function getCustomerServiceById({ id }) {

    const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])

    // Verifica se o cliente existe
    if (customer.rows.length === 0) {
        return null;
    }

    return customer.rows[0];
}

export async function createCustomerService(name, phone, cpf) {
    const existingCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);
    if (existingCustomer.rows.length > 0) {
        return null;
    }

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
