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
const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedUser = yield authService.register(req.body);
        return res.json({ error: null, data: savedUser._id });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = yield authService.login(req.body);
        const username = loggedInUser.firstName + " " + loggedInUser.lastName;
        const token = yield tokenService.generateToken(username, loggedInUser._id);
        return res.header("auth-token", token).json({
            error: null,
            data: { token },
        });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
module.exports = {
    register,
    login,
};
