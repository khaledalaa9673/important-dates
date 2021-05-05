import React,
{
    useEffect,
    useState,
    useCallback
} from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Alert,
    TouchableOpacity,
    ScrollView,
} from "react-native"
import { Octicons, } from '@expo/vector-icons';
import {
    DefaultTheme,
    Provider as PaperProvider
} from 'react-native-paper';
import FamilyDataItem from "../components/FamilyDataItem"
import { useSelector } from "react-redux";
import Header from "../components/Header"
import { strings } from "../i18n/i18n"



const theme = {
    ...DefaultTheme,
    roundness: 1,
    colors: {
        ...DefaultTheme.colors,
        accent: "red",
    }
}

const FamilyDataScreen = (props) => {
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [visible4, setVisible4] = useState(false)
    const { partenersList, sonsList, servantsList, driversList, hasPartener, hasDriver, hasServant, hasSons, updateListHandler } = props.route.params

    const check = (arr, has) => {
        let result = true
        if (has) {
            if (arr.length === 0) {
                result = true
            } else {
                for (let key in arr) {
                    if (arr["nationality"]?.length === 0 || arr["phone_number"]?.length === 0 || arr["last_name"]?.length === 0 || arr["first_name"]?.length === 0 | arr["age"]?.length === 0) {
                        Alert.alert("Please Enter Valid inputs", "complete  your family data", [{ text: "ok", style: "cancel" }])
                        result = false
                    }  else if (arr["nationality"]?.length === 0) {
                        Alert.alert("Please Enter Valid inputs", "please enter nationality for your family members", [{ text: "ok", style: "cancel" }])
                        result = false
                    } else if (arr["last_name"]?.length < 3 || arr["first_name"]?.length < 3) {
                        Alert.alert("Please Enter Valid inputs", "first name and last name should be at least 3 character for both ", [{ text: "ok", style: "cancel" }])
                    } else if (arr["age"]?.length === 0 || arr["age"] === "0") {
                        Alert.alert("Please Enter Valid inputs", " persom age shuld be from 0 to 99 ", [{ text: "ok", style: "cancel" }])
                        result = false
                    }
                }
             }
        }
        return result
    }

    const checkdatacompleted = () => {
        return check(partenersList, !!hasPartener) && check(sonsList, hasSons) && check(servantsList, hasServant) && check(driversList, hasDriver)
    }

    const { navigation } = props
    useEffect(
        () => {
            navigation.addListener('beforeRemove', (e) => {
                if (checkdatacompleted()) {
                    return;
                }
                e.preventDefault();
            })
        },
        [navigation]
    )





    return (
        <PaperProvider theme={theme}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: "white", minHeight: Dimensions.get("window").height, minWidth: Dimensions.get("window").width }}>
                    <Header text={strings("signUpText")} title={strings("newRegistration")} navigation={props.navigation} />
                    {props.route.params.hasPartener && <View style={{...styles.itemContainer,paddingTop:30}}>
                        <View style={styles.itemContent}>
                            <TouchableOpacity activeOpacity={.7} style={styles.item} onPress={() => {
                                setVisible(c => !c)
                                setVisible2(false)
                                setVisible3(false)
                                setVisible4(false)
                            }}>
                                <View style={styles.imageTextContainer}>
                                    <Image style={styles.image} source={require("../../assets/wifess.png")} />
                                    <Text style={styles.text}>{props.route.params.gender === "male" ? "Wife Data" : "Husband Data"}</Text>
                                </View>
                                {!visible ? <Octicons name="triangle-down" size={20} style={{ marginEnd: 10, }} color="#7794ab" /> : <Octicons name="triangle-up" size={20} style={{ margin: 10 }} color="#7794ab" />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            {visible && <FamilyDataItem
                                boxTitle={props.route.params.gender === "male" ? "Wives Numbers" : "Husband Numbers"}
                                personsNumber={props.route.gender === "female" ? 1 : 4}
                                gender={props.route.params.gender}
                                list={partenersList}
                                personType="parteners"
                                text={props.route.params.gender === "male" ? "Wife" : "Husband"}
                                updateListHandler={updateListHandler}
                            />}
                        </View>
                    </View>}
                    {props.route.params.hasSons && <View style={styles.itemContainer}>
                        <View style={styles.itemContent}>
                            <TouchableOpacity activeOpacity={.7} style={styles.item} onPress={() => {
                                setVisible(false)
                                setVisible2(c => !c)
                                setVisible3(false)
                                setVisible4(false)
                            }}>
                                <View style={styles.imageTextContainer}>
                                    <Image style={styles.image} source={require("../../assets/sonss.png")} />
                                    <Text style={styles.text}>Sons Data</Text>
                                </View>
                                {!visible2 ? <Octicons name="triangle-down" size={20} style={{ marginEnd: 10, }} color="#7794ab" /> : <Octicons name="triangle-up" size={20} style={{ margin: 10 }} color="#7794ab" />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            {visible2 && <FamilyDataItem
                                boxTitle="Sons Numbers"
                                personsNumber={10}
                                list={sonsList}
                                personType="Sons"
                                text="Son"
                                updateListHandler={updateListHandler}
                            />}
                        </View>
                    </View>}
                    {props.route.params.hasServant && <View style={styles.itemContainer}>
                        <View style={styles.itemContent}>
                            <TouchableOpacity activeOpacity={.7} style={styles.item} onPress={() => {
                                setVisible(false)
                                setVisible2(false)
                                setVisible3(c => !c)
                                setVisible4(false)
                            }}>
                                <View style={styles.imageTextContainer}>
                                    <Image style={styles.image} source={require("../../assets/maids.png")} />
                                    <Text style={styles.text}>Servant Data</Text>
                                </View>
                                {!visible3 ? <Octicons name="triangle-down" size={20} style={{ marginEnd: 10, }} color="#7794ab" /> : <Octicons name="triangle-up" size={20} style={{ margin: 10 }} color="#7794ab" />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            {visible3 && <FamilyDataItem
                                boxTitle="Servant Numbers"
                                personsNumber={10}
                                list={servantsList}
                                personType="Servants"
                                text="Servant"
                                updateListHandler={updateListHandler}
                            />}
                        </View>
                    </View>}
                    {props.route.params.hasDriver && <View style={styles.itemContainer}>
                        <View style={styles.itemContent}>
                            <TouchableOpacity activeOpacity={.7} style={styles.item} onPress={() => {
                                setVisible(false)
                                setVisible2(false)
                                setVisible3(false)
                                setVisible4(c => !c)
                            }}>
                                <View style={styles.imageTextContainer}>
                                    <Image style={styles.image} source={require("../../assets/driver.png")} />
                                    <Text style={styles.text}>Driver Data</Text>
                                </View>
                                {!visible4 ? <Octicons name="triangle-down" size={20} style={{ marginEnd: 10, }} color="#7794ab" /> : <Octicons name="triangle-up" size={20} style={{ margin: 10 }} color="#7794ab" text="Driver" />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            {visible4 && <FamilyDataItem
                                boxTitle="Drivers Numbers"
                                personsNumber={10}
                                list={driversList}
                                personType="Drivers"
                                text="Driver"
                                updateListHandler={updateListHandler}
                            />}
                        </View>
                    </View>}
                </View>
            </ScrollView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    dataItem: {
        width: "40%",
        height: 150, justifyContent: "center",
        alignItems: "center",
        margin: 5,
        backgroundColor: "#cce8ff"
    },
    title: {
        color: "blue",
        fontSize: 20,
        fontWeight: "700"
    },
    itemContainer: {
        width: "100%",
        backgroundColor: '#f6f6f6',
        backgroundColor: "white",
        alignItems: "flex-start",
        alignItems: "center",
        justifyContent: "center",

    },
    itemContent: {
        width: "90%",
        height: 55,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "black",
        backgroundColor: 'white',
        shadowColor: 'rgba(0,0,0,.1)',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.01,
        borderRadius: 5,
        elevation: 5,
        marginBottom: 10,


    },
    item: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10


    },
    image: {
        width: 40,
        height: 40,
        marginEnd: 5
    },
    text: {
        fontSize: 18,
        fontWeight: "600"
    },
    imageTextContainer: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }


})

export default FamilyDataScreen

