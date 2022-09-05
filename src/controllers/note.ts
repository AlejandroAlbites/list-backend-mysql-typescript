import { Response } from 'express'
import User, { UserEntry } from '../models/user'
import Note, { NotesEntry } from '../models/note'
import { RequestWithUserId } from '../middlewares/validateJWT'

export const createList = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { userId }: any = req

        const user: UserEntry | null = await User.findByPk(userId)

        if (!user) {
            throw new Error('Invalid user')
        }

        const note: NotesEntry = await Note.create({ ...req.body, userId: user.id })

        res.status(200).json({
            ok: true,
            message: 'Note created',
            data: note
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be create',
            data: error.message
        })
    }
}

export const showNotesByUser = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { userId }: any = req
        const user: UserEntry | null = await User.findByPk(userId)

        if (!user) {
            throw new Error('Invalid user')
        }

        const notes: NotesEntry[] = await Note.findAll({
            where: {
                userId: userId
            }
        });

        res.status(200).json({
            ok: true,
            message: 'Notes founded',
            data: notes
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Notes coult not be founded',
            data: error.message
        })
    }
}

export const getNoteById = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { userId }: any = req
        const user: UserEntry | null = await User.findByPk(userId)
        const note: NotesEntry | null = await Note.findByPk(id)

        console.log('id de usuario', user?.id)
        console.log('id de nota', note?.userId)

        if (!user) {
            throw new Error('Invalid user')
        }

        if (!note) {
            throw new Error('Invalid note')
        }

        if (note.userId !== user.id.toString()) {
            throw new Error("Note does not belong to this user");
        }

        res.status(200).json({
            ok: true,
            message: 'Note found',
            data: note
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be found',
            data: error.message
        })
    }
}

export const destroyNote = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { userId }: any = req
        const note: NotesEntry | null = await Note.findByPk(id)
        const user: UserEntry | null = await User.findByPk(userId)

        if (!note) {
            throw new Error('Invalid note')
        }

        if (!user) {
            throw new Error('Invalid user')
        }

        if (note.userId !== user.id.toString()) {
            throw new Error("Note does not belong to this user");
        }

        await Note.destroy({
            where: {
                id: note.id
            }
        })

        res.status(200).json({
            ok: true,
            message: 'Note deleted',
            data: note
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be deleted',
            data: error.message
        })
    }
}

export const updateNote = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { userId }: any = req
        const data = req.body
        const note: NotesEntry | null = await Note.findByPk(id)
        const user: UserEntry | null = await User.findByPk(userId)

        console.log(data)
        if (!note) {
            throw new Error('Invalid note')
        }

        if (!user) {
            throw new Error('Invalid user')
        }

        if (note.userId !== user.id.toString()) {
            throw new Error("Note does not belong to this user");
        }
        await Note.update({
            ...req.body,
            text: req.body.text,
            favorite: req.body.favorite,
            name: req.body.name
        }, {
            where: {
                id: note.id,
            }
        })

        const noteUpdated: NotesEntry | null = await Note.findByPk(id)

        res.status(200).json({
            ok: true,
            message: 'Note updated',
            data: noteUpdated
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be updated',
            data: error.message
        })
    }
}