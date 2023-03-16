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
const User = require("../models/schemas/user.ts");
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield User.create(user).then((data) => {
        return data;
    });
    return newUser;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(id).then((data) => {
        return data;
    });
    return user;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        email: email,
    });
    return user;
});
module.exports = {
    createNewUser,
    getUserById,
    getUserByEmail,
};
