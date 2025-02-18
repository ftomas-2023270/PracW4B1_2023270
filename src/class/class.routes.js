import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { getClass, saveClass, updateClass, deleteClass, searchClass } from "./class.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { existeUsuarioById } from "../helpers/db-validator.js";

const router = new Router();

router.post(
    '/',
    [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
        check("teacher","Must be a valid ID").isMongoId(),
        check("teacher").custom(existeUsuarioById),
        validarCampos
    ],
    saveClass
);

router.get('/',getClass);

router.get(
    '/:id',
    [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
        check("id","Must be a valid Id").isMongoId(),
        validarCampos
    ],
    searchClass
)

router.put(
    '/:id',
    [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
        check("id","Must be a valid Id").isMongoId(),
        check('email','Este no es un correo valido').optional(),
        validarCampos
    ],
    updateClass
)

router.delete(
    '/:id',
    [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
        check("id","Must be a valid Id").isMongoId(),
        validarCampos
    ],
    deleteClass
)
export default router;