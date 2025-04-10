"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSubscription = exports.setClientSecret = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    clientsecret: "",
    subscription: null,
};
const paymentSlice = (0, toolkit_1.createSlice)({
    name: "payment",
    initialState,
    reducers: {
        setClientSecret: (state, action) => {
            state.clientsecret = action.payload;
        },
        setSubscription: (state, action) => {
            state.subscription = action.payload;
        },
    },
});
_a = paymentSlice.actions, exports.setClientSecret = _a.setClientSecret, exports.setSubscription = _a.setSubscription;
exports.default = paymentSlice.reducer;
