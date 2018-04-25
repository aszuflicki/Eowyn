const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());
app.use(methodOverride('_method'));
const PORT = process.env.PORT || 5000;
app.use(cors());



app.use(express.static(path.join(__dirname, 'front/public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
