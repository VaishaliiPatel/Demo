import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { Alert, Button, Image, Text } from 'react-native';
import AddUser from './AddUserScreen/AddUser';
const Stack = createStackNavigator()

export default class Container extends Component {
    navigationRef: any;
    constructor(props: any) {
        super(props)

        this.state = {

        };
        this.navigationRef = React.createRef();
    };
    
    render() {
        return (
            <NavigationContainer ref={this.navigationRef}>
                <Stack.Navigator initialRouteName={"AddUser"} screenOptions={{
                    headerStyle: {
                        backgroundColor: '#436EEE',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} >
                    <Stack.Screen
                        component={HomeScreen}
                        name="HomeScreen" />
                    <Stack.Screen
                        component={AddUser}
                        name="AddUser" />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

