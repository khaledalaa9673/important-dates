import AsyncStorage from '@react-native-async-storage/async-storage'
export const  LANGUAGE_KEY ="LANGUAGE_KEY"

export  const getData=(key)=>{
    return  AsyncStorage.getItem(key)
   

 }