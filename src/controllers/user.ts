import { Request, Response } from "express";
import User, { UserEntry } from "../models/user";
import { JWTgenerator } from "../helpers/generateJWT";
import bcrypt from "bcrypt";

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const avatar: string = req.body.avatar;

    const userExist: UserEntry | null = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new Error("the email already exists");
    }
    const encryptPassword = await bcrypt.hash(password, 8);

    const newUser = {
      name: name,
      email: email,
      password: encryptPassword,
      avatar: avatar,
    };

    const user = await User.create(newUser);

    const token = await JWTgenerator(user.id);

    res.status(200).json({
      ok: true,
      message: "User created",
      data: user,
      token,
    });
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: "User coult not be create",
      data: error.message,
    });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user: UserEntry | null = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("the email does not exists");
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new Error("the password is incorrect");
    }
    const token = await JWTgenerator(user.id);

    res.status(200).json({
      ok: true,
      message: "User logged",
      data: user,
      token,
    });
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: "User coult not be loggin",
      data: error.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: UserEntry[] = await User.findAll();

    res.status(200).json({
      ok: true,
      msg: "users found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "users not found",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  const { userId }: any = req;

  try {
    const user: UserEntry | null = await User.findByPk(userId);

    // if (!user || user.id !== userId) {
    //     throw new Error('the user does not exist')
    // }

    let { password, ...showUser }: any = user;

    res.status(200).json({
      ok: true,
      message: "User found",
      data: showUser,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      data: error.message,
      msg: "user not found",
    });
  }
};
