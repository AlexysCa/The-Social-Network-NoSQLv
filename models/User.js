const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
           required: true,
           trim: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

// get the count of the users friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// creates a user model using the user schema
const User = model('User', UserSchema);

// exports the user model
module.exports = User;