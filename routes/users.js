var express = require('express');
var multer = require('multer');

//var jsdom = require('jsdom');
//const { JSDOM } = jsdom;

//const window = new JSDOM('<body><h1 id="signupForm">MAJEJEJEJ</h1></body>').window;

//const { document } = (new JSDOM('')).window;
//global.document = document;

//var $ = jQuery = require('jquery')(window);

var upload = multer({dest: './uploads'});
var fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource');
});

router.get('/error', (req, res) => {
    res.send({errors: 8});
});

/* Register a new account/user. */
router.get('/signup', (req, res) => {
    renderHtmlFromFile("signup", res);
});

const { check, validationResult } = require('express-validator/check');

function passwordValidator(value, {req}) {
    if (value !== req.body.password)
        throw new Error('Password confirmation does not match password');
}

//TODO: Clean this code. Too many arguments and its ugly!
/* Create a new account/user. */
router.post('/signup', [
    // Input Validation.
    check('name', 'Name field is required').isLength({ min: 1 }),
    check('email', 'Email is required').isLength({ min: 1 }),
    check('email', 'Email is not valid').isEmail(),
    check('username', 'Username field is required').isLength({ min: 1 }),
    check('password', 'Password is required with the minimum length of 5.').isLength({ min: 1 }),
    check('password').isLength({ min: 5 }),
    check('passwordConfirm', 'Passwords do not match').custom(passwordValidator)
], upload.single('profileImg'), (req, res) => {
    const errors = validationResult(req);
    console.log(8);
    console.log(req.body.name);
console.log(errors.array());
    //res.send({errors: errors});
    if (!errors.isEmpty()) {
        //signupHtml(errors.array());
        //res.sendFile('C:\\Users\\David\\WebstormProjects\\MyMusicProject\\public\\signup.html');
        res.send(signupHtml(errors.array()));
        //res.json({ errors: errors.array() });

    } else {
        res.sendFile('C:\\Users\\David\\WebstormProjects\\MyMusicProject\\public\\signup.html');
        console.log('working!!!!');
    }

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (req.file) {
        console.log('Uploading file...');
    } else
        console.log('No file uploaded.');
});

function buildAttributesHtml(attributes) {
    var res = ' ';

    for(var prop in attributes)
        res += prop + '= "' + attributes[prop] +'" ';

    return res;
}

function li(attributes, content) {
    return '<li' +buildAttributesHtml(attributes)+ '>' +content+'</li>';
}

function ul(content) {
    return '<ul>' +content+ '</ul>';
}

function signupHtml(errors) {

    return '<html>\n' +
        '<head>\n' +
        '    <title>My Music</title>\n' +
        '    <!--<link rel="stylesheet" href="/stylesheets/style.css">-->\n' +
        '    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"\n' +
        '          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">\n' +
        '</head>\n' +
        '\n' +
        '<body>\n' +
        '<!-- Navbar -->\n' +
        '    <nav class="navbar navbar-expand-md navbar-light bg-light">\n' +
        '        <div class="container">\n' +
        '            <a class="navbar-brand" href="#">My Music</a>\n' +
        '            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"\n' +
        '                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\n' +
        '                <span class="navbar-toggler-icon"></span>\n' +
        '            </button>\n' +
        '\n' +
        '            <div class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
        '                <ul class="nav navbar-nav">\n' +
        '                    <li>\n' +
        '                        <a href="/" class="nav-link">Home</a>\n' +
        '                    </li>\n' +
        '                    <li>\n' +
        '                        <a href="/users/signin" class="nav-link">Sign in</a>\n' +
        '                    </li>\n' +
        '                    <li>\n' +
        '                        <a href="/users/signup" class="nav-link active">Sign up</a>\n' +
        '                    </li>\n' +
        '                    <li>\n' +
        '                        <a href="/users/playlist" class="nav-link">My playlists</a>\n' +
        '                    </li>\n' +
        '                </ul>\n' +
        '                <ul class="nav navbar-nav ml-auto">\n' +
        '                    <li>\n' +
        '                        <a href="/users/logout" class="nav-link">Logout</a>\n' +
        '                    </li>\n' +
        '                </ul>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </nav>\n' +
        '\n' +
        '    <div class="container">\n' +
        '        <h1>Register your account</h1>\n' +
                 htmlErrorList(errors) +
        '        <form id="signupForm" method="post" action="/users/signup">\n' +
        '            <div class="form-group">\n' +
        '                <label for="nameInput">Name</label>\n' +
        '                <input class="form-control" type="text" id="nameInput" placeholder="Enter name">\n' +
        '                <label for="emailInput">Email</label>\n' +
        '                <input class="form-control" type="email" id="emailInput" placeholder="Enter email">\n' +
        '                <label for="usernameInput">Username</label>\n' +
        '                <input class="form-control" type="text" id="usernameInput" placeholder="Enter username">\n' +
        '                <label for="passwordInput">Password</label>\n' +
        '                <input class="form-control" type="password" id="passwordInput" placeholder="Enter password">\n' +
        '                <label for="passwordConfirmInput">Confirm Password</label>\n' +
        '                <input class="form-control" type="password" id="passwordConfirmInput" placeholder="Confirm password">\n' +
        '                <label for="profileImgInput">Profile Image</label>\n' +
        '                <input class="form-control" type="file" id="profileImgInput">\n' +
        '            </div>\n' +
        '\n' +
        '            <button class="btn btn-primary" id="submitBtn" type="submit">Submit</button>\n' +
        '        </form>\n' +
        '    </div>\n' +
        '\n' +
        '<script\n' +
        '        src="https://code.jquery.com/jquery-3.3.1.min.js"\n' +
        '        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="\n' +
        '        crossorigin="anonymous"></script>\n' +
        '    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"\n' +
        '            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"\n' +
        '            crossorigin="anonymous"></script>\n' +
        '    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"\n' +
        '            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"\n' +
        '            crossorigin="anonymous"></script>\n' +
        '    <script src="/javascripts/test.js"></script>\n' +
        '</body>\n'

}


/*
function signupHtml(errors) {

    let prepend = $('#signupForm').prepend('<h2>DONE</h2>');
    console.log(prepend);

    return window;
}*/

function htmlErrorList(errors) {
    var items = '';
    for (var error of errors)
        items += li({class: 'alert alert-danger'}, error.msg);

    return ul(
        items
        /*errors
            .reduce((res, error) => {
                console.log(res + " " + error);
                return res + li({className: 'alert alert-danger'}, error.msg)
            }, {msg: ''})*/
    );
}


/* Login with an existing account. */
router.get('/signin', (req, res) => {
    renderHtmlFromFile("signin", res);
});


// Auxiliary functions
function fileNameToFullPath(fileName) {
    return "./public/" +fileName+ ".html";
}

/**
 * Sets the necessary headers and writes the file's content to the web page
 * @param fileName The file name.
 * @param res The result object from the router context.
 */
function renderHtmlFromFile(fileName, res) {
    var file = fileNameToFullPath(fileName);

    fs.readFile(file, (err, text) => {
        if (err) {
            alert("Something went wrong while rendering the html page");
            return;
        }

        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Length", text.length);
        res.end(text);
    });
}

module.exports = router;
