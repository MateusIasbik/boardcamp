import joi from "joi";

export const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().positive().integer().min(1).required(),
    pricePerDay: joi.number().positive().precision(2).min(1).required(),
})