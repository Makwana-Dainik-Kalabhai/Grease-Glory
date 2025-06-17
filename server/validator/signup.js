const { z } = require("zod");

const signupSchema = z.object({
  username: z.string().trim().min(1, "Username is Required"),
  email: z.string().trim().min(1, "Email ID is Required"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password requires minimum 6 Characters" })
    .max(10, { message: "Password requires maximum 10 Characters" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Phone number requires minimum 10 Digits" })
    .max(10, { message: "Phone number requires maximum 10 Digits" }),
});

module.exports = signupSchema;
