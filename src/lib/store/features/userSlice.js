"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSavedJobs = exports.setPeopleKnow = exports.setforgotPassword = exports.setImages = exports.setremovproject = exports.setRemoveField = exports.setprofessionalUserData = exports.setDetailes = exports.setConnectionRequest = exports.setAllConnections = exports.setGooglelogin = exports.SetLogout = exports.setActive = exports.setRemoveResume = exports.setResume = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    activeuser: null,
    googlestate: true,
    userdetails: null,
    connectionRequest: null,
    connections: [],
    peopleIknow: [],
    forgotPassword: {
        email: "",
        otp: "",
    },
    savedJobs: [],
    jobfilter: {
        title: "",
        experienceLevel: "",
        industry: "",
        jobType: "",
    },
    allJobs: [],
    professionalData: {
        location: undefined,
        skills: [],
        jobTitle: [],
        jobLocation: [],
        education: [],
        experience: [],
        projects: [],
    },
};
const loginSlice = (0, toolkit_1.createSlice)({
    name: "login",
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.activeuser = action.payload;
        },
        setGooglelogin: (state) => {
            state.googlestate = false;
        },
        SetLogout: (state) => {
            state.activeuser = null;
            state.googlestate = true;
            state.professionalData = {
                location: undefined,
                skills: [],
                jobTitle: [],
                jobLocation: [],
                education: [],
                experience: [],
                projects: [],
            };
        },
        //setting the professional of activeuser
        setprofessionalUserData: (state, action) => {
            var _a, _b, _c, _d, _e, _f, _g;
            if (!action.payload)
                return;
            // Initialize professionalData only if it doesn't exist
            if (!state.professionalData) {
                state.professionalData = {
                    location: ((_a = state.activeuser) === null || _a === void 0 ? void 0 : _a.location) || undefined,
                    skills: ((_b = state.activeuser) === null || _b === void 0 ? void 0 : _b.skills) || [],
                    jobTitle: ((_c = state.activeuser) === null || _c === void 0 ? void 0 : _c.jobTitle) || [],
                    jobLocation: ((_d = state.activeuser) === null || _d === void 0 ? void 0 : _d.jobLocation) || [],
                    education: [...(((_e = state.activeuser) === null || _e === void 0 ? void 0 : _e.education) || [])],
                    experience: ((_f = state.activeuser) === null || _f === void 0 ? void 0 : _f.experience) || [],
                    projects: ((_g = state.activeuser) === null || _g === void 0 ? void 0 : _g.projects) || [],
                };
            }
            // Loop through keys in action.payload
            Object.entries(action.payload).forEach(([key, value]) => {
                const typedKey = key;
                if (Array.isArray(state.professionalData[typedKey]) && Array.isArray(value)) {
                    const existingArray = state.professionalData[typedKey];
                    // Remove duplicates based on a unique property (e.g., `id`)
                    const mergedArray = [...existingArray, ...value];
                    const uniqueArray = mergedArray.filter((obj, index, self) => index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(obj)));
                    state.professionalData[typedKey] = uniqueArray;
                }
                else if (value !== undefined) {
                    state.professionalData[typedKey] = value;
                }
            });
        },
        setRemoveField: (state, action) => {
            const { field, index } = action.payload;
            if (state.activeuser && Array.isArray(state.activeuser[field])) {
                state.activeuser[field] = state.activeuser[field].filter((_, i) => i !== index);
            }
            if (state.professionalData &&
                Array.isArray(state.professionalData[field])) {
                state.professionalData[field] = state.professionalData[field].filter((_, i) => i !== index);
            }
        },
        setremovproject: (state, action) => {
            var _a;
            if ((_a = state.activeuser) === null || _a === void 0 ? void 0 : _a.projects) {
                state.activeuser.projects = state.activeuser.projects.filter((_, index) => index !== action.payload);
            }
        },
        setResume: (state, action) => {
            if (state.activeuser) {
                state.activeuser.resumePDF = action.payload.resumePDF;
                state.activeuser.resumeVideo = action.payload.resumeVideo;
            }
        },
        setRemoveResume: (state, action) => {
            if (state.activeuser) {
                if (action.payload === "resume") {
                    state.activeuser.resumePDF = [];
                }
                else if (action.payload === "introductionVideo") {
                    state.activeuser.resumeVideo = [];
                }
            }
        },
        setDetailes: (state, action) => {
            state.userdetails = action.payload;
        },
        setConnectionRequest: (state, action) => {
            state.connectionRequest = action.payload;
        },
        setAllConnections: (state, action) => {
            state.connections = action.payload;
        },
        setImages: (state, action) => {
            if (state.activeuser) {
                state.activeuser.profileImage = action.payload.profileImage;
                state.activeuser.banner = action.payload.banner;
            }
        },
        setforgotPassword: (state, action) => {
            state.forgotPassword.email = action.payload.email;
            state.forgotPassword.otp = action.payload.otp;
            console.log("otpotp", action.payload);
        },
        setPeopleKnow: (state, action) => {
            state.peopleIknow = action.payload;
        },
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        },
    },
});
_a = loginSlice.actions, exports.setResume = _a.setResume, exports.setRemoveResume = _a.setRemoveResume, exports.setActive = _a.setActive, exports.SetLogout = _a.SetLogout, exports.setGooglelogin = _a.setGooglelogin, exports.setAllConnections = _a.setAllConnections, exports.setConnectionRequest = _a.setConnectionRequest, exports.setDetailes = _a.setDetailes, exports.setprofessionalUserData = _a.setprofessionalUserData, exports.setRemoveField = _a.setRemoveField, exports.setremovproject = _a.setremovproject, exports.setImages = _a.setImages, exports.setforgotPassword = _a.setforgotPassword, exports.setPeopleKnow = _a.setPeopleKnow, exports.setSavedJobs = _a.setSavedJobs;
exports.default = loginSlice.reducer;
