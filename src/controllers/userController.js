import userRepositry from "../repositery/EntityRepositery.js";
import EctDct from '../config/managePassword.js';

const repo = new userRepositry("users");
const {encrypt} = EctDct;

class UserController {

  async createUser(req, res) {
    try {
      req.body.password = encrypt(req.body.password,process.env.KEY);
      const user = await repo.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUser(req, res) {
    try {
      res.status(200).json(await repo.findAll());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByIdUser(req, res) {
    try {
      const user = await repo.findById(req.params.id);
      
      user ? res.status(200).json(user) : res.status(404).json({ message: "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await repo.updateById(req.params.id, req.body);
      user ? res.status(200).json(user) : res.status(404).json({ message: "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await repo.deleteById(req.params.id);
      user ? res.status(200).json({ message: "User deleted" }) : res.status(404).json({ message: "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 


}

export default new UserController();