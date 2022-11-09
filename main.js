import express from 'express';
import fetch from 'node-fetch';
import ejs from 'ejs';
import path from 'path';

const PORT = 3000;
const __dirname = path.resolve();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fetch('https://robohash.org/1') // This API sends back image-data and NOT an URL to an image!
    .then(response => response.arrayBuffer()) // Response contains headers, etc. We want the arrayBuffer, which is the actual image data
    .then(arrayBuffer => {
        const buffer = Buffer.from(arrayBuffer);  // We need to convert from type ArrayBuffer to Buffer
        const bufferBase64 = buffer.toString('base64'); // Convert the buffer to a base64 string
        res.render('index', // put this string into the img source attribute in index.ejs and then send back to client.
        {
            templateImage: bufferBase64
        });
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});