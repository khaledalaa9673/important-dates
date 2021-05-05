import React,
{
    useEffect,
    useState
} from "react"
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    BackHandler,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert
} from "react-native"
import {
    DefaultTheme,
    Provider as PaperProvider,
    Checkbox,
    Menu
} from 'react-native-paper'
import {
    register,
    clearFamilyData,
    resetServantsList,
    resetDriversList,
    resetSonsList,
    resetPartenersList
} from "../store/AuthActons"
import CustomTextInput from "../components/CustomTextInput"
import {
    strings,
    getCurrentLocale
} from "../i18n/i18n"
import DropdownSelect from "../components/DropdownSelect"
import { Octicons } from '@expo/vector-icons';
import {
    useDispatch,
    useSelector
} from "react-redux";
import * as Notifications from 'expo-notifications';
import Header from "../components/Header"

const theme = {
    ...DefaultTheme,
    roundness: 1,
    colors: {
        ...DefaultTheme.colors,
        accent: "red",
    }
}

const SignUpScreen = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [phoneNumber, stPhoneNumber] = useState("")
    const [gender, setGander] = useState("")
    const [hasPartener, setHasPartener] = useState(false)
    const [hasSons, setHasSons] = useState(false);
    const [hasDriver, setHasDriver] = useState(false);
    const [hasServant, setHasServant] = useState(false);
    const [loading, setLoading] = useState(false)
    const [enteredData, setEnteredData] = useState(false)
    const [visible, setVisible] = useState(false);
    const [partenersList, setPartenersList] = useState([])
    const [sonsList, setSonsList] = useState([])
    const [driversList, setDriversList] = useState([])
    const [servantsList, setServantsList] = useState([])

    const updateListHandler = (person, list) => {
        if (person === "parteners") {
            setPartenersList([...list])
        } else if (person === "Drivers") {
            setDriversList([...list])
        } else if (person === "Sons") {
            setSonsList([...list])
        } else {
            setServantsList([...list])

        }
    }


    const dispatch = useDispatch()
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const haveData = () => {
        if (hasServant || hasPartener || hasSons || hasDriver) {
            setEnteredData(true)
        } else {
            setEnteredData(false)
        }
    }

    useEffect(() => {
        haveData()
        if (!hasServant) {
           setServantsList([])
        } else if (!!hasPartener) {
           setPartenersList([])
        } else if (!hasSons) {
          setSonsList([])
        } else {
           setDriversList([])
        }
    }, [hasServant, hasPartener, hasSons, hasDriver])

    const check = (arr, has) => {
        let result = true
        if (has) {
            if (arr.length === 0) {
                result = false
            } else {
                return arr.every(element => {
                    let result = true
                    for (let key in element) {
                        if (element[key].length === 0) {
                            result = false
                        }
                    }
                    return result
                })
            }
        }
        console.log(result)
        return result
    }

    const checkdatacompleted = () => {
        return check(partenersList, !!hasPartener) && check(sonsList, hasSons) && check(servantsList, hasServant) && check(driversList, hasDriver)
    }

    const validate = (email) => {
        if (email.trim().length > 0) {
            const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return expression.test(String(email).toLowerCase())
        }
        return false
    }

    const checkValidation = () => {
        let result = true
        if (firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || email.trim().length === 0) {
            Alert.alert("Please Enter Valid inputs", "please enter your data", [{ text: "okay", style: "cancel" }])
            result = false
            setLoading(false)
        } else if (firstName.trim().length < 3 || lastName.trim().length < 3) {
            Alert.alert("Please Enter Valid inputs", "first name , last Name Must Have At Least 3 Characters", [{ text: "okay", style: "cancel" }])
            setLoading(false)
            result = false
        } else if (gender.trim().length === 0) {
            Alert.alert("Please Enter Valid inputs", "first name , please enter your gender", [{ text: "okay", style: "cancel" }])
            setLoading(false)
            result = false
        } else if (!validate(email)) {
            Alert.alert("Please Enter Valid inputs", "Please Enter A Valid Email", [{ text: "okay", style: "cancel" }])
            setLoading(false)
            result = false
        } else if (phoneNumber.length !== 11) {
            Alert.alert("Please Enter Valid inputs", "Phone Number Must Have   11 Characters", [{ text: "okay", style: "cancel" }])
            setLoading(false)
            result = false
        } else if (password !== confirmPassword) {
            Alert.alert("Please Enter Valid inputs", "Confirm Password Number Must Match Password", [{ text: "okay", style: "cancel" }])
            setLoading(false)
            result = false
        } else if (hasSons === true || !!hasPartener || hasServant === true || hasDriver === true) {
            if (!checkdatacompleted()) {
                Alert.alert("Alert ", "please complete your family data", [{ text: "okay", style: "cancel" }])
                setLoading(false)
                result = false
            }
        }
        return result
    }

    const signUpHandler = async () => {
        console.log("SignUp Begin")
        setLoading(true)
        const lang = getCurrentLocale()
        const pushToken = await Notifications.getExpoPushTokenAsync()
        const deviceName = pushToken.data
        let marital_status = hasPartener ? 1 : 0
        let has_servants = hasServant ? 1 : 0
        let has_sons = hasSons ? 1 : 0
        let has_drivers = hasDriver ? 1 : 0
        let family_data = enteredData ? 1 : 0
        if (checkValidation()) {
            try {
                await dispatch(register(firstName, lastName, email, phoneNumber, gender, password, confirmPassword, marital_status, has_sons, has_servants, has_drivers, deviceName, lang, family_data, partenersList.length, partenersList, sonsList.length, getSonsList, servantsList.length, servantsList, driversList.length, driversList))
            } catch (error) {
                Alert.alert("Alert ", error.message, [{ text: "okay", style: "cancel" }])
                console.log("loading", error)
                setLoading(false)
            }
        } else {
            console.log("loading", loading)
            setLoading(false)
        }
    }

    const backAction = () => {
        setPartenersList([])
        setServantsList([])
        setSonsList([])
        setDriversList([])
        props.navigation.goBack()
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    useEffect(() => {
        if (hasPartener) {
            if (hasPartener == "wife") {
                setGander("male")
            } else {
                setGander("female")
            }
        }
    }, [hasPartener])

    return (
        <PaperProvider theme={theme}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <Header text={strings("signUpText")} title={strings("newRegistration")} navigation={props.navigation} />
                    <View style={{ width: "100%", padding: 10, justifyContent: "center", alignItems: "center", paddingTop: 30 }}>
                        <View style={{ width: "95%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ width: "45%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                                <CustomTextInput value={firstName} onchangeHandler={(text) => {
                                    setFirstName(text)
                                }} width="100%" placeholder={strings("firstName")}    >
                                    <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                                </CustomTextInput>
                            </View>
                            <View style={{ width: "45%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                                <CustomTextInput value={lastName} onchangeHandler={(text) => {
                                    setLastName(text)
                                }} width="100%" placeholder={strings("LastName")}     >
                                    <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                                </CustomTextInput>
                            </View>
                        </View>
                        <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                            <CustomTextInput value={email} onchangeHandler={(text) => {
                                setEmail(text)
                            }} width="100%" placeholder={strings("EmailAdress")}    >
                                <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/email.png")} />
                            </CustomTextInput>
                        </View>
                        <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                            <CustomTextInput value={phoneNumber} onchangeHandler={(text) => {
                                stPhoneNumber(text)
                            }} width="100%" placeholder={strings("phoneNumber")} type="Phone Number" >
                                <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/call.png")} />
                            </CustomTextInput>
                        </View>
                        <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                            <TouchableOpacity activeOpacity={.9} style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => visible ? closeMenu() : openMenu()}>
                                <DropdownSelect value={gender} onchangeHandler={(text) => {
                                    setGander(text)
                                }} width="100%" placeholder={strings("chooseGender")} title={strings("gender")}     >
                                    <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                                    <Menu
                                        style={{ width: "70%", }}
                                        visible={visible}
                                        onDismiss={closeMenu}
                                        anchor={<Text style={{ marginHorizontal: 10, width: 150, marginVertical: 15, fontSize: 16, color: "#678094" }} onPress={openMenu}>{gender.length === 0 ? strings("chooseGender") : gender === "male" ? strings("male") : strings("female")}</Text>}
                                    >
                                        <Menu.Item onPress={() => {
                                            setGander("male")
                                            closeMenu()
                                        }} title={strings("male")} />
                                        <Menu.Item onPress={() => {
                                            setGander("female")
                                            closeMenu()
                                        }} title={strings("female")} />
                                    </Menu>
                                    {!visible ?
                                        <Octicons name="triangle-down" size={20} style={{ margin: 17, marginStart: Dimensions.get("window").width * .30 }} color="black" />
                                        : <Octicons name="triangle-up" size={20} style={{ margin: 17, marginStart: Dimensions.get("window").width * .3 }} color="black" />}
                                </DropdownSelect>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                            <CustomTextInput value={password} onchangeHandler={(text) => {
                                setPassword(text)
                            }} width="100%" placeholder={strings("password")} type="Password"    >
                                <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/password.png")} />
                            </CustomTextInput>
                        </View>
                        <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                            <CustomTextInput value={confirmPassword} onchangeHandler={(text) => {
                                setConfirmPassword(text)
                            }} width="100%" placeholder={strings("ConfirmPassword")} type="Confirm Password"  >
                                <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/password.png")} />
                            </CustomTextInput>
                        </View>
                        <View style={{ width: "100%", alignItems: "flex-start" }}><Text style={{ marginStart: 10, marginBottom: 10 }}>Do you Have?</Text></View>
                        <View style={{ width: 180, paddingHorizontal: 10, alignSelf: "flex-start", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", alignItems: "flex-start" }}>
                            {gender === "male" || gender === "" ? <View style={{ width: 90, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}><Checkbox
                                status={hasPartener === "wife" ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    if (hasPartener === "wife") {
                                        setHasPartener("")
                                    } else {
                                        setHasPartener("wife")
                                    }
                                }}
                                uncheckedColor="rgba(0,0,0,.2)"
                            /><Text>{strings("wife")}</Text></View> : <View style={{ width: 90, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}><Checkbox
                                status={hasPartener === "husband" ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    if (hasPartener === "husband") {
                                        setHasPartener("")
                                    } else {
                                        setHasPartener("husband")
                                    }
                                }}
                                uncheckedColor="rgba(0,0,0,.2)"
                            /><Text>{strings("husband")}</Text></View>}
                            <View style={{ width: 60, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}><Checkbox status={hasSons ? 'checked' : 'unchecked'}
                                status={hasSons ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setHasSons(!hasSons);
                                }}
                                uncheckedColor="rgba(0,0,0,.2)"
                            /><Text  >{strings("sons")}</Text></View>
                            <View style={{ width: 60, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}><Checkbox
                                status={hasServant ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setHasServant(!hasServant);
                                }}
                                uncheckedColor="rgba(0,0,0,.2)"
                            /><Text>{strings("servant")}</Text></View>
                            <View style={{ width: 60, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}><Checkbox
                                status={hasDriver ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setHasDriver(!hasDriver);
                                }}
                                uncheckedColor="rgba(0,0,0,.2)"
                            /><Text>{strings("driver")}</Text></View>
                        </View>
                        {enteredData && <TouchableOpacity activeOpacity={.99} onPress={() => {
                            props.navigation.navigate("FamilyDataScreen", {
                                hasDriver: hasDriver,
                                hasSons: hasSons,
                                hasPartener: hasPartener,
                                hasServant: hasServant,
                                gender: gender,
                                partenersList:partenersList,
                                sonsList:sonsList,
                                servantsList:servantsList,
                                driversList:driversList,
                                updateListHandler:updateListHandler
                            })
                        }} >
                            <View style={{ width: Dimensions.get("window").width * .9, height: 50, marginBottom: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, borderColor: "#52b4f6", borderWidth: .3 }}>
                                <Text style={{ color: "#52b4f6", fontSize: 18, fontWeight: "600" }}>{strings("enter_family_info")}</Text>
                            </View>
                        </TouchableOpacity>}
                        <View style={{ paddingHorizontal: 10, width: "100%", marginBottom: 10, justifyContent: "center", alignItems: "center" }}>
                            {loading ? <ActivityIndicator size="large" color="#068fff" /> : <TouchableOpacity onPress={signUpHandler} >
                                <View style={{ width: Dimensions.get("window").width * .9, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: "#52b4f6" }}>
                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{strings("sign_up")}</Text>
                                </View>
                            </TouchableOpacity>}
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 50 }}>
                            <Text style={{ fontSize: 14 }}>{strings("alreadyHaveAccount")}</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate("LoginScreen")}>
                                <Text style={{ color: "red", fontSize: 14 }}> {strings("login")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </PaperProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: "rgba(255,255,255,0)",

    },
    input: {
        flex: 1,
        width: "100%",
        marginHorizontal: 10,
        backgroundColor: "white",
        fontSize: 18
    },
})



export default SignUpScreen