const Message = require('../models/message');

// getMessage
module.exports.getMessage = (req, res) => {
  const { id } = req.params;
  Message.find( {bookid: id} )
  .then((messages) => res.status(200).json(messages))
  .catch((e) => {
    console.log(e);
  });
};

// sendMessage
module.exports.sendMessage = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(403).json('Нет доступа');
    }
    const {
        bookid, username, message
    } = req.body; 
    Message.create({
    bookid, username, message
    }).then((newMessage) => res.status(201).json(newMessage))
    .catch((e) => {
        console.log(e);
    });
};
  

// userRegister
module.exports.userRegister = async (req, res) => {
  const {
    displayName, username, password,
  } = req.body;
  if (!username || !password) {
    return res.status(400).json('Отсутствуют обязательные поля');
  }
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      const newUser = await User.create({
        displayName, username, password,
      });
      return res.status(201).json(newUser);
    }
    return res.status(409).json(`Пользователь "${username}" уже существует в базе данных`);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Ошибка при добавлении пользователя');
  }
};

// userProfile
module.exports.userProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json('Нет доступа');
  }
  return res.status(200).json(req.user);
};
