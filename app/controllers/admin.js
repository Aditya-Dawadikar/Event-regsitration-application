const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    res.status(200).json({
        message: "handling admin login"
    });
}

exports.signUp = (req, res, next) => {
    res.status(200).json({
        message: "handling admin signup"
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

exports.deleteAdmin = (req, res, next) => {
    res.status(200).json({
        message: "handling deleteAdmin"
    });
}