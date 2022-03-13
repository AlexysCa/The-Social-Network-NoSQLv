const { User, Thought } = require('../models');

const userController = {
// /api/users routes

// gets all users
getAllUsers(req, res) {
    User.find({})
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

// get single user by id
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

// creates a new users 
// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }
createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

// update a user by its id
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

// delete user by id and associated thoughts
deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
    .then(() => {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        });
    })
    .catch(err => res.json(err));
},

// /api/user/:userId/friends/:friendId

// add a new friend to users friend list
addFriend({ params }, res) {
    User.findByIdAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
},

// deletes friend from a users list
deleteFriend({ params }, res) {
    User.findOneAndUpdate(
     { _id: params.userId },
     { $pull: { friends: params.friendId } },
     { new: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    }
};

module.exports = userController