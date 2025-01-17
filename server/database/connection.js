const express = require('express');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb://localhost:27017/transport", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
