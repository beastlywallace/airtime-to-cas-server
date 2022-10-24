"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpValidate = void 0;
const userModel_1 = require("../model/userModel");
async function otpValidate(req, res, next) {
    try {
        const { otp } = req.body;
        const { id } = req.user;
        if (!otp) {
            return res.status(400).json({
                message: "Otp is required",
            });
        }
        const user = await userModel_1.userInstance.findOne({ where: { id, otp } });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid OTP',
            });
        }
        if (user.otpExpires < Date.now()) {
            return res.status(401).json({
                message: 'OTP expired',
            });
        }
        next();
    }
    catch (error) {
        res.status(403).json({
            message: 'User not logged in',
        });
    }
}
exports.otpValidate = otpValidate;
//# sourceMappingURL=otpValidate.js.map