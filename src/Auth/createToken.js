import jsonwebtoken from "jsonwebtoken";
import userRepositery from "../repositery/EntityRepositery.js";
import EctDct from '../config/managePassword.js';
 const repo = new userRepositery('users');
 class userAuth {
  // User Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await repo.getUserEmail(email);
      console.log("user",user);
      

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await EctDct.decrypt(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate new token
      const authToken = jsonwebtoken.sign(
        { id: user.id, role: user.userRole },
        process.env.JWT_KEY,
        {
          expiresIn: `1h`,
        }
      );
      const update = await repo.updateById(user.id, { token: authToken });
      console.log("updated",update);
      
      req.user = user
      // Set token in cookies
      res.cookie("authToken", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: "Strict",
      });

      return res.status(200).json({ authToken });
    } 
    catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }

  // User Logou
}

export default new userAuth();
