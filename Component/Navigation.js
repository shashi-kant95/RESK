
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import AddChatScreen from './AddChatScreen'
import ChatScreen from './ChatScreen'
import RegisterScreen from './RegisterScreen'
import ProfileScreen from './ProfileScreen'
import AlertBox from './AlertBox'


const Navigation = () => {

    const Stack = createStackNavigator();

    const globalScreenOptions ={
        headerShown: false,
        //  headerStyle: {backgroundColor:'red'},
        //  headerTitleStyle: {color:'white',  alignSelf: 'center'},
        //  headerTintColor:'white'

    }
    return (
        <NavigationContainer >
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="Alert" component={AlertBox}/>



       


      </Stack.Navigator>
    </NavigationContainer>
    );


}


export default Navigation