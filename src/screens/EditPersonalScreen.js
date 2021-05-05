import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, Button, Alert, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from "react-native"
import CustomTextInput from "../components/CustomTextInput"
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/AuthActons"
import { strings, setLocale, getCurrentLocale, } from "../i18n/i18n"
import { Entypo } from '@expo/vector-icons';


const EditPersonalScreen = (props) => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const user = useSelector(state => state.Auth.user)

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, backgroundColor: "white" }}>
                <StatusBar barStyle="light-content" backgroundColor="#068fff" />
                <View style={{ width: "100%", height: Dimensions.get("window").height * .25 }}>
                    <ImageBackground style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "flex-start" }} source={require("../../assets/top_header.png")}>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => {
                                props.navigation.goBack()
                            }}><Image style={{
                                width: 30, height: 30, transform: [
                                    { scaleX: getCurrentLocale() === "ar" ? -1 : 1 }
                                ],
                            }} source={require("../../assets/back.png")} />
                            </TouchableOpacity><Text style={{ color: "white", fontSize: 22, marginHorizontal: 10 }}>{strings("editPersonalPage")}</Text>
                        </View>
                        <View style={{ width: "100%", paddingHorizontal: 15, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ position: "relative", width: 100, height: 100, borderRadius: "50%" }}>
                                {user["image"] === "" ? <Image style={{ width: "100%", height: "100%" }} source={require("../../assets/User-Profile.png")} /> :
                                    <Image style={{ position: "relative", width: "100%", height: "100%" }} source={{ uri: user["image"] }} />}
                                <Image style={{ position: "absolute", width: 25, height: 25, bottom: 10, right: 0 }} source={require("../../assets/add_ph.png")} />
                            </View>
                            <View style={{ width: "70%", height: 100, alignItems: "flex-start", justifyContent: "center", marginStart: 10 }}>
                                <Text style={{ fontSize: 22, fontWeight: "700" }}>{user["user_name "]}</Text>
                                <Text style={{ fontSize: 14, color: "red", fontWeight: "500" }}>{user["email"]}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", alignContent: "flex-start", marginTop: 20, }}>
                    <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                        <CustomTextInput value={fullName} onchangeHandler={(text) => {
                            setFullName(text)
                        }} width="100%" title={strings("full_Name")} placeholder={strings("enter_full_Name")}    >
                            <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                        </CustomTextInput>
                    </View>
                    <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                        <CustomTextInput value={email} onchangeHandler={(text) => {
                            setEmail(text)
                        }} width="100%" placeholder={strings("enterEmail")} title={strings("EmailAdress")}   >
                            <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/email.png")} />
                        </CustomTextInput>
                    </View>
                    <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                        <CustomTextInput value={phone} onchangeHandler={(text) => {
                            setPhone(text)
                        }} width="100%" title={strings("phoneNumber")} type="Phone Number" placeholder={strings("enterPhoneNumber")}   >
                            <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/call.png")} />
                        </CustomTextInput>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",


    }

})

export default EditPersonalScreen