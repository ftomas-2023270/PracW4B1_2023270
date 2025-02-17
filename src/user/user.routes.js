import { Router } from "express";
import {existeUsuarioById} from "../helpers/db-validator.js"
import { getUsers, getUserById, updateUser, deleteUser } from "./user.controller.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js"

const router = Router();

router.get("/",getUsers)

router.get(
    "/findUser/:id", 
    [
        check("id","No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    getUserById
);

router.put(
    '/:id',
    uploadProfilePicture.single('profilePicture'),
    [
        check("id","No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE","VENTAS_ROLE"),
        check("id","No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    deleteUser
)
export default router;