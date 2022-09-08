import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button,SafeAreaView, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import Loader from './Loader'
// import AlertBox from './AlertBox'
import bgImage from '../assets/Images/chatbg.png'
import logo from '../assets/Images/Logo.png'
import { Ionicons } from '@expo/vector-icons';
import ChatCard from './ChatCard'
import AddChatIcon from '../assets/Images/Addchat.gif'
import { db, auth } from '../firebase'
import { StatusBar } from 'expo-status-bar'
import {  Avatar } from 'react-native-elements'
import AlertBox from './AlertBox'








const HomeScreen = ({ navigation }) => {
    const [searchIconVisible, SetSearchIconVisible] = useState(true)
    const [searchBoxVisible, SetSearchBoxVisible] = useState(false)
    const [chats, setChats] = useState([])
    const [filteredChat, setFilteredChat] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState(auth.currentUser.photoURL)
    

    useEffect(() => {
        const unsubscribe = db.collection('chats').where("chatmember","array-contains",auth.currentUser.uid).onSnapshot((snapshot) => {
            setChats(
                snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data()
                    }

                ))
            )
                // }
        })

    const userId = auth.currentUser.uid;

    //  const reference = db.ref(`/online/${userId}`);

    // // Set the /users/:userId value to true
    //  reference.set(true).then(() => alert('Online presence set'));

    // // Remove the node whenever the client disconnects
    // reference
    //   .onDisconnect()
    //   .remove()
    //   .then(() => alert('On disconnect function configured.'));

        //setFilteredChat(chats.filter(chat => chat.id.includes(auth.currentUser.uid)));
        return unsubscribe

    }, [])
        


    const enterChat = (id, chatName,profilephoto) => {
        navigation.navigate('Chat', {
            id, chatName, profilephoto
        })
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{ width: '100%', height: '100%', alignItems: 'center', zIndex: 11 }}
                source={bgImage}
                resizeMode={'stretch'}
                resizeMethod={'scale'}
            >
                <StatusBar style='light'></StatusBar>

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', height: '70%', marginTop: '8%',marginBottom: '3%'}}>
                        <TouchableOpacity style={{ height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                            {searchIconVisible && <Ionicons name="search" size={25} color="black" onPress={() => { SetSearchBoxVisible(true), SetSearchIconVisible(false) }} />}

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { alert('logo clicked') }} style={{ height: '100%', width: '20%' }} >
                            <Image onPress={() => { alert('logo clicked') }}
                                style={{ width: '100%', height: '100%', }}
                                source={logo}
                                resizeMode={'contain'}
                                resizeMethod={'scale'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddChat') }} style={{ height: '100%', width: '15%',marginLeft:'5%' }} >
                            <Image
                                style={{ width: '100%', height: '100%', }}
                                source={AddChatIcon}
                                resizeMode={'contain'}
                                resizeMethod={'scale'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Profile'), alert(auth.currentUser.photoURL)}} style={{height: '80%', width: '15%', marginTop: '6%', paddingRight: '4%' }}>
                            <Avatar
                                rounded
                                source={{uri:auth.currentUser.photoURL}}
                            />

                        </TouchableOpacity>

                    </View>
                    <View style={{width: '50%', height: '30%',marginTop:'-5%', marginLeft:'25%' }}>
                        
                        { searchBoxVisible &&   <TextInput

                                style={styles.inputbox} />}
                        
                    </View>
                </View>
                <View style={{ width: '95%',flex: 1,height: '100%',marginTop:'8%' }}>
                  <ScrollView>
                        {chats.map(({ id, data }) => (
                            <ChatCard key={id} id={id} data={data} enterChat={enterChat} />))}
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    inputbox: {
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        height: '100%',
        backgroundColor: '#383838',
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'white'

    },
    shadowbox: {
        flexDirection: 'row',
        // backgroundColor:'#d9d9d9',
        shadowColor: "black",
        shadowOpacity: 0.8,
        borderColor: 'black',
        borderWidth: 2,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        },
        backgroundColor: '#111111',
        height: 70,
        width: '90%',
        marginLeft: "5%",
        borderRadius: 20

    },
    header: {
        backgroundColor: '#4891b1',
        height: '15%',
        width: '100%',
        borderBottomEndRadius: 70,
        borderBottomLeftRadius: 70,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    }
});

export default HomeScreen