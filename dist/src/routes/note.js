"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_1 = require("../controllers/note");
const validateJWT_1 = require("../middlewares/validateJWT");
const router = (0, express_1.Router)();
router.post("/", validateJWT_1.validateJWT, note_1.createList);
router.get("/", validateJWT_1.validateJWT, note_1.showNotesByUser);
router.get("/:id", validateJWT_1.validateJWT, note_1.getNoteById);
router.put("/update/:id", validateJWT_1.validateJWT, note_1.updateNote);
router.delete("/delete/:id", validateJWT_1.validateJWT, note_1.destroyNote);
exports.default = router;
//# sourceMappingURL=note.js.map