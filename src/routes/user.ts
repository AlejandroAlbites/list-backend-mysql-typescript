import {
  getUsers,
  getUserById,
  RegisterUser,
  LoginUser,
} from "./../controllers/user";
import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.post("/", RegisterUser);
router.post("/login", LoginUser);
router.get("/", getUsers);
router.get("/userId", validateJWT, getUserById);

export default router;
