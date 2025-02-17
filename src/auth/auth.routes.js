import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/validator.js";

const router = new Router();

router.post(
    '/register',
    registerValidator,
    register
)

router.post(
    '/log',
    loginValidator,
    login
)

export default router;