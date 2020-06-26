const path = require("path");
const express = require("express");
const app = express();


app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


function verifyClientInfo(client_id, redirect_url) {
    return true;
}


app.get('/authorize', (req, res) => {
    client_id = req.query.client_id
    redirect_url = req.query.redirect_url
    if (client_id === undefined || redirect_url === undefined) {
        return res.status(400).send({
            'error': 'invalid_request',
            'error_description': 'Required parameters are missing in the request.'
        });
    }

    if (!verifyClientInfo(client_id, redirect_url)) {
        return res.status(400).send({
            'error': 'invalid_request',
            'error_description': 'Invalid client.'
        });
    }
    res.redirect('/?client_id=' + client_id + '&redirect_url=' + redirect_url);

})

// start express server on port 3000
app.listen(3000, () => {
    console.log("server started on port 3000");
});