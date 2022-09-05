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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = __importDefault(require("../routes/user"));
const note_1 = __importDefault(require("../routes/note"));
class Server {
    constructor() {
        this.apiPaths = {
            user: "/api/user",
            note: "/api/note",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database Online");
            }
            catch (error) {
                throw new Error("error");
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.user, user_1.default),
            this.app.use(this.apiPaths.note, note_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server running in port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map