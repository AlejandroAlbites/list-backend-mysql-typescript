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
exports.updateNote = exports.destroyNote = exports.getNoteById = exports.showNotesByUser = exports.createList = void 0;
const user_1 = __importDefault(require("../models/user"));
const note_1 = __importDefault(require("../models/note"));
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            throw new Error('Invalid user');
        }
        const note = yield note_1.default.create(Object.assign(Object.assign({}, req.body), { userId: user.id }));
        res.status(200).json({
            ok: true,
            message: 'Note created',
            data: note
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be create',
            data: error.message
        });
    }
});
exports.createList = createList;
const showNotesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            throw new Error('Invalid user');
        }
        const notes = yield note_1.default.findAll({
            where: {
                userId: userId
            }
        });
        res.status(200).json({
            ok: true,
            message: 'Notes founded',
            data: notes
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Notes coult not be founded',
            data: error.message
        });
    }
});
exports.showNotesByUser = showNotesByUser;
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req;
        const user = yield user_1.default.findByPk(userId);
        const note = yield note_1.default.findByPk(id);
        console.log('id de usuario', user === null || user === void 0 ? void 0 : user.id);
        console.log('id de nota', note === null || note === void 0 ? void 0 : note.userId);
        if (!user) {
            throw new Error('Invalid user');
        }
        if (!note) {
            throw new Error('Invalid note');
        }
        if (note.userId !== user.id.toString()) {
            throw new Error("Note does not belong to this user");
        }
        res.status(200).json({
            ok: true,
            message: 'Note found',
            data: note
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be found',
            data: error.message
        });
    }
});
exports.getNoteById = getNoteById;
const destroyNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req;
        const note = yield note_1.default.findByPk(id);
        const user = yield user_1.default.findByPk(userId);
        if (!note) {
            throw new Error('Invalid note');
        }
        if (!user) {
            throw new Error('Invalid user');
        }
        if (note.userId !== user.id.toString()) {
            throw new Error("Note does not belong to this user");
        }
        yield note_1.default.destroy({
            where: {
                id: note.id
            }
        });
        res.status(200).json({
            ok: true,
            message: 'Note deleted',
            data: note
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be deleted',
            data: error.message
        });
    }
});
exports.destroyNote = destroyNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req;
        const data = req.body;
        const note = yield note_1.default.findByPk(id);
        const user = yield user_1.default.findByPk(userId);
        console.log(data);
        if (!note) {
            throw new Error('Invalid note');
        }
        if (!user) {
            throw new Error('Invalid user');
        }
        if (note.userId !== user.id.toString()) {
            throw new Error("Note does not belong to this user");
        }
        yield note_1.default.update(Object.assign(Object.assign({}, req.body), { text: req.body.text, favorite: req.body.favorite, name: req.body.name }), {
            where: {
                id: note.id,
            }
        });
        const noteUpdated = yield note_1.default.findByPk(id);
        res.status(200).json({
            ok: true,
            message: 'Note updated',
            data: noteUpdated
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be updated',
            data: error.message
        });
    }
});
exports.updateNote = updateNote;
//# sourceMappingURL=note.js.map