import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().required(),
})