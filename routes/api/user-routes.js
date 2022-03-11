const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// sets up GET all and POST at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// sets up GET one, PUt and DELETE at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// sets up POST and DELETE at /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router; 