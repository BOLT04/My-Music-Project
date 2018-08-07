var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource');
});

/* Register a new account/user. */
router.get('/signup', (req, res) => {
    renderHtmlFromFile("signup", res);
});

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
