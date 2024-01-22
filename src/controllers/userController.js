const userService = require('../services/userServices');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await userService.createUser(username, password);
    const token = userService.generateToken(newUser.id);
    res.status(201).json({ message: "User created successfully", userId: newUser.id, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userService.findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await userService.comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = userService.generateToken(user.id);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
