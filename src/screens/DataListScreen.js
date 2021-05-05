import React, { useEffect } from "react"
import { useState } from "react";
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Button, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from "react-native"
import { strings,getCurrentLocale } from "../i18n/i18n";




const DataListScreen = ({ navigation }) => {

    const addDataHandler = (type) => {
        navigation.navigate("AddInfoScreen", {
            type: type
        })

    }
 
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.screen}>
                <StatusBar barStyle="light-content" backgroundColor="#068fff" />
                <View style={{ width: "100%", height: Dimensions.get("window").height * .25 }}>
                    <ImageBackground style={{ width: "100%", height: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }} source={require("../../assets/top_header.png")}>
                        <View style={{ paddingHorizontal: 15,  paddingTop: 10, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Image  style={{
                                        width: 30, height: 30, transform: [
                                            { scaleX: getCurrentLocale() === "ar" ? -1 : 1 }
                                        ],
                                    }} source={require("../../assets/back.png")} />
                            </TouchableOpacity><Text style={{ color: "white", fontSize: 22, marginHorizontal: 10 }}>{strings("enterDates")}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ width: "100%",justifyContent:"center",alignItems:"center" }}>
                    <View style={{ width: "80%", marginHorizontal: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: "700" }}  >{strings("signUpText")}</Text>
                    </View>
                    <View style={{ width: "80%",backgroundColor:"red ", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start",alignItems:"center",marginTop: 20 }}>

                        <View style={styles.dataItem}>
                            <TouchableOpacity onPress={() => addDataHandler("Personal")}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>

                                    <Image source={require("../../assets/mydataa.png")} />
                                    <Text style={{ ...styles.title, color: "rgba(0,140,255,.9)" }}>{strings("personal_dates")}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ ...styles.dataItem, backgroundColor: "rgba(237,235,252,255)" }}>
                            <TouchableOpacity onPress={() => addDataHandler("Wife")}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>

                                    <Image source={require("../../assets/wifess.png")} />
                                    <Text style={{ ...styles.title, color: "rgba(165,154,241,.9)" }}>{strings("wife_dates")}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ ...styles.dataItem, backgroundColor: "rgba(221,248,244,255)" }}>
                            <TouchableOpacity onPress={() => addDataHandler("Sons")}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>

                                    <Image source={require("../../assets/sonss.png")} />
                                    <Text style={{ ...styles.title, color: "rgba(103,214,196,.9)" }}>{strings("sons_dates")}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ ...styles.dataItem, backgroundColor: "rgba(255,240,233,255)" }}>
                            <TouchableOpacity onPress={() => addDataHandler("Servant")}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                    <Image source={require("../../assets/maids.png")} />
                                    <Text style={{ ...styles.title, color: "rgba(251,168,113,.9)" }}>{strings("servant_dates")}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.dataItem, backgroundColor: "rgba(227,233,239,255)" }}>
                            <TouchableOpacity onPress={() => addDataHandler("Driver")}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>

                                    <Image source={require("../../assets/driver.png")} />
                                    <Text style={{ ...styles.title, color: "rgba(116,147,174,.9)" }}>{strings("driver_dates")}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>




                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: "100%"
    },
    dataItem: {
        width: "45%",
        height: 140, justifyContent: "center",
        alignItems: "center",
        margin: 5,
        backgroundColor: "#cce8ff"
    },
    title: { color: "blue", fontSize: 16, fontWeight: "700" }

})

export default DataListScreen