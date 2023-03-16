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
const jwt = require("jsonwebtoken");
const generateToken = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
    return jwt.sign({
        name: username,
        id: id,
    }, 
    // TOKEN_SECRET
    process.env.TOKEN_SECRET, 
    // EXPIRATION TIME
    { expiresIn: process.env.JWT_EXPIRES_IN });
});
module.exports = {
    generateToken,
};
