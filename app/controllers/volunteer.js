const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    res.status(200).json({
        message: "handling volunteer login"
    });
}

exports.signUp = (req, res, next) => {
    res.status(200).json({
        message: "handling volunteer signUp"
    });
}

exports.getAll = (req, res, next) => {
    res.status(200).json({
        message: "handling getAll"
    });
}

exports.patchById = (req, res, next) => {
    res.status(200).json({
        message: "handling patchById"
    });
}

exports.deleteById = (req, res, next) => {
    res.status(200).json({
        message: "handling deleteById"
    });
}