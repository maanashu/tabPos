import { NAVIGATION } from "@/constants";
import { AuthController } from "@/controllers/AuthController";
import { navigate } from "@/navigation/NavigationRef";
import { TYPES } from "@/Types/Types";

const sendOtpRequest = () => ({
    type: TYPES.SEND_OTP_REQUEST,
    payload: null,
});

const savePhone = (phone) => ({
    type: TYPES.SAVE_PHONE,
    payload: phone
});

const sendOtpError = error => ({
    type: TYPES.SEND_OTP_ERROR,
    payload: { error },
});

const sendOtpSuccess = otp => ({
    type: TYPES.SEND_OTP_SUCCESS,
    payload: { otp },
});

const verifyOtpRequest = () => ({
    type: TYPES.VERIFY_OTP_REQUEST,
    payload: null,
});

const verifyOtpError = error => ({
    type: TYPES.VERIFY_OTP_ERROR,
    payload: { error },
});

const verifyOtpSuccess = verify => ({
    type: TYPES.VERIFY_OTP_SUCCESS,
    payload: { verify },
});

const registerRequest = () => ({
    type: TYPES.REGISTER_REQUEST,
    payload: null,
});

const registerError = error => ({
    type: TYPES.REGISTER_ERROR,
    payload: { error },
});

const registerSuccess = register => ({
    type: TYPES.REGISTER_SUCCESS,
    payload: { register },
});





const clearStore = () => ({
    type: TYPES.CLEAR_STORE,
    payload: null,
});

export const sendOtp = (phoneNumber, countryCode, key) => async dispatch => {
    dispatch(sendOtpRequest());
    try {
        dispatch(savePhone({ phoneNumber, countryCode }))
        const res = await AuthController.sendOtp(phoneNumber, countryCode, key);
        dispatch(sendOtpSuccess(res));
    } catch (error) {
        dispatch(sendOtpError(error.message));
    }
};



export const verifyOtp = (id, value, key) => async dispatch => {
    dispatch(verifyOtpRequest());
    try {
        const res = await AuthController.verifyOtp(id, value, key);
        dispatch(verifyOtpSuccess(res));
    } catch (error) {
        dispatch(verifyOtpError(error.message));
    }
};

export const register = (data, params) => async dispatch => {
    dispatch(registerRequest());
    try {
        const res = await AuthController.register(data,params);
        dispatch(registerSuccess(res));
    } catch (error) {
        dispatch(registerError(error.message));
    }
};




export const logoutFunction = () => async dispatch => {
    dispatch(clearStore())
}