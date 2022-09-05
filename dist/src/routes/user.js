"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../controllers/user");
const express_1 = require("express");
const validateJWT_1 = require("../middlewares/validateJWT");
const router = (0, express_1.Router)();
router.post("/", user_1.RegisterUser);
router.post("/login", user_1.LoginUser);
router.get("/", user_1.getUsers);
router.get("/userId", validateJWT_1.validateJWT, user_1.getUserById);
exports.default = router;
//# sourceMappingURL=user.js.map