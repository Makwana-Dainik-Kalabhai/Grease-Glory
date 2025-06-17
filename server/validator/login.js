const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email ID is Required"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password requires minimum 6 Characters" })
    .max(10, { message: "Password requires maximum 10 Characters" }),
});

module.exports = loginSchema;
