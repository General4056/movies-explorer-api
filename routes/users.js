const router = require('express').Router();
const { getUser } = require('../controllers/users/getUser');
const { updateUser } = require('../controllers/users/updateUser');
const { userInfoValidation } = require('../middlewares/validators');

router.get('/users/me', getUser);
router.patch('/users/me', userInfoValidation, updateUser);

module.exports = router;
