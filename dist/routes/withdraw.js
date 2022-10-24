"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const withdraw_1 = require("../controller/withdraw");
const otpValidate_1 = require("../middleware/otpValidate");
router.post('/withdraw', auth_1.auth, otpValidate_1.otpValidate, withdraw_1.withdraw);
router.get('/gettransactions', auth_1.auth, withdraw_1.getTransactions);
exports.default = router;
//# sourceMappingURL=withdraw.js.map