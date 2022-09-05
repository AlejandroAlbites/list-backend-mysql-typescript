"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Note = connection_1.default.define('Note', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    text: {
        type: sequelize_1.DataTypes.STRING
    },
    favorite: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = Note;
//# sourceMappingURL=note.js.map