const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');

const secretKey = process.env.JWT_SECRET;

class UserService {
  async createUser(username, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findUserByUsername(username) {
    try {
      const user = await User.findOne({ where: { username } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async comparePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  generateToken(userId) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  }
}

module.exports = new UserService();
