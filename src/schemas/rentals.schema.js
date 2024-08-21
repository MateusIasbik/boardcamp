import joi from "joi";

export const rentalsSchema = joi.object({
    id: joi.number().integer().positive().required(),
    customerId: joi.number().integer().positive().required(),
    gameId: joi.number().integer().positive().required(),
    rentDate: joi.date().iso().required(),
    daysRented: joi.number().integer().positive().required(),
    returnDate: joi.date().iso().allow(null),
    originalPrice: joi.number().integer().positive().required(),
    delayFee: joi.number().integer().min(0).allow(null)
  });