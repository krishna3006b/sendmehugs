"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRaising = exports.updateRaising = exports.getRaising = exports.getRaisings = exports.createRaising = void 0;
const uuid_1 = require("uuid");
const models_1 = require("../models/models");
const createRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raising = new models_1.Raising(req.body);
        raising.save()
            .then(() => {
            raising.id = (0, uuid_1.v4)();
            raising.save();
            res.status(404).json({ success: true, raising });
        })
            .catch(err => res.status(404).json({ "Success": "false", "message": err.message.split(":").pop() }));
    }
    catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' });
    }
});
exports.createRaising = createRaising;
const getRaisings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raisings = yield models_1.Raising.find();
        if (raisings) {
            res.status(201).json({ "success": true, raisings });
        }
        else {
            res.status(404).json({ "success": false, "message": "No raisings" });
        }
    }
    catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' });
    }
});
exports.getRaisings = getRaisings;
const getRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raising = yield models_1.Raising.findOne({ id: req.params.id });
        if (raising) {
            res.status(201).json({ "success": true, raising });
        }
        else {
            res.status(404).json({ "success": false, "message": "No raising" });
        }
    }
    catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' });
    }
});
exports.getRaising = getRaising;
const updateRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let raising = yield models_1.Raising.findOne({ id: id });
        if (raising) {
            raising = yield models_1.Raising.findOneAndUpdate({ id: id }, req.body, { returnDocument: 'after' });
            raising === null || raising === void 0 ? void 0 : raising.save().then(() => { return res.status(200).json({ "Success": true, "message": "raising updated successully", "raising": raising }); }).catch((err) => { return res.status(404).json({ "Success": "false", "message": "Failed to save raising", "error": (err instanceof Error) ? err.message : 'Some error occurred' }); });
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" });
        }
    }
    catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to update raising", err: err });
    }
});
exports.updateRaising = updateRaising;
const removeRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let raising = yield models_1.Raising.findOne({ id: id });
        if (raising) {
            raising = yield models_1.Raising.findOneAndDelete({ id: id });
            res.status(200).json({ "Success": true, "message": raising });
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" });
        }
    }
    catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch raising" });
    }
});
exports.removeRaising = removeRaising;
