import express from "express";
import user from "../controllers/userController.js";
import verifyToken from "../Auth/verifyAuth.js";
import GeminiAPI from "../OCR/Ocr.js";

const {createUser,deleteUser,getAllUser,getByIdUser,updateUser} = user;
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/:id",verifyToken ,getByIdUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/text/user",verifyToken,GeminiAPI.generateContent)

export default userRouter;
