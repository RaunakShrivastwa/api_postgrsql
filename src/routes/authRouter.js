import express from "express";
import userAuth from "../Auth/createToken.js";
import signOut from "../Auth/signOut.js";
import passport from "passport";
const authRouter = express.Router();
const {login} = userAuth;

authRouter.post("/jwt/createSession", login);
authRouter.post("/logout", signOut.logout);
authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: (req, res) => { return res.json({ Error: 'error' }) } }),(req,res)=>res.json({message:"logined"}));

authRouter.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: (req, res) => { return res.json({ Error: 'error' }) } }),(req,res)=>res.json({message:"logined"}));


export default authRouter;
