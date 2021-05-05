import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Modal, Button, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from "react-native"
import Header from "../components/Header"
 


 

const AddInfoScreen = (props) => {
    console.log(props)



    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ ...styles.screen, width: Dimensions.get("window").width, height: Dimensions.get("window").height }}>
                <StatusBar barStyle="light-content" backgroundColor="#068fff" />
                <Header title={`${props.route.params.type} Dates`} navigation={props.navigation} />
                <View style={{alignItems:"center",justifyContent:"center"}}>
                <Text>{props.route.params.type}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
       flex:1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"

    }

})

export default AddInfoScreen


