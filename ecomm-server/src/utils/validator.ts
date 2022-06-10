import Joi from "joi";
import { RegisterInput } from "../resolvers/GqlObjets/RegisterInput";

const schema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string()
		.pattern(
			new RegExp(
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
			)
		)
		.min(8)
		.max(30),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	phone_number: Joi.string().pattern(new RegExp("^[0-9]{3,30}$")),
	first_name: Joi.string().required(),
	last_name: Joi.string(),
});

export const validateRegister = (options: RegisterInput) => {
	const { error } = schema.validate(options);

	if (error) {
		return [
			{
				field: error.details[0].path[0] as string,
				message: error.details[0].message.replaceAll('"', ""),
			},
		];
	}
	return null;
};
