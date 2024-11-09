const express = require('express');
const app = express();
app.use(express.json());

app.get('/processes', (req, res) => {
    // query param: huntId. It is not a path param, because processes can be standalone, not part of the hunts
});

app.get('/processes/:id/interviews', (req, res) => {

});

app.get('/processes/:id/interviews/:id', (req, res) => {

});

app.post()

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});