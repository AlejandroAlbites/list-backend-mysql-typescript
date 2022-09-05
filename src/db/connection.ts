import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const host: string = process.env.HOST as string;
const baseName: string = process.env.DATANAME as string;
const name: string = process.env.NAME as string;
const pass: string = process.env.PASS as string;

const db = new Sequelize(baseName, name, pass, {
  host: host,
  dialect: "mysql",
  query: { raw: true },
});

export default db;
