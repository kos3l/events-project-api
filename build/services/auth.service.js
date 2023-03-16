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
const userService = require("../services/user.service");
const { registerValidation, loginValidation, } = require("../validations/auth.validation");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const register = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = registerValidation(userBody);
    if (error) {
        throw new ApiError(httpStatus[400], error.details[0].message);
    }
    const emailExist = yield userService.getUserByEmail(userBody.email);
    if (emailExist) {
        throw new ApiError(httpStatus[400], "Email already exists");
    }
    const newUser = yield userService.createNewUser(userBody);
    return newUser;
});
const login = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = loginValidation(userBody);
    if (error) {
        throw new ApiError(httpStatus[400], error.details[0].message);
    }
    const fetchedUser = yield userService.getUserByEmail(userBody.email);
    console.log(fetchedUser);
    if (!fetchedUser) {
        throw new ApiError(httpStatus[400], "Email is wrong");
    }
    const validPassword = yield fetchedUser.comparePassword(userBody.password);
    if (!validPassword) {
        throw new ApiError(httpStatus[400], "Wrong password");
    }
    return fetchedUser;
});
module.exports = {
    register,
    login,
};
