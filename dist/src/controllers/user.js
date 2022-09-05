"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = exports.LoginUser = exports.RegisterUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const generateJWT_1 = require("../helpers/generateJWT");
const bcrypt_1 = __importDefault(require("bcrypt"));
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const avatar = req.body.avatar;
        const userExist = yield user_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (userExist) {
            throw new Error("the email already exists");
        }
        const encryptPassword = yield bcrypt_1.default.hash(password, 8);
        const newUser = {
            name: name,
            email: email,
            password: encryptPassword,
            avatar: avatar,
        };
        const user = yield user_1.default.create(newUser);
        const token = yield (0, generateJWT_1.JWTgenerator)(user.id);
        res.status(200).json({
            ok: true,
            message: "User created",
            data: user,
            token,
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: "User coult not be create",
            data: error.message,
        });
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield user_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new Error("the email does not exists");
        }
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error("the password is incorrect");
        }
        const token = yield (0, generateJWT_1.JWTgenerator)(user.id);
        res.status(200).json({
            ok: true,
            message: "User logged",
            data: user,
            token,
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: "User coult not be loggin",
            data: error.message,
        });
    }
});
exports.LoginUser = LoginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.status(200).json({
            ok: true,
            msg: "users found",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "users not found",
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { id } = req.params;
    const { userId } = req;
    try {
        const user = yield user_1.default.findByPk(userId);
        // if (!user || user.id !== userId) {
        //     throw new Error('the user does not exist')
        // }
        let { password } = user, showUser = __rest(user, ["password"]);
        res.status(200).json({
            ok: true,
            message: "User found",
            data: showUser,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            data: error.message,
            msg: "user not found",
        });
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=user.js.map