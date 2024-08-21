import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.number().pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/).required(),
    cpf: joi.string().pattern(/^\d{11}$/).required(),
})