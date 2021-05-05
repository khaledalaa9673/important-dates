import React, { useState } from "react"
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground,KeyboardAvoidingView, Button, Alert, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider, TextInput, Checkbox } from 'react-native-paper';
import CustomTextInput from "../components/CustomTextInput"
import { forgotPasswordHandler, verifyCode } from "../store/AuthActons"
import { useDispatch } from "react-redux";
import CodeInput from 'react-native-confirmation-code-input';
import  {strings,setLocale,getCurrentLocale,} from "../i18n/i18n"


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
    accent: "red",

  }
}
const ForgetPasswordScreen = (props) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const onFullFill = (code) => {
    console.log(code)
    if (code) {
      verifyHandler(code)
    }
  }

  const verifyHandler = async (code) => {
    const result = await verifyCode(email, code)
        if (result == 1) {
      props.navigation.navigate("passwordResetScreen", {
        email: email
      })
    }
    setOpen(false)
  }
  const sendCodeHandler = async () => {
    try {
      setLoading(true)
      if (validate()) {

        await forgotPasswordHandler(email)

        setLoading(false)
        setOpen(true)
      } else {
        setLoading(false)

        Alert.alert(strings("Somethingwentwrong"),strings("cannot_send_code"), [{ text:strings("okay"), style: "cancel" }])
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setOpen(false)
      Alert.alert(strings("Somethingwentwrong"),strings("cannot_send_code"), [{ text:strings("okay"), style: "cancel" }])



    }
  }
  const ReSendCodeHandler= async () => {
    try {
        await forgotPasswordHandler(email)
    } catch (error) {
      Alert.alert("Somehing Went Wonrg", error.message, [{ text: "Okay", style: "cancel" }])
    }
  }

  const validate = () => {
    if (email.trim().length > 0) {
      const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return expression.test(String(email).toLowerCase())
    }
    return false

  }
  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
           <View style={{ width: "100%", height: Dimensions.get("window").height * .25 }}>
            <ImageBackground style={{ width: "100%", height: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }} source={require("../../assets/top_header.png")}>

              <View style={{ paddingHorizontal: 15, paddingTop: 30, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => {
                  props.navigation.goBack()
                }}><Image style={{ width: 30, height: 30 ,transform: [
                  {scaleX:getCurrentLocale()==="ar" ? -1 : 1}
                 ], }} source={require("../../assets/back.png")} />
                </TouchableOpacity><Text style={{ color: "white", fontSize: 24, marginHorizontal: 10 }}>{strings("ForgotPassWord")}</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1, height: Dimensions.get("window").height * .75, flexDirection: "row", justifyContent: "center", flexWrap: "wrap", alignContent: "flex-start", marginTop: 10, }}>
            <Image style={{ width: 150, height: 170 }} source={require("../../assets/forget_password.png")} />
            <View style={{ alignItems: "center", width: "100%" }}>
              <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 15 }}>{strings("forgotpassWord")}</Text>
              <View style={{ width: "75%" }}>
                <Text numberOfLines={3} style={{ textAlign: "center", opacity: .5, marginBottom: 10 }}>{strings("ForgotPasswordText")}</Text>
              </View>
              <View style={{ width: "100%", padding: 10, justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: "95%", flexDirection: "row", alignItems: "center" }}>
                  <CustomTextInput value={email} onchangeHandler={(text) => {
                    setEmail(text)
                  }} width="100%" placeholder={strings("EmailAdress")} >
                    <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/email.png")} />
                  </CustomTextInput>
                </View>
                <View style={{ width: "100%", marginTop: 10, padding: 10 }}>
                  {loading ? <ActivityIndicator size="large" color="blue" /> : <TouchableOpacity onPress={sendCodeHandler} >
                            <View style={{width:Dimensions.get("window").width*.9,height:50,justifyContent:"center",alignItems:"center",borderRadius:5,backgroundColor:"#52b4f6"}}>
                            <Text style={{color:"white",fontSize:18,fontWeight:"600"}}>{strings("send")}</Text>
                            </View>
                            </TouchableOpacity>}

                </View>
              </View>
            </View>
          </View>
          <Modal transparent={true} visible={open} animationType="slide" >
          <ScrollView contentContainerStyle={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:"rgba(0,0,0.5)"
            }}>
              <View style={{
                width: Dimensions.get("window").width * .8,
                height: Dimensions.get("window").height * .5,
                backgroundColor: "#068fff",
                borderRadius: 20,
                overflow: "hidden",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 15


              }}>
                  <View style={{ width: 20, alignItems: "center", justifyContent: "center", height: 20, overflow: "hidden", backgroundColor: "white", position: "absolute", top: 10, left: 10, borderRadius: 10 }}><TouchableOpacity onPress={() => setOpen(false)}><Text style={{ color: "#068fff" }}>X</Text></TouchableOpacity></View>
                  <Image style={{ width: 150, height: 150, marginBottom: 5 }} source={require("../../assets/pass_code.png")} />
                  <Text style={{ textAlign: "center", color: "white", fontSize: 20, marginBottom: 5 }}>{strings("recoveryCode")}</Text>
                  <Text style={{ textAlign: "center", color: "white", fontSize: 14, opacity: .9 }} numberOfLines={2}>{strings("forgotModalText")}</Text>
                  <CodeInput
                    //  compareWithCode={code?.toString()}
                    backgroundColor="white"
                    color="black"
                    fontSize={26}
                    placeholder="0"
                    fontWeight="600"
                    codeLength={4}
                    className={'border-box'}
                    space={14}
                    size={50}
                    inputPosition='center'
                    keyboardType="numeric"
                    onFulfill={(code) => onFullFill(code)}
                    containerStyle={{
                        flexDirection: getCurrentLocale()==="en" ? "row":'row-reverse' 
                      }}

                  />
                <Text  style={{color:"white",fontSize:20}} onPress={ReSendCodeHandler}>{strings("reSend")}</Text>
              </View>
              </ScrollView>
          </Modal>
        </View>
      </ScrollView>
    </PaperProvider>

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

export default ForgetPasswordScreen