"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const host = process.env.HOST;
const baseName = process.env.DATANAME;
const name = process.env.NAME;
const pass = process.env.PASS;
const db = new sequelize_1.Sequelize(baseName, name, pass, {
    host: host,
    dialect: "mysql",
    query: { raw: true },
});
exports.default = db;
//# sourceMappingURL=connection.js.map