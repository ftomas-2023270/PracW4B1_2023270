import { Router } from "express";
import { register } from "./auth.controller.js";
import { registerValidator } from "../middlewares/validator.js";

const router = new Router();

router.post(
    '/register',
    registerValidator,
    register
)

export default router;