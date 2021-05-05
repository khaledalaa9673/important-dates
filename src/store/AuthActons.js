import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'
export const LOG_OUT = "LOG_OUT"
export const AUTHENTICATE = "AUTHENTICATE"
export const UPDATE_FAMILY_DATA = "UPDATE_FAMILY_DATA"
export const CLEAR_FAMILY_DATA = "CLEAR_FAMILY_DATA"
export const RESET_PARTENERS_LIST = "RESET_PARTENERS_LIST"
export const RESET_SONS_LIST = "RESET_SONS_LIST"
export const RESET_DRIVERS_LIST = "RESET_DRIVERS_LIST"
export const RESET_SERVANTS_LIST = "RESET_SERVANTS_LIST"

export const authenticate = (token, user) => {
    return {
        type: AUTHENTICATE,
        token: token,
        user: user
    }
}
export const login = (loginWay, password, deviceName, lang, type) => {

    return async (dispatch) => {
        try {
            let data = {
                email: loginWay,
                password: password,
                device_name: deviceName,
                lang: lang
            }
            if (type === "phone") {
                data = {
                    phone_number: loginWay,
                    password: password,
                    device_name: deviceName,
                    lang: lang
                }
            }

            const response = await axios.post("https://important-dates.roqay.solutions/api/login", data)
            if (response.status === 200) {
                const { token, user } = response.data.data
                AsyncStorage.setItem("token", token)
                AsyncStorage.setItem("user", JSON.stringify(user))
                dispatch(authenticate(token, user))
            }

        } catch (response) {
            console.log(response)
            throw new Error("something Invalid")
        }
    }
}


export const register = (first_name, last_name, email, phone_number, gender, password, password_confirmation, marital_status, has_sons, has_servants, has_drivers, deviceName, lang, family_data, parteners_count, parteners_data, sons_count, sons_data, servants_count, servants_data, drivers_count, drivers_data) => {
    return async (dispatch) => {
        let data
        if (family_data === "1") {
            data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                gender: gender,
                password: password,
                password_confirmation: password_confirmation,
                marital_status: marital_status,
                has_sons: has_sons,
                has_servants: has_servants,
                has_drivers: has_drivers,
                device_name: deviceName,
                lang: lang,
                family_data: "1",
                wives_count: parteners_count,
                servants_count: servants_count,
                drivers_count: drivers_count,
                sons_data: sons_data,
                wives_data: parteners_data,
                servants_data: servants_data,
                drivers_data: drivers_data,
                sons_count: sons_count,
            }
        } else {
            data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                gender: gender,
                password: password,
                password_confirmation: password_confirmation,
                marital_status: marital_status,
                has_sons: has_sons,
                has_servants: has_servants,
                has_drivers: has_drivers,
                device_name: deviceName,
                lang: lang,
                family_data: 0,
                wives_count: 0,
                sons_count: 0,
                servants_count: 0,
                drivers_count: 0
            }
        }
        try {
            const response = await axios.post("https://important-dates.roqay.solutions/api/register", data)
            const { token, user } = response.data.data
            AsyncStorage.setItem("token", token)
            AsyncStorage.setItem("user", JSON.stringify(user))
            dispatch(authenticate(token, user))

        } catch (error) {
            console.log(error)
            throw new Error("please enter vaild email and phone number")
        }
    }
}

export const forgotPasswordHandler = async (email) => {
    console.log("forgotPasswordHandler")
    const data = {
        email: email,
    }

    try {
        const response = await axios.post("https://important-dates.roqay.solutions/api/forgot_password", data)
        if (response.status === 200) {
            console.log(response)
            let code = response.data.code
            console.log(response)
            return code
        } else {
            console.log(response)
        }
    } catch (error) {
        throw new Error("something Invalid")
    }
}


export const verifyCode = async (email, code) => {
    console.log("verifyCode")
    const data = {
        email: email,
        code: code
    }

    try {
        const response = await axios.post("https://important-dates.roqay.solutions/api/verify_code", data)
        if (response.status === 200) {
            console.log(response)
            const status = response.data

            return status
        }

    } catch (error) {
        throw new Error("something Invalid")
    }
}

export const resetPassword = async (email, password) => {
    const data = {
        email: email,
        new_password: password
    }
    try {
        const response = await axios.post("https://important-dates.roqay.solutions/api/reset_password", data)
        if (response.status === 200) {
            return response.data.msg
        } else {
            throw new Error("something went wrong")
        }
    } catch (error) {
        throw new Error("something went wrong")
    }
}


export const doLogOut = () => ({
    type: LOG_OUT
})
export const logOut = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")
        dispatch(doLogOut())
    }
}


export const updateFamilyDataHandler = (personType,list) => {
    return {
        type: UPDATE_FAMILY_DATA,
        personType:personType,
        list:list
    }
}

export const clearFamilyData = () => {
    return {
        type: CLEAR_FAMILY_DATA
    }
}

export const resetPartenersList = () => {
    return {
        type: RESET_PARTENERS_LIST
    }
}

export const resetSonsList = () => {
    return {
        type: RESET_SONS_LIST
    }
}

export const resetDriversList = () => {
    return {
        type: RESET_DRIVERS_LIST
    }
}

export const resetServantsList = () => {
    return {
        type: RESET_SERVANTS_LIST
    }
}

export const changePassword = async (oldPassword, newPassword, confirmationPassword, token) => {
    const data = {
        old_password: oldPassword,
        new_password: newPassword,
        password_confirmation: confirmationPassword

    }
    console.log(oldPassword + "   " + newPassword + "   " + confirmationPassword + "   " + token)
    try {
        const response = await axios.post("https://important-dates.roqay.solutions/api/change_password", data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            console.log("changePassword")
            console.log(response.data)
        } else {
            throw new Error("something went wrong")
        }
    } catch (error) {
        throw new Error("something went wrong")
    }
}