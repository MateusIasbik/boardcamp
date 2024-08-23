import errors from "../errors/errors.js";
import customersRepository from "../repositories/customers.repositories.js";

async function getCustomer() {
    const customers = await customersRepository.getCustomer();
    return customers;
}

async function getCustomerById({ id }) {

    const customer = await customersRepository.getCustomerById(id);

    if (customer.rows.length === 0) throw errors.invalidError("Cliente");
    return customer.rows[0];
}

async function createCustomer(name, phone, cpf) {
    const existingCustomer = await customersRepository.getCustomerByCpf(cpf);
    if (existingCustomer.rows.length > 0) throw errors.conflictError("CPF");

    const result = await customersRepository.createCustomer(name, phone, cpf);
    return result;
}

const customersService = {
    getCustomer,
    getCustomerById,
    createCustomer
}

export default customersService;