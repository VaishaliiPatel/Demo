import React, { Component } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addUser, deleteUser, upadteUser } from '../../store/AddUser/actions';
import { RequestUpdateUserData, RequestUserData, UserState } from '../../store/AddUser/types';
import { isNull, RegEx } from '../../utils/validators';
import { RNCamera } from 'react-native-camera';
import { images } from '../../theme/images';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';

interface Props {
    navigation: any;
    UserState: UserState,
    addUser: typeof addUser;
    deleteUser: typeof deleteUser;
    updateUser: typeof upadteUser;
}
interface State {
    Name: string,
    UserList: any[],
    Mobile: string,
    isEdit: boolean,
    index: number,
    search: string,
    searchList: any[]
}
class AddUser extends Component<Props, State> {
    camera: any;

    constructor(props: any) {
        super(props)
        this.state = {
            Name: '', UserList: [], Mobile: '', isEdit: false, index: -1, search: '', searchList: []
        };
        this.onAddUserData = this.onAddUserData.bind(this)
    };
    componentDidMount() {
        if (this.props && this.props.UserState && this.props.UserState.users) {
            this.setState({ UserList: this.props.UserState.users })
        }
    }

    onAddUserData = () => {
        if (this.state.Mobile.length !== 10) {
            Alert.alert("Please Enter Valid Mobile")
            return;
        }
        if (isNull(this.state.Name)) {
            Alert.alert("Please enter user name")
            return;
        }
        if (this.state.UserList && this.state.UserList.length > 0) {
            if (this.state.UserList.filter((user: any) => { return user.Mobile == this.state.Mobile }).length > 0) {
                Alert.alert("User already added!")
            }
            else {
                this.props.addUser({
                    Name: this.state.Name,
                    ImageURL: '',
                    Mobile: this.state.Mobile
                })
                this.setState({
                    Name: '', Mobile: ''
                })
            }
        }
        else {
            this.props.addUser({
                Name: this.state.Name,
                ImageURL: '',
                Mobile: this.state.Mobile
            })
            // this.setState({
            //     Name: '', Mobile: ''
            // })
        }
        // this.props.navigation.navigate("HomeScreen")
    }
    componentDidUpdate(prevProps: any, prevState: State) {
        if (this.props !== prevProps) {
            if (this.props.UserState !== prevProps.UserState) {
                this.setState({ UserList: this.props.UserState.users })
            }
        }
    }
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };
    onPressUpadte = () => {
        this.props.updateUser({
            Name: this.state.Name,
            ImageURL: '',
            Mobile: this.state.Mobile,
            Index: this.state.index
        })
        this.setState({
            Mobile: '',
            isEdit: false,
            Name: '',
        })
    }
    onPressSearch = () => {
        const data = _.filter(this.state.UserList, (text) => {
            return text.Name.toLowerCase().includes(this.state.search.toLowerCase());
        })
        this.setState({
            searchList: data
        })
        console.log("D Search ata", data)
    }
    renderUsers = (user: any, index: any) => {
        return (
            <View style={{ flexDirection: 'row', flex: 1, marginTop: 10, marginLeft: 15, marginRight: 15, backgroundColor: '#fff', height: 70 }}>

                <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        height: 60, width: 60, backgroundColor: '#bababa', borderRadius: 30,
                    }}>
                    </View>
                </View>
                <View style={{ flex: 0.55, alignSelf: 'center', }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{user.Name}</Text>
                </View>
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            Mobile: user.Mobile,
                            Name: user.Name,
                            isEdit: true,
                            index: index
                        })
                    }}>
                        <Image source={images.Edit} style={{ height: 20, width: 20 }}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        this.props.deleteUser(user.Mobile)
                    }}>
                        <Image source={images.Delete} style={{ height: 20, width: 20 }}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.1, marginLeft: 15, marginRight: 15, flexDirection: 'row' }}>
                        <View style={{ flex: 0.9 }}>
                            <Input
                                value={this.state.search}
                                placeholder="Search Here"
                                onChange={(e) => {
                                    this.setState({ search: e.nativeEvent.text })
                                }}
                                
                                style={{
                                    height: 40,
                                    // borderWidth: 1,
                                    paddingLeft: 20,
                                    // borderColor: '#009688',
                                    backgroundColor: '#FFFFFF',
                                    marginTop: 10
                                }}
                            // rightIcon={<View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 30 }}>
                            //     <Image source={images.Search} style={{height: 25, width: 25, marginLeft: 10,backgroundColor:'#FBFBF8'}}></Image>
                            // </View>}
                            >
                            </Input>
                        </View>
                        <View style={{ flex: 0.1, backgroundColor: '#fff', height: 40, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.onPressSearch() }}>
                                <Image source={images.Search} style={{ height: 25, width: 25, backgroundColor: '#FBFBF8' }}></Image>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {this.state.searchList && this.state.searchList.length > 0 &&
                        <View style={{ flex: 0.3 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.searchList}
                                renderItem={({ item, index }) => this.renderUsers(item, index)}
                            ></FlatList>
                        </View>}
                    <View style={{
                        backgroundColor: '#ffffff', marginLeft: 20, marginRight: 20, borderRadius: 8,
                        flex: 0.25, marginTop: 10
                    }}>
                        <Input placeholder={"Enter Mobile"} disabled={this.state.isEdit} maxLength={10} value={this.state.Mobile} onChange={(e) => {
                            const regEx = RegEx.mobile;
                            if (regEx.test(e.nativeEvent.text)) {
                                Alert.alert("Enter Only Numbers")
                            }
                            else {
                                this.setState({
                                    Mobile: (e.nativeEvent.text).trim(),
                                });
                            }
                        }}>
                        </Input>
                        <Input placeholder={'Enter Name'} value={this.state.Name} style={{ borderBottomColor: '#737373', }} onChange={(e) => {
                            this.setState({
                                Name: e.nativeEvent.text
                            })
                        }}>
                        </Input>
                    </View>
                    {
                        !this.state.isEdit ?
                            <View style={{ marginTop: 20, width: 50, alignSelf: 'center', flex: 0.1 }}>
                                <Button title={"ADD"} onPress={() => { this.onAddUserData() }}>
                                </Button>
                            </View> :
                            <View style={{ marginTop: 20, width: 100, alignSelf: 'center', flex: 0.1 }}>
                                <Button title={"Update"} onPress={() => { this.onPressUpadte() }}>
                                </Button>
                            </View>
                    }
                    <View style={{ flex: 0.55 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.UserList}
                            renderItem={({ item, index }) => this.renderUsers(item, index)}
                        ></FlatList>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = (state: any) => ({
    UserState: state
});
const mapDispatchToProps = (dispatch: any) => ({
    addUser: (request: RequestUserData) => {
        dispatch(addUser(request))
    },
    deleteUser: (request: any) => {
        dispatch(deleteUser(request))
    },
    updateUser: (request: RequestUpdateUserData) => {
        dispatch(upadteUser(request))
    }

});
export default connect(mapStateToProps, mapDispatchToProps)(AddUser)
