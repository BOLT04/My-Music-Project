let mongoose = require('mongoose');

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

/**
 * Creates a user on the Database.
 * @param newUser to be created on the database.
 * @param cb the callback.
 */
module.exports.createUser = (newUser, cb) => {
    newUser.save(cb);
};