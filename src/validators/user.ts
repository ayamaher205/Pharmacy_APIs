import joi from "joi";

const passwordRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const signUp = joi.object({
    first_name: joi.string().trim().min(3).max(30)
        .required(),
    last_name: joi.string().trim().min(3).max(30)
        .required(),
    email: joi.string().trim().email().max(50),
    password: joi.string().trim().regex(passwordRegex).required(),
    phone: joi.string().trim().max(11).required(),
    address: joi.string().trim().max(50).required(),
    role: joi.string().trim().valid(["user", "admin"]),
});

const signin = joi.object({
    email: joi.string().trim().email().max(50),
    password: joi.string().trim().regex(passwordRegex).required(),
});
export default {
    signUp,
    signin,
};
