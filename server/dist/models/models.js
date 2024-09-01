"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raising = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, "Enter First Name"] },
    lastName: { type: String, required: [true, "Enter last Name"] },
    email: { type: String, required: [true, "Enter Email"], unique: true, validate: [(email) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email); }, "Please enter a valid email"] },
    password: { type: String, required: [true, "Enter Password"], minlength: [8, "Password must be atleast 8 characters long"] },
    token: { type: String },
    dp: { type: String },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
const raisingSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    title: { type: String, required: [true, "Enter title"] },
    story: { type: String, required: [true, "Enter story"] },
    youtube: { type: String },
    thumbnail: { type: String },
    amount: { type: Number, required: [true, 'Enter amount required'] },
    fundraisingFor: { type: String },
    category: { type: String },
    pincode: { type: Number },
    country: { type: String },
    walletAddress: { type: String },
    id: { type: String },
    address: { type: String },
    donors: [{
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            amount: { type: Number, required: true },
            // const raising = await Raising.findById(raisingId).populate('donors.user', 'firstName lastName dp').exec();
        }],
    images: [
        { type: String }
    ],
    certificate: { type: String },
    amountDonated: { type: Number, default: 0 },
    role: { type: String, enum: ["NGO", "Individual"], default: "Individual" }
    // documents: [
    //     { type: String }
    // ],
});
exports.Raising = (0, mongoose_1.model)("Raising", raisingSchema);
