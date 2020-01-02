const mongoose = require('mongoose');

const user = "root";
const password = "zaq1@WSX";

mongoose
    .connect("mongodb+srv://" + user + ":" + password + "@cluster0-5r1d9.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(value => {
        console.log("db connection established")
    })
    .catch(reason => {
        console.log("MongoDB error: " + reason.message)
    });