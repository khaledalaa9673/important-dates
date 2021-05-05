import React, { useEffect } from "react"
import { useState } from "react";
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView, Alert, KeyboardAvoidingView } from "react-native"
import { DefaultTheme, Provider as PaperProvider, Checkbox } from 'react-native-paper';
import { login } from "../store/AuthActons"
import { useDispatch } from "react-redux";
import { strings, getCurrentLocale, } from "../i18n/i18n"
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomTextInput from "../components/CustomTextInput"
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from "axios"




const theme = {
    ...DefaultTheme,
    roundness: 1,
    colors: {
        ...DefaultTheme.colors,
        placeholder: 'rgba(128,157,181,.5)',
        primary: "red",
        accent: "red",

    }
}

const LoginScreen = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remmberMe, setRemmberMe] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()


    useEffect(()=>{
        const  login=(email, password)=>{
 
            const data =JSON.stringify({ email: "hodhod@gmail.com", password: "123456" })
            axios.post("https://hoodhood.herokuapp.com/api/v1/signin",data,{
              headers: {
                'Content-Type': 'application/json',
              }
            }
            ).then((httpResponse) => {
          
          
              console.log('login http res', httpResponse)
          
          
            })
          }
          login()
    },[])
    const validate = () => {
        if (email.trim().length > 0) {
            const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return expression.test(String(email).toLowerCase())
        }
        return false

    }
    const isPhoneNumber = () => {
        let isnum = /^\d+$/.test(email)
        return isnum
    }

    const loginHandler = async () => {
        setLoading(true)
        const lang = getCurrentLocale()
        const pushToken = await Notifications.getExpoPushTokenAsync()
        const deviceName = pushToken.data
        if(email.trim().length!==0){
            if (validate() || isPhoneNumber()) {
                let type = "email"
                if (isPhoneNumber()) {
                    type = "phone"
                }
                try {
                    await dispatch(login(email, password, deviceName, lang, type))
                } catch (error) {
                    setLoading(false)

                    setError(true)
    
                }
            } else {
                Alert.alert(strings("Somethingwentwrong"), strings("validEmailPhone"), [{ text: strings("okay"), style: "cancel" }])
                setLoading(false)

            }
        }else{
            Alert.alert(strings("Somethingwentwrong"),"please enter the form inputs to can login", [{ text: strings("okay"), style: "cancel" }])
            setLoading(false)
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert(strings("Somethingwentwrong"), strings("validEmailPassword"), [{
                text: strings("okay"),
                style: "cancel",
                onPress: () => {
                    setError(false)
                }
            }])
        }
    }, [error])
    const remmberMeHandler = async () => {
        if (remmberMe) {
            if (password.length > 0 && email.length > 0) {
                try {

                    await AsyncStorage.setItem('login', email);
                    await AsyncStorage.setItem('password', password);
                } catch (error) {
                }
            }
        } else {
            setRemmberMe(false)
            await AsyncStorage.removeItem('login', email);
            await AsyncStorage.removeItem('password', password);
        }

    }
    const getRemmberMe = async () => {
        const login = await AsyncStorage.getItem('login');
        const password = await AsyncStorage.getItem('password');
        if (login && password) {
            setRemmberMe(true)
            setEmail(login)
            setPassword(password)
        }
    }
    useEffect(() => {
        getRemmberMe()
    }, [])
    useEffect(() => {
        remmberMeHandler()
    }, [remmberMe])
    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    return Permissions.askAsync(Permissions.NOTIFICATIONS);
                }
                return statusObj;
            })
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    throw new Error('Permission not granted!');
                }
            })
    }, [])

    return (
        <PaperProvider theme={theme}>
            <KeyboardAvoidingView behavior="height">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.screen}>
                        <ImageBackground style={{ width: "100%", height: "100%" }} source={require("../../assets/login.png")} >
                            <View style={{ width: "100%", height: Dimensions.get("window").height * .35, alignItems: "center", justifyContent: "center" }} >
                                <Image style={{ width: 175, height: 150 }} source={require("../../assets/logo.png")} />
                            </View>
                            <View style={styles.form} >
                                <ImageBackground resizeMode="stretch" style={{ width: "100%", height: "100%", alignItems: "center", }} resizeMode="stretch" source={require("../../assets/login_bottom.png")}>
                                    <View style={{ width: "80%", alignItems: "center", padding: 10, marginTop: 25 }}>
                                        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "700" }} numberOfLines={2}>{strings("formTitle")}</Text>
                                    </View>
                                    <View style={{ width: "100%", padding: 10, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                                            <CustomTextInput value={email} onchangeHandler={(text) => {
                                                setEmail(text)
                                            }} width="100%" placeholder={strings("emailPhone")}    >
                                                <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/email.png")} />
                                            </CustomTextInput>
                                        </View>
                                        <View style={{ width: "95%", flexDirection: "row", alignItems: "center" }}>
                                            <CustomTextInput value={password} onchangeHandler={(text) => {
                                                setPassword(text)
                                            }} width="100%" placeholder={strings("password")} type="Password"   >
                                                <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/password.png")} />
                                            </CustomTextInput>
                                        </View>
                                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}><Checkbox
                                                value={remmberMe}

                                                status={remmberMe ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setRemmberMe(!remmberMe);
                                                }}
                                            /><Text >{strings("remmberMe")}</Text></View>
                                            <TouchableOpacity onPress={() => props.navigation.navigate("ForgetPasswordScreen")}><Text style={{ color: "red", paddingHorizontal: 10 }}>{strings("forgotpassWord")}</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ width: "100%", marginTop: 20, paddingHorizontal: 10 }}>
                                            {loading ? <ActivityIndicator color="#068fff" size="large" /> : <TouchableOpacity onPress={loginHandler} >
                                                <View style={{ width: Dimensions.get("window").width * .9, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: "#52b4f6" }}>
                                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{strings("login")}</Text>
                                                </View>
                                            </TouchableOpacity>}
                                        </View>
                                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                            <Text style={{ fontSize: 14 }}>{strings("doNotHaveAccount")}</Text>
                                            <TouchableOpacity onPress={() => props.navigation.navigate("SignUpScreen")}>
                                                <Text style={{ color: "red", fontSize: 14 }}>{strings("createNewAccount")}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#068fff",

    },
    form: {
        width: "100%",
        height: Dimensions.get("window").height * .65,
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

    },
    container: {
        flexDirection: 'row',
        width: "100%"

    },
    input: {
        flex: 1,
        width: "100%",
        marginHorizontal: 10,
        backgroundColor: "white",
        fontSize: 18
    },
    button: {
        flex: 0,
    },
})

export default LoginScreen