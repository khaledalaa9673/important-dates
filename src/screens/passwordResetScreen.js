import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, Button, Alert, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from "react-native"
import CustomTextInput from "../components/CustomTextInput"
import { useDispatch ,useSelector} from "react-redux";
import { resetPassword ,changePassword} from "../store/AuthActons"
import { strings, setLocale, getCurrentLocale, } from "../i18n/i18n"


const passwordResetScreen = (props) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
const token=useSelector(state=>state.Auth.token)
  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch()
 

  const resetPasswordHandler = async () => {
    setLoading(true)
    const email = props.route.params.email
    try {
      if (password.length > 6 || password === confirmPassword) {
       let response = await  resetPassword(email, password)
      
           Alert.alert(strings("done"), strings("resetModalMessage"), [{ text: strings("okay"), style: "cancel" }])
          props.navigation.navigate("LoginScreen")
     
      } else {
        setLoading(false)
        Alert.alert(strings("EnterValidInput"), strings("password_and_confirm_message"), [{ text: strings("okay"), style: "cancel" }])

      }
    } catch (error) {
      setLoading(false)
      Alert.alert(strings("Somethingwentwrong"), strings("pleaseTryAgain"), [{ text: strings("okay"), style: "cancel" }])


    }
  }
const changePasswordHandler=async()=>{
  setLoading(true)

  try {
    if (password.length > 6 || password === confirmPassword||currentPassword==="") {
      await changePassword(currentPassword,password, confirmPassword,token)
      Alert.alert(strings("done"), strings("resetChangeMessage"), [{ text: strings("okay"), style: "cancel" }])

         props.navigation.goBack()
     
    } else {
      console.log("error1")
      setLoading(false)
      Alert.alert(strings("EnterValidInput"), strings("password_and_confirm_message"), [{ text: strings("okay"), style: "cancel" }])

    }
  } catch (error) {
    console.log("error")
    console.log(error)
    setLoading(false)
    Alert.alert(strings("Somethingwentwrong"), strings("pleaseTryAgain"), [{ text: strings("okay"), style: "cancel" }])


  }
}
 
  return (
    <ScrollView>
      <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <StatusBar barStyle="light-content" backgroundColor="#068fff" />
        <View style={{ width: "100%", height: Dimensions.get("window").height * .25 }}>
          <ImageBackground style={{ width: "100%", height: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }} source={require("../../assets/top_header.png")}>

            <View style={{ paddingHorizontal: 15, paddingTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={() => {
                props.navigation.goBack()
              }}><Image style={{
                width: 30, height: 30, transform: [
                  { scaleX: getCurrentLocale() === "ar" ? -1 : 1 }
                ],
              }} source={require("../../assets/back.png")} />
              </TouchableOpacity><Text style={{ color: "white", fontSize: 22, marginHorizontal: 10 }}>{strings("passwordReset")}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ flex: 1, height: Dimensions.get("window").height * .75, flexDirection: "row", justifyContent: "center", flexWrap: "wrap", alignContent: "flex-start", marginTop: 10, }}>
          <Image style={{ width: 150, height: 170 }} source={require("../../assets/forget_password.png")} />
          <View style={{ alignItems: "center", width: "100%" }}>

            <View style={{ width: "100%", padding: 10, justifyContent: "center", alignItems: "center" }}>
              <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                {props.route.params.comesFrom === "Auth" && <CustomTextInput value={currentPassword} onchangeHandler={(text) => {
                  setCurrentPassword(text)
                }} width="100%" placeholder={strings("currentPassword")} type="Password"  >
                  <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/password.png")} />
                </CustomTextInput>}
              </View>
              <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <CustomTextInput value={password} onchangeHandler={(text) => {
                  setPassword(text)
                }} width="100%" placeholder={strings("password")} type="Password"  >
                  <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/password.png")} />
                </CustomTextInput>
              </View>
              <View style={{ width: "95%", flexDirection: "row", alignItems: "center", marginBottom:props.route.params.comesFrom === "Auth" ?10: 20 }}>
                <CustomTextInput value={confirmPassword} onchangeHandler={(text) => {
                  setConfirmPassword(text)
                }} width="100%" placeholder={strings("ConfirmPassword")}  type="Password"  >
                  <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/password.png")} />
                </CustomTextInput>


              </View>
              <View style={{ width: "100%", marginTop:props.route.params.comesFrom === "Auth"? 0: 10, padding: 10 }}>
                {loading ? <ActivityIndicator size="large" color="blue" /> :
                  <TouchableOpacity onPress={() => {
                    if(props.route.params.comesFrom !== "Auth"){
                    resetPasswordHandler()
                  }else{
                    changePasswordHandler()
                  }
                  }} >
                    <View style={{ width: Dimensions.get("window").width * .9, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: "#52b4f6" }}>
                      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{strings("reset")}</Text>
                    </View>
                  </TouchableOpacity>
                }

              </View>

            </View>
          </View>
        </View>


      </View>
    </ScrollView>


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

export default passwordResetScreen