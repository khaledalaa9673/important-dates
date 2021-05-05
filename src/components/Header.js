import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from "react-native"

const Header = (props) => {

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={require("../../assets/top_header.png")}>
                <View style={styles.backButton}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Image style={styles.image} source={require("../../assets/back.png")} />
                    </TouchableOpacity><Text style={styles.title}>{props.title}</Text>
                </View>
                {props.text && <View style={styles.textContainer}>
                    <Text style={styles.text} numberOfLines={2}>
                        {props.text}
                    </Text>
                </View>}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: Dimensions.get("window").height * .25
    },
    background: {
        width: "100%",
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    backButton: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        width: "90%",
        paddingHorizontal: 15,
        marginBottom: 5
    },
    image: {
        width: 30,
        height: 30
    },
    title: {
        color: "white",
        fontSize: 22,
        marginHorizontal: 10
    },
    text: {
        fontSize: 20,
        justifyContent: "flex-end"
    }

})

export default Header