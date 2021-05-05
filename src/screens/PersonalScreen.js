import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, Button, Alert, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from "react-native"
import CustomTextInput from "../components/CustomTextInput"
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/AuthActons"
import { strings, setLocale, getCurrentLocale, } from "../i18n/i18n"
import { Entypo } from '@expo/vector-icons';



const PersonalScreen = (props) => {
     const user = useSelector(state => state.Auth.user)

    console.log(user)
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", height: "100%", backgroundColor: "#f5f8f9" }}>
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
                                </TouchableOpacity><Text style={{ color: "white", fontSize: 22, marginHorizontal: 10 }}>{strings("personal_page")}</Text>
                            </View>
                            <View style={{ width: "100%", paddingHorizontal: 15, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View style={{ position:"relative",width: 100, height: 100, borderRadius: "50%" }}>
                                   {user["image"]==="" ?<Image style={{ width: "100%", height: "100%" }} source={require("../../assets/User-Profile.png")} /> :
                                   <Image style={{position:"relative", width: "100%", height: "100%" }} source={{uri:user["image"]}} />}
                                    <Image style={{position:"absolute", width:25, height:25 ,bottom:10,right:0}} source={require("../../assets/add_ph.png")} />
                                </View>
                                <View style={{ width: "70%", height: 100, alignItems: "flex-start", justifyContent: "center", marginStart: 10 }}>
                                    <Text style={{ fontSize: 22, fontWeight: "700" }}>{user["user_name "]}</Text>
                                    <Text style={{ fontSize: 14, color: "red", fontWeight: "500" }}>{user["email"]}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", alignContent: "flex-start", marginTop:5, }}>
                        <View style={{ width: "90%", height: 150, alignItems: "center", backgroundColor: "white", justifyContent: "flex-start", paddingVertical: 10, borderRadius: 5, shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,  
    elevation: 2 }}>
                            <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between",}}>
                                <View style={{ width: "40%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={{ width: 20, height: 20, marginEnd: 5 }} source={require("../../assets/user.png")} />
                                    <Text style={{ fontSize: 14 }}>{strings("fullName")}</Text>
                                </View>
                                <View style={{ width: "60%", marginStart: 20 }}>
                                    <Text style={{ fontSize: 12, fontWeight: "600", color: "#7493ae", textAlign: getCurrentLocale === "en" ? "right" : "left" }}>{user["user_name "]}</Text>
                                </View>
                            </View>
                            <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 15 }}>
                                <View style={{ width: "40%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={{ width: 20, height: 20, marginEnd: 5 }} source={require("../../assets/email.png")} />
                                    <Text style={{ fontSize: 14 }}>{strings("emailAdd")}</Text>
                                </View>
                                <View style={{ width: "60%", marginStart: 20 }}>
                                    <Text style={{ fontSize: 12, fontWeight: "600", color: "#7493ae", textAlign: getCurrentLocale === "en" ? "right" : "left" }}>{user["email"]}</Text>
                                </View>
                            </View>
                            <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ width: "40%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={{ width: 20, height: 20, marginEnd: 5 }} source={require("../../assets/call.png")} />
                                    <Text style={{ fontSize: 14 }}>{strings("phoneNum")}</Text>
                                </View>
                                <View style={{ width: "60%", marginStart: 20 }}>
                                    <Text style={{ fontSize: 12, fontWeight: "600", color: "#7493ae", textAlign: getCurrentLocale === "en" ? "right" : "left" }}>{user["phone_number "]}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 17, color: "red", alignSelf: "flex-start", padding: 15 }} onPress={() => {
                                props.navigation.navigate("EditPersonalScreen")
                            }} >{strings("editPersonalPage")}</Text>
                        </View>
                        <View style={{ width: "90%", height: 80, alignItems: "center", backgroundColor: "white", justifyContent: "flex-start", paddingVertical: 10, marginTop: 20, borderRadius: 5 , shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,  
    elevation: 2}}>
                            <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ width: "40%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={{ width: 20, height: 20, marginEnd: 5 }} source={require("../../assets/call.png")} />
                                    <Text style={{ fontSize: 14 }}>{strings("pass")}</Text>
                                </View>
                                <View style={{ width: "60%", marginStart: 10, flexDirection: "row", justifyContent: "flex-start" }}>
                                <Text>{'\u2B24'}{'\u2B24'}{'\u2B24'}{'\u2B24'}{'\u2B24'}{'\u2B24'}{'\u2B24'}{'\u2B24'}{'\u2B24'}{'\u2B24'}</Text>
                                    {/* <Entypo name="dot-single"  size={24} color="black" />
                                    <Entypo name="dot-single" size={24} color="black" />
                                    <Entypo name="dot-single" size={24} color="black" />
                                    <Entypo name="dot-single" size={24} color="black" />
                                    <Entypo name="dot-single" size={24} color="black" />
                                    <Entypo name="dot-single" size={24} color="black" /> */}
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, color: "red", alignSelf: "flex-start", padding: 15 }} onPress={() => {
                                props.navigation.navigate("passwordResetScreen", {
                                    comesFrom: "Auth" ///
                                })
                            }} >{strings("changePassword")}</Text>
                        </View>

                    </View>



                </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
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
})

export default PersonalScreen