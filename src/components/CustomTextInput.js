import React, {
    useState
} from "react"
import {
    TextInput,
    View,
    Text,
    Keyboard,
} from "react-native"

const CustomTextInput = (props) => {

    const [focus, setFocus] = useState(false)

    return (
        <View style={{ height: 50, width: props.width, position: "relative", flexDirection: "row", justifyContent: "flex-start", borderWidth: focus ? 1 : .7, borderColor: focus ? "red" : "rgba(116,147,174,.5)", borderRadius: 5, backgroundColor: "white" }} >
            <View style={{ position: "absolute", backgroundColor: "white", top: -11, left: 20, zIndex: 10, paddingHorizontal: 5 }}><Text style={{ fontWeight: "700", textAlign: "center", fontSize: 14, color: focus ? "red" : "black" }}    >{props.title ? props.title : props.placeholder}</Text></View>
            {props.children}
            <TextInput
                secureTextEntry={props.type === "Password" || props.type === "Confirm Password"}
                placeholder={props.placeholder}
                placeholderTextColor="rgba(116,147,174,255)"
                value={props.value}
                keyboardType={props.type === "Password" || props.type === "Phone Number" || props.type === "Age" || props.type === "Confirm Password" ? "number-pad" : "default"}
                onChangeText={(text) => {
                    if (props.type === "Age" || props.type === "Phone Number") {
                        props.onchangeHandler(text.replace(/[^0-9]/g, ''))
                    } else {
                        props.onchangeHandler(text)
                    }
                }}
                style={{ width: "80%", height: "100%", paddingHorizontal: props.children ? 10 : 25, paddingEnd: 20, fontSize: 16, color: "#678094" }}
                onFocus={() => {
                    setFocus(true)
                }}
                onBlur={() => {
                    setFocus(false)
                }}
                onSubmitEditing={Keyboard.dismiss}
                maxLength={props.type === "Age" ? 2 : props.type === "Phone Number" ? 11 : 40}

            />
        </View>
    )
}

export default CustomTextInput