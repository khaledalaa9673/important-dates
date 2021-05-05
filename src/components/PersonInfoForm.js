import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import CustomTextInput from "../components/CustomTextInput"
import { Octicons, Entypo } from '@expo/vector-icons';
import { strings, getCurrentLocale, } from "../i18n/i18n"
import { DefaultTheme, RadioButton, Provider as PaperProvider, TextInput, Checkbox, Menu, Divider, Provider } from 'react-native-paper';

import DropdownSelect from "./DropdownSelect"
const PersonInfoForm = (props) => {
    const { number, personData } = props
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [nationality, setNationality] = useState("")
    const [visible, setVisible] = useState(false);

    const nationalityList = ["Egyptian", "Indian", "Kuwaiti", "Jordanian", "Lebanese"]

    useEffect(() => {
        setAge(personData ? personData["age"] : "")
        setNationality(personData ? personData["nationality"] : "")
        setLastName(personData ? personData["last_name"] : "")
        setFirstName(personData ? personData["first_name"] : "")
        setPhoneNumber(personData ? personData["phone_number"] : "")


    }, [])

    useEffect(() => {
        props.updateInfo(number, {
            age: age,
            last_name: lastName,
            first_name: firstName,
            nationality: nationality.toLowerCase(),
            phone_number: phoneNumber

        })

    }, [firstName, lastName, nationality, phoneNumber, age])

    const numberHandler = () => {
        switch (number + 1) {
            case 1:
                return "First"
            case 2:
                return "Second"
            case 3:
                return "Third"
            case 4:
                return "Forth"
            case 5:
                return "Fifth"
            case 6:
                return "Sixth"
            case 7:
                return "Seventh"
            case 8:
                return "Eighth"
            case 9:
                return "Ninth"
            case 10:
                return "Tenth"
            default:
                return " "
        }
    }
    const title = `${numberHandler()}`
    return (
        <View style={{ width: "90%", marginTop: props.gender === "female" ? 0 : 30 }}>
            <Text style={{ color: "#068fff", marginBottom: 20, fontSize: 18 }}>{props.gender === "female" ? "" : strings(`${title}${props.text}Data`)}</Text>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: "45%", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <CustomTextInput
                        value={firstName}
                        onchangeHandler={(text) => { setFirstName(text) }}
                        width="100%"
                        title={strings("firstName")}
                        placeholder={strings("firstName")}

                    ><Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                    </CustomTextInput>
                </View>
                <View style={{ width: "45%", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <CustomTextInput
                        value={lastName}
                        onchangeHandler={(text) => { setLastName(text) }}
                        width="100%"
                        title={strings("LastName")}
                        placeholder={strings("LastName")}


                    ><Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                    </CustomTextInput>
                </View>

            </View>

            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <TouchableOpacity activeOpacity={.9} style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => visible ? setVisible(false) : setVisible(true)}>
                    <DropdownSelect value={nationality} onchangeHandler={(text) => {
                        setNationality(text)
                    }} width="100%" placeholder={strings("enterNationality")} title={strings("nationality")}    >
                        <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                        <Menu
                            style={{ width: "70%", }}
                            visible={visible}
                            onDismiss={() => setVisible(false)}
                            anchor={<Text style={{ marginHorizontal: 10, width: 150, marginVertical: 15, fontSize: 16, color: "#678094" }} onPress={() => { setVisible(true) }}>
                                {nationality.length === 0 ? strings("enterNationality") : strings(`${nationality}`)}
                            </Text>}
                        >
                            {nationalityList.map((elementInArray, index) => (
                                <Menu.Item onPress={() => {
                                    setVisible(false)
                                    setNationality(elementInArray)

                                }} title={strings(`${elementInArray}`)} key={index} />
                            )
                            )}

                        </Menu>
                        {!visible ? <Octicons name="triangle-down" size={20} style={{ margin: 17, marginStart: "30%" }} color="black" /> : <Octicons name="triangle-up" size={20} style={{ margin: 17, marginStart: "30%" }} color="black" />}

                    </DropdownSelect>
                </TouchableOpacity>


            </View>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <CustomTextInput
                    value={age}
                    onchangeHandler={(text) => { setAge(text) }}
                    width="100%"
                    title={strings("age")}
                    placeholder={strings("age")}
                    type="Age"


                />
            </View>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <CustomTextInput
                    value={phoneNumber}
                    onchangeHandler={(text) => { setPhoneNumber(text) }}
                    width="100%"
                    title={strings("phoneNumber")}
                    placeholder={strings("phoneNumber")}
                    type="Phone Number"

                ></CustomTextInput>
            </View>
        </View>
    )
}
export default PersonInfoForm










