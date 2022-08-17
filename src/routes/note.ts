import { Router } from 'express'
import { createList, showNotesByUser, getNoteById, destroyNote, updateNote } from '../controllers/note'
import { validateJWT } from '../middlewares/validateJWT'
const router = Router()

router.post("/", validateJWT, createList)
router.get("/", validateJWT, showNotesByUser)
router.get("/:id", validateJWT, getNoteById)
router.put("/update/:id", validateJWT, updateNote)
router.delete("/delete/:id", validateJWT, destroyNote)

export default router