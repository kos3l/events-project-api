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
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
let userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    birthdate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        try {
            if (!user.isModified("password")) {
                return next();
            }
            const salt = yield bcrypt.genSalt(10);
            user.password = yield bcrypt.hash(user.password, salt);
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
userSchema.method("comparePassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(this);
        return bcrypt.compare(password, this.password);
    });
});
module.exports = (0, mongoose_1.model)("user", userSchema);
