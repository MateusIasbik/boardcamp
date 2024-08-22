import joi from "joi";

export const gamesSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string()
    .pattern(/^\d{10,11}$/)
    .required()
    .messages({
      'string.pattern.base': 'O telefone deve ter 10 ou 11 dígitos'
    }),
  cpf: joi.string()
    .length(11)
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      'string.pattern.base': 'O CPF deve ter 11 dígitos'
    }),
});