import React, { useEffect, useState, UseState } from "react"
import { View, StyleSheet, StatusBar, Text, Dimensions, TextInput, ImageBackground, Image, TouchableOpacity, Touchable } from "react-native"
import { useSelector } from "react-redux"
import { getAllDates } from "../store/api"
import { strings, getCurrentLocale, } from "../i18n/i18n"



const HomeScreen = (props) => {
    const [loadedDates, setLoadedDates] = useState([])
    const token = useSelector(state => state.Auth.token)

    const getAllDatesHandler = async () => {
        try {
            const dates = await getAllDates(token)
            setLoadedDates(dates)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (token) {
            getAllDatesHandler()
        }
    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar barStyle="light-content" backgroundColor="#068fff" />
            <View style={{ width: "100%", height: Dimensions.get("window").height * .3, overflow: "hidden", alignItems: "flex-start", justifyContent: "center" }}>
                <ImageBackground resizeMode="stretch" style={{ flex: 1, flexDirection: "row", justifyContent: "center", flexWrap: "wrap", alignContent: "space-around" }} source={require("../../assets/MaskGroup2.png")}>

                    <View style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around", paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.toggleDrawer()
                        }}><Image style={{
                            transform: [
                                { scaleX: getCurrentLocale() === "ar" ? 1 : -1 }
                            ]
                        }} source={require("../../assets/menu.png")} />
                        </TouchableOpacity>
                        <View style={{ width: Dimensions.get("window").width * .65, height: 30, backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 5 }}>
                            <TextInput value="9 septamper-2019" style={{ width: "100%", height: "100%", fontSize: 14, fontWeight: "700" }} />
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate("CalendarScreen")}>
                            <Image style={{ width: 30, height: 30 }} source={require("../../assets/calendar_w.png")} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                        <View style={{ width: "80%" }}>
                            <Text numberOfLines={2} style={{ fontSize: 20, lineHeight: 30, fontWeight: "700", color: "white", textAlign: "center" }}>{strings("home_text")}</Text>
                        </View>
                    </View>



                </ImageBackground>

            </View>

            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 50 }}>
                {loadedDates.length === 0 && <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ width: 125, height: 125 }} source={require("../../assets/adddata.png")} />
                    <View style={{ width: "90%", height: 50, justifyContent: "center", alignItems: "center" }}><Text style={{ fontSize: 18, fontWeight: "700" }}>{strings("home_empty_text")}</Text></View>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("DataListScreen")
                    }}>
                        <View style={{ minWidth: "80%", height: 50, borderRadius: 5, borderColor: "#008cff", justifyContent: "center", alignItems: "center", backgroundColor: "#008cff" }}><Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>{strings("enter_dates")}</Text></View>
                    </TouchableOpacity>
                </View>}
            </View>


        </View>
    )
}

export default HomeScreen