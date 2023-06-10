import Joi from "joi";
import { RegisterInput } from "../resolvers/GqlObjets/RegisterInput";

const schema = Joi.object({
	password: Joi.string().min(8).max(30),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net", "edu"] },
	}),
	first_name: Joi.string().required(),
	last_name: Joi.string(),
});

export const validateRegister = (options: RegisterInput) => {
	const { error } = schema.validate(options);

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
