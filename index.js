require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const StudentSchema = new mongoose.Schema({
    name: String,
    grade: Number
});

const Student = mongoose.model('sample_airbnb', StudentSchema);

const stud = new Student({
    name: "John",
    grade: 80
});

stud
    .save()
    .then(
        () => console.log("One entry added"), 
        (err) => console.log(err)
    );

app.get('/', async (req, res) => {
    try {
        const found = await Student.find({grade:80});
        res.send(found);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send("Some error occurred!");
    }
});

app.listen(3001, () => 
    console.log("Server is running")
);