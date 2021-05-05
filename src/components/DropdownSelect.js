import React  from "react"
import { 
    View, 
    Text, 
    StyleSheet 
} from "react-native"
 


const DropdownSelect = (props) => {
   
    return (

        <View style={{height:50,backgroundColor:"blue",width:props.width,position:"relative",flexDirection:"row",justifyContent:"flex-start",borderWidth:.7,borderColor:"rgba(116,147,174,.5)",borderRadius:5,backgroundColor:"white"}} >
            <View style={{position:"absolute",backgroundColor:"white",top:-11,left:20,zIndex:10,paddingHorizontal:5}}><Text style={{fontWeight:"700",fontSize:14,color:"black"}}    >{props.title ? props.title:props.placeholder}</Text></View>
             {props.children}

        </View>
    )
}

const styles = StyleSheet.create({

})

export default DropdownSelect
 