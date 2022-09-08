import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Images, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Image, Input, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'
import bgImage from '../assets/Images/Login.gif'
import bgImageAnimation from '../assets/Images/loginanimation.gif'

import ForgotPassword from './ForgotPassword'
import AlertBox from './AlertBox';





function LoginScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loader, setLoader] = useState(true);
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
    const [modalHeader, setModalHeader] = useState('')
    const [modalMessage, setModalMessage] = useState('')
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)




    useEffect(() => {
        setLoader(true)
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home')
            }
        })
        setLoader(false)
        return unsubscribe;

    })

    const toggleModal = (val) => {
        setIsAlertModalVisible(false)
    }

    const onForgotPasswordClick = () => {
        setIsPasswordModalVisible(true);
    }

    const forgotPassword = (useremail) => {
        setIsPasswordModalVisible(false)
        auth.sendPasswordResetEmail(useremail).then(() => {
            setModalMessage('Password reset link has been sent to your registered emailid')
            setModalHeader('RESET PASSWORD')
            setIsAlertModalVisible(true)


        }).catch((error) => {
            setModalMessage(error.message)
            setModalHeader('RESET PASSWORD')
            setIsAlertModalVisible(true)
        })
    }

    const login = () => {
        auth
            .signInWithEmailAndPassword(userName, userPassword)
            .then(() => {
                setLoader(false);
                navigation.replace('Home')
            })
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode == 'auth/weak-password' || errorCode == 'auth/user-not-found') {
                    alert('User/Password is wrong or user is not registered')
                }
                else {
                    alert(error)
                }

            });
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '100%' }}>
                <ImageBackground
                    style={{
                        width: '100%', height: '100%', alignItems: 'center', zIndex: 11, position: 'absolute',
                        // left: 0,
                        // top: 0,
                        // width: Dimensions.get('window').width,
                        //  height: '100%', 
                    }}
                     source={bgImage}
                    resizeMode={'stretch'}
                    resizeMethod={'scale'}
                >

                    <View style={{ flexDirection: 'row',marginRight: '50%'}}>
                            <Text style={{ marginTop: '25%', fontSize: 37, fontWeight: "bold" }} >Welcome! </Text>
                                                 
                    </View>
                    <Text style={{  fontWeight: "bold", justifyContent:"space-between",marginLeft: '15%' }} >A simple, magical way to connect with people....  </Text>   
                    
                    <View style={{ height: '80%', width: '100%', backgroundColor: '#4891b1', 
                    alignItems: 'center', justifyContent: 'center', marginTop: '40%', borderRadius: 80, 
                    borderWidth: 2, borderColor: 'black' }}>
                        <StatusBar style='light'></StatusBar>
                        <View style={{ width: '80%', height:'30%', alignItems: 'center',marginTop:'10%'}}>
                            {/* <AlertBox modalVisible={modalVisible} message={modalMessage}></AlertBox> */}
                            <View style={{ paddingBottom: 15, width: '100%' }}>
                                <TextInput style={styles.inputbox}
                                    placeholder="Email"
                                    placeholderTextColor="white"
                                    type="email"
                                    autofocus
                                    value={userName}
                                    onChangeText={(text) => setUserName(text)} />
                            </View>
                            <View style={{ paddingBottom: 15, width: '100%' }}>
                                <TextInput style={styles.inputbox}
                                    placeholder="Password"
                                    placeholderTextColor="white"
                                    type="password"
                                    autofocus
                                    secureTextEntry
                                    value={userPassword}
                                    onChangeText={(text) => setUserPassword(text)} />
                            </View>
                            <View style={{ width: '30%', height: '20%', marginLeft: '65%' }}>
                                <Button color='#26a9e1' title="LOGIN" onPress={login} />

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ marginBottom: 5, padding: 5, marginRight: 10 }} onPress={() => { navigation.navigate('Register') }}>

                                    <Text style={{ textDecorationLine: 'underline' }} >Register yourself</Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginBottom: 5, padding: 5, marginLeft: 10 }} onPress={onForgotPasswordClick}>

                                    <Text style={{ textDecorationLine: 'underline' }} >Forgot password</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                        <ImageBackground
                        style={{ width: '100%', height:'60%'}}
                        source={bgImageAnimation}
                        /> 
                     
                    </View>
                </ImageBackground>
                {isPasswordModalVisible && <ForgotPassword forgotPassword={forgotPassword} />}
                {isAlertModalVisible && <AlertBox message={modalMessage} header={modalHeader} toggleModal={toggleModal} />}


                {/* <Loader></Loader> */}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '100%',
        // height: '100%'
    },
    inputbox: {
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        height: 45,
        // backgroundColor: '#383838',
        backgroundColor: '#4891b1',
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'white'

    },
    loginbutton: {
        backgroundColor: "red"
    }
});



export default LoginScreen