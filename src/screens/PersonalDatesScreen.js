import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, StatusBar, Dimensions,BackHandler, Button, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from "react-native"
 import Header from "../components/Header"
import PersonInfoForm from "../components/PersonInfoForm"


const PersonalDatesScreen = (props) => {
    
     

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ ...styles.screen, width: Dimensions.get("window").width, height: Dimensions.get("window").height }}>
                <Text>Personal Data Screen</Text>
                <Button title="edit" onPress={()=>props.navigation.navigate("EditPersonalDataScreen")}/>
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

export default PersonalDatesScreen