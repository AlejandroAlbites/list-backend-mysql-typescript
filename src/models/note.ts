import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

export interface NotesEntry extends Model {
    id: string,
    name: string,
    text: string,
    favorite: boolean,
    userId: string,
    createdAt: Date | string,
    updatedAt: Date | string,
}

const Note = db.define<NotesEntry>('Note', {
    name: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.STRING
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.STRING
    },
});

export default Note;