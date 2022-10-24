"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
// import  client, {accountSid, authToken} from  'twilio';
const twilio_1 = require("twilio");
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utils/utils");
const emailController_1 = require("./emailController");
const sendOTP = async (req, res, next) => {
    const { purpose } = req.body;
    // JOI VALIDATION
    const validationResult = utils_1.generateOtp.validate(req.body, utils_1.options);
    if (validationResult.error) {
        return res.status(400).json({
            Error: validationResult.error.details[0].message,
        });
    }
    // TWILIO ACCOUNT DETAILS
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    ``;
    // TWILIO CLIENT
    const client = new twilio_1.Twilio(accountSid, authToken);
    // GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const { id } = req.user;
    const user = await userModel_1.userInstance.findOne({ where: { id } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await user.update({ otp, otpExpires: Date.now() + 300000 });
    // SEND OTP TO EMAIL
    const emailData = {
        to: user.email,
        subject: 'Airtime2Cash OTP',
        html: `This is your OTP ${purpose}:  ${otp} it expires in 5 minutes`
    };
    (0, emailController_1.emailTemplate)(emailData);
    // SEND OTP TO USER PHONE NUMBER
    try {
        const sms = await client.messages.create({
            from: twilioNumber,
            to: "+234" + user.phoneNumber.slice(1, user.phoneNumber.length),
            body: `This is your OTP ${purpose}:  ${otp} it expires in 5 minutes`
        });
        if (sms) {
            return res.status(201).json({
                status: 'success',
                message: 'SMS sent successfully',
                data: otp,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'internal server error',
            error
        });
    }
};
exports.sendOTP = sendOTP;
//# sourceMappingURL=smsController.js.map