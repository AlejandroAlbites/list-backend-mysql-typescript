import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import { NotesEntry } from './note'

export interface UserEntry extends Model {
    id: string,
    name: string,
    email: string,
    password: string,
    // note: NotesEntry[],
    createdAt: Date | string,
    updatedAt: Date | string,
}

const User = db.define<UserEntry>('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    // note: {
    //     type: DataTypes.ARRAY
    // }
});

export default User;