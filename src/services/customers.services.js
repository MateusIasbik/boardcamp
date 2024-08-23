import customersRepository from "../repositories/customers.repositories.js";

export async function getCustomer() {
    const customers = await customersRepository.getCustomer();
    return customers;
}

export async function getCustomerById({ id }) {

    const customer = await customersRepository.getCustomerById(id);

    // Verifica se o cliente existe
    if (customer.rows.length === 0) {
        return null;
    }

    return customer.rows[0];
}

export async function createCustomer(name, phone, cpf) {
    const existingCustomer = await customersRepository.getCustomerByCpf(cpf);
    if (existingCustomer.rows.length > 0) {
        return null;
    }

    const result = await customersRepository.createCustomer(name, phone, cpf);
    return result;
}

const customersService = {
    getCustomer,
    getCustomerById,
    createCustomer
}

export default customersService;