
import * as yup from "yup"

export const registerSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
        userName: yup.string().required(),
        fullName: yup.string().required(),
        phoneNumber: yup.string().required(),

    })