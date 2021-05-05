import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { Octicons } from '@expo/vector-icons';
import PersonInfoForm from "./PersonInfoForm"
import { Menu } from 'react-native-paper';
import { strings, getCurrentLocale } from "../i18n/i18n";
import DropdownSelect from "./DropdownSelect"
import { useDispatch } from "react-redux"
 
let person = {
    first_name: "",
    last_name: "",
    age: "",
    nationality: "",
    phone_number: ""

}

const FamilyDataItem = (props) => {
    const { list } = props
    const [visible, setVisible] = useState(false);
    const [number, setNumber] = useState(list ? list.length : 0)
    const [personsList, setPersonsList] = useState(list ? list : [])


    useEffect(() => {
        if (props.gender === "female") {
            setNumber(1)
        }
    }, [])

    useEffect(() => {
        setPersonsList(list => {
            if (personsList ?.length < number) {
                if (list.length < 4) {
                    return [...list, ...Array(number - list.length).fill(person)]
                }
            } else {
                return list && list.splice(0, number);

            }
        })
    }, [number])

    const updateInfo = (id, personData) => {
        setPersonsList(personsList => {
            return personsList ? personsList.map((person, index) => {
                if (index === id) {
                    return { ...personData }
                }
                return person
            }) : personsList
        })

    }
    const { updateListHandler } = props
    useEffect(() => {
        updateListHandler(props.personType, personsList)
    }, [personsList])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
            <ScrollView>
                {props.gender !== "female" ? <View style={{ width: "100%", height: 70, flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <TouchableOpacity activeOpacity={.9} style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }} onPress={() => visible ? setVisible(false) : setVisible(true)}>
                        <DropdownSelect width="90%" placeholder={number} title={props.boxTitle}    >
                            <Image style={{ width: 20, height: 20, marginTop: 15, marginStart: 25 }} source={require("../../assets/user.png")} />
                            <Menu
                                style={{ width: "70%", marginBottom: 50 }}
                                visible={visible}
                                onDismiss={() => setVisible(false)}
                                anchor={<Text style={{ marginHorizontal: 10, width: 220, marginVertical: 15, fontSize: 16, color: "#678094", textAlign: getCurrentLocale === "en" ? "right" : "left" }} onPress={() => setVisible(true)}>{number === 0 ? `${strings(`select${props.personType}Numbers`)} ` : number}</Text>}>
                                {[...Array(props.personsNumber)].map((elementInArray, index) => (
                                    <Menu.Item onPress={() => {

                                        setNumber(index + 1)
                                        setVisible(false)
                                    }} title={index + 1} key={index} />
                                )
                                )}
                            </Menu>
                            {!visible ? <Octicons name="triangle-down" size={20} style={{ marginVertical: 17, marginStart: "14%" }} color="black" /> : <Octicons name="triangle-up" size={20} style={{ marginVertical: 17, marginStart: "14%" }} color="black" />}

                        </DropdownSelect>
                    </TouchableOpacity>
                </View> : <View style={{ marginTop: 20 }}></View>}
                <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    {number > 0 && personsList ?.map((elementInArray, index) => {

                        return <PersonInfoForm key={index} gender={props.gender} personData={elementInArray} number={index} text={props.text} updateInfo={updateInfo} />
                    }
                    )}
                </View>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({

})
export default FamilyDataItem