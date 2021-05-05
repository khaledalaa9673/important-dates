import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Button, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from "react-native"
import Header from "../components/Header"
import PersonInfoForm from "../components/PersonInfoForm"
 

const NotaficationScreen = (props) => {


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <StatusBar barStyle="light-content" backgroundColor="#068fff" />
                <View style={{ width: "100%", height: Dimensions.get("window").height * .25 }}>
                    <ImageBackground style={{ width: "100%", height: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }} source={require("../../assets/top_header.png")}>

                        <View style={{ paddingHorizontal: 15, paddingVertical: 20, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>
                            <TouchableOpacity onPress={() => {
                                props.navigation.goBack()
                            }}><Image style={{ width: 30, height: 30 }} source={require("../../assets/back.png")} />
                            </TouchableOpacity><Text style={{ color: "white", fontSize: 22, marginHorizontal: 10 }}>Notafication</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
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

export default NotaficationScreen