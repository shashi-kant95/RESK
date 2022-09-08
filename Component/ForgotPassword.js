//React Native Modal
//https://aboutreact.com/react-native-modal/

//import React in our code
import React, { useState } from 'react';
import {TextInput} from 'react-native'

//import all the components we are going to use
import {
    Modal,
    Button,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

const ForgotPassword = ({ forgotPassword }) => {
    const [showModal, setShowModal] = useState(true);
    const [userEmail, setUserEmail] = useState('')

    const modalHideShow = () => {
        forgotPassword(userEmail)
        setShowModal(!showModal)
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={showModal}
                    opacity={0.2}
                    // transparent
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    {/*All views of Modal*/}
                    {/*Animation can be slide, slide, none*/}
                    <View style={styles.modal}>
                        <View style={styles.modalbody}>
                            
                            <View style={styles.modalmessagebody}>
                            <TextInput style={styles.inputbox}
                                    placeholder="Enter your email"
                                    placeholderTextColor="white"
                                    type="email"
                                    value={userEmail}
                                    onChangeText={(text) => setUserEmail(text)} />
                            </View>
                            <View style={styles.modalfooter}>
                                <Button color='#4891b1'
                                    title="SEND"
                                    onPress={modalHideShow}
                                />
                            </View>


                        </View>
                    </View>

                </Modal>
                {/*Button will change state to true and view will re-render*/}
                {/* <Button
          title="Click To Open Modal"
          onPress={() => {
            setShowModal(!showModal);
          }}
        /> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1',
        marginTop: 30,
        opacity: 0
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'black',
        padding: 40,
        justifyContent: 'center',



    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },
    modalbody: {
        backgroundColor: '#ffffff',
        width: '90%',
        // backgroundColor:'red',
        borderRadius: 15,
        borderColor: '#4891b1',
        borderWidth: 2
    },
    header: {
        borderColor: '#4891b1',
        borderBottomWidth: 2,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modalmessagebody: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff'

    },
    modalfooter: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10
    },
    inputbox: {
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        height: 45,
        // backgroundColor: '#383838',
        backgroundColor: '#383838',
        borderRadius: 3,
        paddingHorizontal: 10,
        color: 'white'
    }
});

export default ForgotPassword;