import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigatior from "./src/navigation/AppNavigation"
import { createStore, combineReducers, applyMiddleware } from "redux"
import Thunk from "redux-thunk"
import { Provider } from "react-redux"
import authReducer from "./src/store/AuthReducer"
 
 
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
 
const rootReducer = combineReducers({
  Auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppNavigatior />
      </Provider>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
