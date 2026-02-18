const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Define user routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/google-login', userController.googleLogin);
router.get('/me', auth, userController.getMe);
router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
