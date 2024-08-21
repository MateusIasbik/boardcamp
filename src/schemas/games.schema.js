import joi from "joi";

export const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().min(0).required(),
    pricePerDay: joi.number().positive().precision(2).required(),
})