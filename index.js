const express = require('express');
const bodyParser = require('body-parser');
const ussdRouter = require('./src/ussd');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/ussd', ussdRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`USSD app running on port ${PORT}`));
