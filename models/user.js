let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

mongoose.connect("mongodb://localhost:27017/my_musicDB", { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to database.');


});

// User Schema.
let userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: String,
    email: String,
    name: String,
    profileImg: String
});

let User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id, cb) => {
    User.findById(id, cb);
};

module.exports.getUserByUsername = (username, cb) => {
    let query = {username: username};
    User.findOne(query, cb);
};

/**
 * Compares the password given with the hashed password on the DB.
 * @param candidatePass password the user types in on the login form.
 * @param hash hashed password inside the DB.
 * @param cb callback.
 */
module.exports.comparePassword = (candidatePass, hash, cb) => {
    bcrypt.compare(candidatePass, hash, (err, isMatch) => {
        cb(null, isMatch);
    });
};

const saltRounds = 10;
/**
 * Creates a user on the Database.
 * @param newUser to be created on the database.
 * @param cb the callback.
 */
module.exports.createUser = (newUser, cb) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {//TODO: Should these two error variables have the same name????!!!
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(cb);
        });
    });
};