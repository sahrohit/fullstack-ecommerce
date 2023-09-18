import Joi from "joi";
import { RegisterInput } from "../resolvers/GqlObjets/RegisterInput";
import { AdminRegisterInput } from "../resolvers/GqlObjets/Admin";

const registerSchema = Joi.object({
	password: Joi.string().min(8).max(30),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net", "edu"] },
	}),
	first_name: Joi.string().required(),
	last_name: Joi.string(),
});

const registerAdminSchema = Joi.object({
	password: Joi.string().min(8).max(30),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net", "edu"] },
	}),
	first_name: Joi.string().required(),
	last_name: Joi.string(),
	tenant_name: Joi.string().required(),
	tenant_desc: Joi.string().required(),
	tenant_category_id: Joi.number().required(),
	subdomain: Joi.string().required(),
});

export const validateRegister = (options: RegisterInput) => {
	const { error } = registerSchema.validate(options);

	if (error) {
		return [
			{
				field: error.details[0].path[0] as string,
				message: error.details[0].message.split('"').join(""),
			},
		];
	}
	return null;
};

export const validateAdminRegister = (options: AdminRegisterInput) => {
	const { error } = registerAdminSchema.validate(options);

	if (error) {
		return [
			{
				field: error.details[0].path[0] as string,
				message: error.details[0].message.split('"').join(""),
			},
		];
	}
	return null;
};
