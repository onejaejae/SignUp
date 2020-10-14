const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://magicnc7:amor8907@wonjae.6bjmm.mongodb.net/hi?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify : false
})
.then(() => console.log("Mongoose Connected"))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(port, () => { console.log(`app listening on port ${port}`)});


