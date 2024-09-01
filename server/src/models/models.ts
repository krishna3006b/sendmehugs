import { model, Mongoose, Schema } from 'mongoose';
import { IRaising, IUser } from '../types';

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: [true, "Enter First Name"] },
    lastName: { type: String, required: [true, "Enter last Name"] },
    email: { type: String, required: [true, "Enter Email"], unique: true, validate: [(email: string) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email) }, "Please enter a valid email"] },
    password: { type: String, required: [true, "Enter Password"], minlength: [8, "Password must be atleast 8 characters long"] },
    token: { type: String },
    dp: { type: String },
})

export const User = model<IUser>("User", userSchema);

const raisingSchema = new Schema<IRaising>({
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
        user: { type: Schema.Types.ObjectId, ref: "User" },
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

export const Raising = model<IRaising>("Raising", raisingSchema);
