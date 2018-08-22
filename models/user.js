let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

mongoose.connect("mongodb://localhost:27017/my_musicDB", { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
});
// User Schema.
let userShema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileImg: {
        type: String
    },

});

module.exports = mongoose.model('User', userShema);

const saltRounds = 10;
/**
 * Creates a user on the Database.
 * @param newUser to be created on the database.
 * @param cb the callback.
 */
module.exports.createUser = (newUser, cb) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(cb);
        });
    });
};