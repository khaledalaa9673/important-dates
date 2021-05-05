import React, { useEffect, useState } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen"
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen"
import SignUpScreen from "../screens/SignUpScreen"
import HomeScreen from "../screens/HomeScreen"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AddInfoScreen from "../screens/AddInfoScreen"
import DataListScreen from "../screens/DataListScreen"
import passwordResetScreen from "../screens/passwordResetScreen"
import { useSelector, useDispatch } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from "../store/AuthActons";
import { ActivityIndicator, Image, View, SafeAreaView, Text, Button, StyleSheet, Switch, BackHandler, ScrollView, TouchableOpacity } from "react-native";
import PersonalDatesScreen from "../screens/PersonalDatesScreen"
import EditPersonalDatesScreen from "../screens/EditPersonalDatesScreen"
import WifeScreen from "../screens/WifeScreen"
import EditWifeScreen from "../screens/EditWifeScreen"
import SonsScreen from "../screens/SonsScreen"
import EditSonsScreen from "../screens/EditSonsScreen"
import DriverScreen from "../screens/DriverScreen"
import EditDriverScreen from "../screens/EditDriverScreen"
import ServantScreen from "../screens/ServantScreen"
import EditServantScreen from "../screens/EditServantScreen"
import CalendarScreen from "../screens/CalendarScreen"
import PersonalScreen from "../screens/PersonalScreen"
import EditPersonalScreen from "../screens/EditPersonalScreen"
import SettingScreen from "../screens/SettingScreen"
import NotaficationScreen from "../screens/NotaficationScreen"
import FamilyDataScreen from "../screens/FamilyDataScreen"
import { Checkbox } from 'react-native-paper'
import { strings, setLocale, getCurrentLocale, } from "../i18n/i18n"
import { Restart } from 'fiction-expo-restart';
import { logOut } from "../store/AuthActons"
 




const AuthStack = createStackNavigator()


const AuthNavigatior = () => {
  return (<AuthStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <AuthStack.Screen name="passwordResetScreen" component={passwordResetScreen} />
    <AuthStack.Screen name="FamilyDataScreen" component={FamilyDataScreen} />
  </AuthStack.Navigator>
  )
}

const HomeStack = createStackNavigator()
const HomeStackNavigator = (props) => {

  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DataListScreen" component={DataListScreen} />
      <HomeStack.Screen name="AddInfoScreen" component={AddInfoScreen} />
       <HomeStack.Screen name="CalendarScreen" component={CalendarScreen} />



    </HomeStack.Navigator>
  )
}
const PersonalDatesStack = createStackNavigator()
const PersonalDatesStackNavigator = () => {
  return (
    <PersonalDatesStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <PersonalDatesStack.Screen name="PersonalDatesScreen" component={PersonalDatesScreen} />
      <PersonalDatesStack.Screen name="EditPersonalDataScreen" component={EditPersonalDatesScreen} />
    </PersonalDatesStack.Navigator>
  )
}
const WifeStack = createStackNavigator()
const WifeStackNavigator = () => {
  return (
    <WifeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <WifeStack.Screen name="WifeScreen" component={WifeScreen} />
      <WifeStack.Screen name="EditWifeScreen" component={EditWifeScreen} />
    </WifeStack.Navigator>
  )
}
const SonsStack = createStackNavigator()
const SonsStackNavigator = () => {
  return (
    <SonsStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <SonsStack.Screen name="SonsScreen" component={SonsScreen} />
      <SonsStack.Screen name="EditSonsScreen" component={EditSonsScreen} />
    </SonsStack.Navigator>
  )
}
const ServantStack = createStackNavigator()
const ServantStackNavigator = () => {
  return (
    <ServantStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ServantStack.Screen name="ServantScreen" component={ServantScreen} />
      <ServantStack.Screen name="EditServantScreen" component={EditServantScreen} />
    </ServantStack.Navigator>
  )
}
const DriverStack = createStackNavigator()
const DriverStackNavigator = () => {
  return (
    <DriverStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <DriverStack.Screen name="DriverScreen" component={DriverScreen} />
      <DriverStack.Screen name="EditDriverScreen" component={EditDriverScreen} />
    </DriverStack.Navigator>
  )
}

const PersonalStack = createStackNavigator()
const PersonalStackNavigator = () => {
  return (
    <PersonalStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <PersonalStack.Screen name="PersonalScreen" component={PersonalScreen} />
      <PersonalStack.Screen name="EditPersonalScreen" component={EditPersonalScreen} />
      <PersonalStack.Screen name="passwordResetScreen" component={passwordResetScreen} />

    </PersonalStack.Navigator>
  )
}



const Drawer = createDrawerNavigator();
function AppDrawer() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasDriver, setHasDriver] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const logOutHandler = () => {
    dispatch(logOut())
  }

  return (
    <Drawer.Navigator screenOptions={{}}


      drawerContent={props => {
        const { state, navigation } = props;
        const { routes, index } = state;
        const focusedRoute = routes[index].name;

        return (

          <View style={{ flex: 1 }}>
            <DrawerContentScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
       paddingTop: 0,
    }} {...props}   >
              <View style={{ width: "100%", height: 100, backgroundColor: "#068fff", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, paddingHorizontal: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Image style={{ width: 50, height: 50, marginEnd: 10 }} source={require("../../assets/User-Profile.png")} />
                <View>
                  <Text style={{ fontWeight: "600", fontSize: 18,color:"white", }}>{user["user_name "]}</Text>
                  <Text  style={{color:"white"}} >{user["email"]}</Text>
                </View>
              </View>

              <DrawerItem
                label={strings("home")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/home.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'Home' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('Home')}
              style={{marginBottom:-10}}
              />
              <DrawerItem
                label={strings("personal_dates")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/side_mydata.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'PersonalDates' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('PersonalDates')}
                style={{marginBottom:-10}}

              />
              <DrawerItem
                label={strings("wife_dates")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/side_wifesdata.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'WifeData' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('WifeData')}
                style={{marginBottom:-10}}

              />
              <DrawerItem
                label={strings("sons_dates")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/side_sonsdata.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'SonsDates' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('SonsDates')}
                style={{marginBottom:-10}}

              />
              <DrawerItem
                label={strings("servant_dates")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/side_maidsdata.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'ServantDates' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('ServantDates')}
                style={{marginBottom:-10}}

              />
              <DrawerItem
                label={strings("driver_dates")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/driver_side.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'DriverDates' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('DriverDates')}
 
              />
              <View style={{ borderBottomColor: "rgba(0,0,0,.1)", borderBottomWidth: 1, width: "100%" }}></View>

              <DrawerItem
                label={strings("calendar")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/side_valendar.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'Calendar' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('Calendar')}
                style={{marginBottom:-10}}

              />
              <DrawerItem
                label={strings("personal_page")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/user.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'Personal' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('Personal')}
                style={{marginBottom:-10}}

              />
              <DrawerItem
                label={strings("account_setting")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/side_settings.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color: focusedRoute === 'Settings' ? "blue" : "black"
                  }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() => navigation.navigate('Settings')}
                style={{marginBottom:-10}}

              />
              <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ width: "80%" }}>
                  <DrawerItem
                    label={strings("notafications")}
                    icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/notifications.png")} />}
                    labelStyle={

                      {
                        fontSize: 16,
                        marginHorizontal: -15,
                        color: focusedRoute === 'Notafication' ? "blue" : "black"
                      }
                    }
                    activeBackgroundColor="red"
                    // inactiveBackgroundColor="#eeee"
                    onPress={() => navigation.navigate('Notafication')}
 
                  />
                </View>

                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor="#f4f3f4"
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />

              </View>
              <View style={{ borderBottomColor: "rgba(0,0,0,.1)", borderBottomWidth: 1, width: "100%" }}></View>


              <View style={{ width: "100%", marginTop: 1,paddingTop:10, paddingHorizontal: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Checkbox
                  status={hasDriver ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setHasDriver(!hasDriver);
                  }}
                />
                <Text style={styles.checkboxText} >{strings("myNotafication")}</Text></View>
              <View style={{ width: "100%", marginTop: 1, paddingHorizontal: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Checkbox
                  status={hasDriver ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setHasDriver(!hasDriver);
                  }}
                  color="blue"

                  uncheckedColor="red"
                /><Text  style={styles.checkboxText}>{strings("wifeNotafication")}</Text></View>
              <View style={{ width: "100%", marginTop: 1, paddingHorizontal: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Checkbox
                  status={hasDriver ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setHasDriver(!hasDriver);
                  }}
                /><Text  style={styles.checkboxText} >{strings("sonsNotafication")}</Text></View>
              <View style={{ width: "100%", marginTop: 1, paddingHorizontal: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Checkbox
                  status={hasDriver ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setHasDriver(!hasDriver);
                  }}
                /><Text  style={styles.checkboxText}>{strings("servantNotafication")}</Text></View>
              <View style={{ width: "100%", marginTop: 1, paddingHorizontal: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Checkbox
                  status={hasDriver ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setHasDriver(!hasDriver);

                  }}
                  color="yellow"
                  style={{ borderColor: "red" }}
                /><Text style={styles.checkboxText} >{strings("driverNotafication")}</Text></View>
                              <View style={{ borderBottomColor: "rgba(0,0,0,.1)", borderBottomWidth: 1, width: "100%" }}></View>

                <DrawerItem
                label={strings("logout")}
                icon={() => <Image style={{ width: 20, height: 20 }} source={require("../../assets/quit.png")} />}
                labelStyle={

                  {
                    fontSize: 16,
                    marginHorizontal: -15,
                    color:"black"
                   }
                }
                activeBackgroundColor="red"
                // inactiveBackgroundColor="#eeee"
                onPress={() =>logOutHandler()}
                style={{marginBottom:10}}

              />

            </DrawerContentScrollView>
          </View>

        );
      }}

    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} options={{
        drawerLabel: "Home",
       }} />
      <Drawer.Screen name="PersonalDates" component={PersonalDatesStackNavigator} options={{
        drawerLabel: "Personal Dates",
 
      }} />
      <Drawer.Screen name="WifeData" component={WifeStackNavigator} options={{
        drawerLabel: "Wife Data",
 
      }} />
      <Drawer.Screen name="SonsDates" component={SonsStackNavigator} options={{
        drawerLabel: "Sons Dates",
 
      }} />
      <Drawer.Screen name="ServantDates" component={ServantStackNavigator} options={{
        drawerLabel: "Servant Dates",
 
      }} />
      <Drawer.Screen name="DriverDates" component={DriverStackNavigator} options={{
        drawerLabel: "Driver Dates",
 
      }} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} options={{
        drawerLabel: "Calendar",
 
      }} />
      <Drawer.Screen name="Personal" component={PersonalStackNavigator} options={{
        drawerLabel: "personal page",
 
      }} />
      <Drawer.Screen name="Settings" component={SettingScreen} options={{
        drawerLabel: "Account settings",
 
      }} />
      <Drawer.Screen name="Notafication" component={NotaficationScreen} options={{
        drawerLabel: "Notafication",
 
      }} />
    </Drawer.Navigator>
  );
}


const AppNavigatior = () => {

  const auth = useSelector(state => !!state.Auth.token)
    const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const getData = async () => {
     setLoading(true)
    try {
      const token = await AsyncStorage.getItem("token")
      const userStored = await AsyncStorage.getItem("user")
      const user = await JSON.parse(userStored)


     await dispatch(authenticate(token, user))
      setLoading(false)

    } catch (error) {

      setLoading(false)

    }

  }




  useEffect(() => {
    console.log(getCurrentLocale())
    getData()

  }, [])
  if (loading  ) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="blue" size="large" />
    </View>
  }

  return (
    <NavigationContainer>
      {!auth && <AuthNavigatior />}
      {auth && <AppDrawer />}
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  image: {
    width: 18,
    height: 18,
    marginEnd: 10
  },
  checkboxText:{
fontSize:16
  }
})

export default AppNavigatior

 