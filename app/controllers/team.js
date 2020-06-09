const mongoose = require('mongoose');

exports.getAll = (req, res, next) => {
    res.status(200).json({
        message: "handling getAll"
    });
}

exports.createNewTeam = (req, res, next) => {
    res.status(200).json({
        message: "handling createNewTeam"
    });
}

exports.deleteAll = (req, res, next) => {
    res.status(200).json({
        message: "handling deleteAll"
    });
}

exports.getById = (req, res, next) => {
    res.status(200).json({
        message: "handling getById"
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