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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = exports.features = exports.subscription = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = __importDefault(require("@/utils/api"));
const handleAsync_1 = __importDefault(require("@/utils/handleAsync"));
const paymentSlice_1 = require("../paymentSlice");
const userSlice_1 = require("../userSlice");
exports.subscription = (0, toolkit_1.createAsyncThunk)("subscription", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ plan, route }, { dispatch, rejectWithValue }) {
    var _c;
    console.log("plan", plan);
    console.log("route", route);
    const response = yield (0, handleAsync_1.default)(() => api_1.default.post(`/${route}/payment/createSubscription`, {
        plan: plan.name,
        price: plan.price,
        features: plan.features,
    }));
    console.log("subscrio", response);
    if (!response) {
        return rejectWithValue("subscription  failed");
    }
    const clientSecret = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.clientSecret;
    dispatch((0, paymentSlice_1.setClientSecret)(clientSecret));
}));
exports.features = (0, toolkit_1.createAsyncThunk)("features", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ sessionId, route }, { dispatch, rejectWithValue }) {
    console.log("route", route);
    const response = yield (0, handleAsync_1.default)(() => api_1.default.get(`/${route}/payment/findsubscriptionbyId/${sessionId}`));
    console.log("subscrio", response);
    if (!response) {
        return rejectWithValue("subscription  failed");
    }
    const features = response.data.subscription;
    console.log("features", features);
    dispatch((0, paymentSlice_1.setSubscription)(features));
}));
exports.verification = (0, toolkit_1.createAsyncThunk)("verification", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ sessionId, route }, { dispatch, rejectWithValue }) {
    const response = yield (0, handleAsync_1.default)(() => api_1.default.post(`/${route}/payment/verifySubscription/${sessionId}`));
    if (!response) {
        rejectWithValue("verification failed");
    }
    const features = response === null || response === void 0 ? void 0 : response.data.subscription;
    const account = response === null || response === void 0 ? void 0 : response.data.accountInfo;
    dispatch((0, paymentSlice_1.setSubscription)(features));
    dispatch((0, userSlice_1.setActive)(account));
}));
