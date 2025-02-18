import { Router } from "express";
import { saveReg } from "./reg.controller.js";
import validarJWT from "../middlewares/validar-jwt.js";
import validarJWT from "../middlewares/validar-campos.js";
import {tieneRole}

const router = new Router();

router.post(
    '/',
    [

    ],
    saveReg
)

export default router