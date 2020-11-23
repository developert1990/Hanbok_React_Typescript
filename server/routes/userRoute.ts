
import jwt from 'jsonwebtoken';
import { userType } from './../types';
import bcrypt from 'bcrypt';
import express, { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get("/createadmin", async (req: Request, res: Response) => {
    const password = "sangmean";
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    try {
        const user = new User({
            name: 'Sangmean',
            email: 'magicq6265@gmail.com',
            password: hash,
            isAdmin: true,
        });

        const newUser = await user.save();
        res.send(newUser)

    } catch (error) {
        res.send(error.message);
    }
});





router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {

    const { JWT_SECRET } = process.env;
    const { email, password } = req.body;

    const signinUser: userType | null = await User.findOne({
        email: email,
    })

    console.log(signinUser);
    if (signinUser) {

        const passwordHash = signinUser?.password;
        if (typeof passwordHash === 'string') {
            const isAuthenticated = await bcrypt.compare(password, passwordHash);
            console.log('isAuthenticated', isAuthenticated);

            if (isAuthenticated && typeof JWT_SECRET === "string") {
                const token = jwt.sign({
                    user_id: email
                }, JWT_SECRET, {
                    expiresIn: '24h'
                });
                res.cookie('token', token, { httpOnly: true, maxAge: 3000 });
                res.json({
                    result: 'Success',
                    token: token,
                    email: signinUser.email,
                    status: 200,
                    name: signinUser.name,
                    admin: signinUser.isAdmin,
                });
            } else {
                res.json({ msg: "Password is not correct", status: 401 });
            }
        }
    } else {
        res.json({ status: 400, msg: "User does not exist" })
    }

})


router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    try {
        const emailAlreadyExists = await User.findOne({
            email: email,
        });
        console.log('emailAlreadyExists', emailAlreadyExists)
        if (!emailAlreadyExists) {
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);
            const user = new User({
                name: name,
                email: email,
                password: hash,
            });
            await user.save((err, userInfo) => {
                if (err) {
                    return res.json({ success: false, status: res.status, data: err })
                } else {
                    return res.json({ success: true, status: res.status, data: userInfo })
                }
            });

        } else {
            res.json({
                msg: "Username is overlapped",
                status: 401
            })
        }
    } catch (error) {
        next(new Error(error.message))
    }





    // res.json({ status: res.status, data: newUser });
    // console.log('newUser: ', newUser.errors);
    // if (newUser) {
    //     console.log('유저저장에 잘함')
    //     res.json({ status: res.status, data: newUser });
    // } else {
    //     console.log('유저저장에 에러발생')
    //     // res.status(401).send({ msg: "Invalid User data" });
    //     res.json({ status: res.status, data: newUser })
    // }

})

export default router;

