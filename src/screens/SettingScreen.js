import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, StatusBar, Modal, Dimensions, BackHandler, Button, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from "react-native"
 import Header from "../components/Header"
import PersonInfoForm from "../components/PersonInfoForm"
import { strings, setLocale, getCurrentLocale, } from "../i18n/i18n"
import { Restart } from 'fiction-expo-restart';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomTextInput from "../components/CustomTextInput"
import { RadioButton } from 'react-native-paper';



const SettingScreen = (props) => {
    const [lang, setLang] = useState("")
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setLang(getCurrentLocale())
    }, [])
    
    


    const changeLanguageHandler = (lang) => {
  
        if (lang !== getCurrentLocale()) {
            AsyncStorage.setItem("LANGUAGE_KEY", lang)
            setLocale(lang)
            Restart();
        }


    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, backgroundColor: open ? "rgba(0,0,0,.1)" : "white", }}>
                <StatusBar barStyle="light-content" backgroundColor="#068fff" />
                <View style={{ width: "100%", height: Dimensions.get("window").height * .25 }}>
                    <ImageBackground style={{ width: "100%", height: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }} source={require("../../assets/top_header.png")}>

                        <View style={{ paddingHorizontal: 15, paddingVertical: 20, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>
                            <TouchableOpacity onPress={() => {
                                props.navigation.goBack()
                            }}><Image style={{ width: 30, height: 30 }} source={require("../../assets/back.png")} />
                            </TouchableOpacity><Text style={{ color: "white", fontSize: 22, marginHorizontal: 10 }}>Account Setting</Text>
                        </View>
                    </ImageBackground>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600", paddingVertical: 10, paddingHorizontal: Dimensions.get("window").width * .05 }}>Notafication Setting</Text>
                <View style={{ borderWidth: 2, borderColor: 1, width: "100%", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ borderWidth: .2, width: "90%", height: 70 }}>
                    </View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600", paddingVertical: 10, paddingHorizontal: Dimensions.get("window").width * .05 }}>Language Setting</Text>
                <View style={{ borderWidth: 2, borderColor: 1, width: "100%", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ borderWidth: .2, width: "90%", height: 70, paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>App Current Language : <Text style={{ color: "rgba(0,0,255,.5)", fontWeight: "600", fontSize: 16 }}>{getCurrentLocale() === "ar" ? strings("arabic") : strings("english")}</Text></Text>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "red" }}>Change Language </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600", paddingVertical: 10, paddingHorizontal: Dimensions.get("window").width * .05 }}>Delete Account</Text>
                <View style={{ borderWidth: 2, borderColor: 1, width: "100%", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ borderWidth: .2, width: "90%", height: 70 }}>
                    </View>
                </View>
            </View>
            <Modal transparent={true} visible={open} animationType="slide" >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: Dimensions.get("window").width * .8,
                        borderRadius: 20,
                        backgroundColor: "white",
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 20,
                        padding: 40


                    }}>
                         <View style={{ width: "100%", height: 30, alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity style={{ width: "100%" }} onPress={() => {
                                setLang("ar")
                                setOpen(false)
                                changeLanguageHandler("ar")
                            }}>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{strings("arabic")}</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <RadioButton value="ar"
                                            onPress={() => {
                                                setLang("ar")
                                                setOpen(false)
                                                changeLanguageHandler("ar")
                
                                            }}
                                            status={lang === 'ar' ? 'checked' : 'unchecked'}
                                            color="#FFA500" color="blue" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", height: 30, marginTop: 20, alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity style={{ width: "100%" }} onPress={() => {
                                console.log("dd")
                                setLang("en")
                                setOpen(false)
                                changeLanguageHandler("en")
                                console.log(getCurrentLocale())


                            }}>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{strings("english")}</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <RadioButton
                                            status={lang === 'en' ? 'checked' : 'unchecked'}
                                            value="en"  onPress={() => {
                                                setLang("en")
                                                setOpen(false)
                                                changeLanguageHandler("en")
                                            }} color="blue" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",


    }

})

export default SettingScreen