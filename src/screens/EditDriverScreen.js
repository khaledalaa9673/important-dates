import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Button, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from "react-native"
import Header from "../components/Header"
import PersonInfoForm from "../components/PersonInfoForm"


const EditDriverScreen = (props) => {
     

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ ...styles.screen, width: Dimensions.get("window").width, height: Dimensions.get("window").height }}>
                <Text>Edit driver Screen</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex:1,
        justifyContent:"center",
        alignItems: "center",
        

    }

})

export default EditDriverScreen