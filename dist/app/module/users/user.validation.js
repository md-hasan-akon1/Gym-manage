"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required"),
    email: zod_1.z.string()
        .email("Invalid email format")
        .nonempty("Email is required"),
    password: zod_1.z.string().nonempty("Password is required"),
    role: zod_1.z.enum(["admin", "trainer", "trainee"]).default("trainee"),
});
exports.updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum(["admin", "trainer", "trainee"]).optional(),
});
