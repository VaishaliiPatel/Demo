import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { UserState } from '../store/AddUser/types';

interface Props {
    navigation: any,
    UsreState: UserState;
}
interface State {
    Users: any[]
}
export default class HomeScreen extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            Users: []
        };
    };
    
    componentDidMount() {
        console.log("innapp---------------------------------",this.props.UsreState)
        if (this.props && this.props.UsreState && this.props.UsreState.users) {
            this.setState({
                Users: this.props.UsreState.users
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                <ScrollView style={{ flex: 0.9, backgroundColor: '#bababa', marginBottom: 20, }} showsVerticalScrollIndicator={false}>
                    <View>
                        {
                            this.state.Users.length === 0 ? <Text>No User</Text> :
                                <View>
                                    <Text>User</Text>
                                </View>
                        }
                    </View>
                </ScrollView>
                <View style={{ width: 150, alignSelf: 'center', flex: 0.1 }}>
                    <Button title={"Add User"} onPress={() => { this.props.navigation.replace("AddUser") }} >

                    </Button>
                </View>
            </View>
        )
    }
}
