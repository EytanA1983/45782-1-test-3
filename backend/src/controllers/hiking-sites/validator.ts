import Joi from "joi";

// Validation for region parameter
export const hikingSitesByRegionValidator = Joi.object({
    regionId: Joi.number().integer().positive().required()
});

// Validation for creating a new hiking site
export const createHikingSiteValidator = Joi.object({
    regionId: Joi.number().integer().positive().required(),
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(10).required(),
    adultPrice: Joi.number().min(0).required(),
    childPrice: Joi.number().min(0).required()
});

// Validation for deleting a hiking site
export const deleteHikingSiteValidator = Joi.object({
    id: Joi.number().integer().positive().required()
});

