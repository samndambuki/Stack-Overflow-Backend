import joi from "joi";

// userName
// email
// password

export const registrationSchema = joi.object({
    userName:joi.string().required().min(3),
    email:joi.string().email(),
    password:joi.string().pattern(
        new RegExp('^[a-zA-Z0-9]{3,30}$'),
    )
})
