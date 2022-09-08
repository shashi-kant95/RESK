import React,{useState, useLayoutEffect,useRef} from 'react'
import { StyleSheet, Text,SafeAreaView,
     View, ImageBackground, TouchableOpacity, TextInput, ScrollView,KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar'


import bgImage from '../assets/Images/chatbg.png'
import logo from '../assets/Images/Logo.png'
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements'
import { Platform } from 'react-native';
import {db,auth} from '../firebase'
import * as firebase from 'firebase'

const ChatScreen = ({ navigation, route }) => {
    const [inputMessage, setInputMessage] = useState('')
    const [messages,setMessages]= useState([])
    const scrollViewRef = useRef();

    const sendMessage = () => {
        if (inputMessage.length > 0) {
            db.collection('chats').doc(route.params.id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: inputMessage,
                displayname: auth.currentUser.displayName,
                email: auth.currentUser.email,
                isSeen: false
            })
            setInputMessage('');
        }
    }

    useLayoutEffect(() => {
        const unsubscribe =db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((snapshot) => {setMessages(
            snapshot.docs.map(doc=>({
                id:doc.id, 
                data:doc.data()
            }))
        )})
        return unsubscribe;
    },[route])

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
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}  style={{height: '100%', width: '10%',alignItems:'center', flexDirection: 'row',marginLeft:'5%' }} >
                    <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { alert('logo clicke') }} style={{ height: '100%',alignItems:'center',justifyContent: 'center'}} >
                            <Avatar
                                rounded
                                source={{ uri: route.params.profilephoto }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center',marginLeft:"2%",width:"25%"}}>
                            <Text style={{ fontSize: 17 ,fontWeight:"bold" }}>{route.params.chatName}</Text>
                        </TouchableOpacity>
                        <View style={{marginLeft:'15%', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => { alert('audiocall clicke') }} style={{alignItems:'center',justifyContent:"center", padding:"5%"}}>
                        <Ionicons name="call" size={24} color="black" />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { alert('videocall clicke') }} style={{alignItems:'center',justifyContent:"center",  padding:"5%"}}>
                        <Ionicons name="videocam" size={28} color="black" />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { alert('option clicke') }} style={{alignItems:'center',justifyContent:"center",  padding:"4%"}}>
                        <Ionicons name="options" size={24} color="black" />

                        </TouchableOpacity>
                        </View>




                    </View>

                </View>

                <View style={styles.messageview}>
                    <KeyboardAvoidingView>

                        <ScrollView style={{marginTop:10}} ref={scrollViewRef }
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
    >
                        {/* ref={scrollViewRef} */}
                        {/* onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} */}
                            {messages.map((mess)=>(
                                mess.data.email===auth.currentUser.email ? 
                                ( 
                                <View key={mess.id} style={styles.sender}>
                                    {/* <Avatar
                                    position= 'absolute'
                                    rounded
                                    bottom={-9}
                                    right={2}
                                    size={15}
                                    containerStyle={{ position: 'absolute', bottom:-15,right:5}}
                                    source={{uri:auth.currentUser.photoURL}}
                                    /> */}
                                    <Text style={styles.sendertext}>{mess.data.message}</Text>
                                    <Text style={styles.sendertexttime}><Ionicons name="time-outline" size={11} color="black" />{new Date(mess.data.timestamp?.toDate()).toLocaleTimeString().substring(0, 5)}</Text>
                                    {/* <Text style={styles.sendertext}>{mess.data.timestamp.toDate()}</Text> */}

                                    
                                    {/* <Text style={styles.sendertextname}>{mess.data.email}</Text> */}
                                    {/* <Text style={styles.sendertextname}></Text> */}

                                
                                    

                                </View>
                                )
                                :
                                ( <View key={mess.id} style={styles.receiver}>
                                      {/* <Avatar
                                    position= 'absolute'
                                    rounded
                                    bottom={-9}
                                    left={2}
                                    size={15}
                                    containerStyle={{ position: 'absolute', bottom:-15,right:5}}
                                    source={{uri:'https://i.ibb.co/FDgPR7p/Capture.png'}}
                                    /> */}
                                    <Text style={styles.receivertext}>{mess.data.message}</Text>
                                    <Text style={styles.sendertexttime}><Ionicons name="time-outline" size={11} color="black" />{new Date(mess.data.timestamp?.toDate()).toLocaleTimeString().substring(0, 5)}</Text>
                                    {/* <Text style={styles.receivertexttime}>{new Date(mess.data.timestamp.seconds * 1000 + mess.data.timestamp.nanoseconds/1000000).toString()}</Text> */}

                                    </View>)
                               
                            ))} 

                        </ScrollView>
                    <View style={styles.footer}>
                        <TextInput style={styles.textinput}
                        value={inputMessage}
                        onChangeText={(text) =>setInputMessage(text)}

                        placeholder="Enter your message here ..."/>
                        <TouchableOpacity  activeScale={0.4} >
                        <Ionicons name="send" size={36} color="black" onPress={sendMessage}/>
                            
                        </TouchableOpacity>
                    </View>
                       



                    </KeyboardAvoidingView>

                </View>


            </ImageBackground>
        </SafeAreaView>
    )
}

export default ChatScreen


const styles = StyleSheet.create({
    
    container: {
        height: '100%',
        width: '100%',


    },
    header: {
        backgroundColor: '#4891b1',
        height: '13%',
        width: '100%',
        borderBottomEndRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    messageview:{
        flex:1
    },
    footer:{
        flexDirection: 'row', 
        alignItems: 'center',
        width: '100%', 
        padding:10

    },
    textinput:{
        bottom:0,
        height:40,
        width:'85%',
        marginRight:15, 
        borderColor:'black',
        borderWidth:1,
        padding:10,
        color:'black',
        borderRadius:30,
        backgroundColor:'transparent'

    },
    sender:{
        padding:5,
        //  backgroundColor:'green',
        alignSelf:'flex-end',
        borderRadius:10,
        // borderBottomColor: '#4891b1',
        marginRight:15, 
        marginBottom:20,
        maxWidth:'80%',
        position:'relative',
        borderWidth:1,
        borderBottomWidth:0,
        borderTopWidth:0

    },
    receiver:{
        padding:5,
        // backgroundColor:'green',
        alignSelf:'flex-start',
        borderRadius:10,
        // borderBottomColor: '#4891b1',
        marginLeft:15, 
        marginBottom:20,
        maxWidth:'80%',
        position:'relative',
        borderWidth:1,
        borderBottomWidth:0,
        borderTopWidth:0,
        // borderRightWidth:0,

        // borderColor:'#4891b1'

    },
    sendertext:{
        justifyContent:'center',
        alignItems: 'center',
        fontSize:18
    },
    sendertexttime:{
        fontSize:11,
        alignSelf:'flex-end',
    },
    receivertext:{
        justifyContent:'center',
        alignItems: 'center',
        fontSize:18
    },
    receivertexttime:{
        fontSize:11,
        alignSelf:'flex-end',
    },
    sendertextname:{
        alignSelf:'flex-end'
    },
    


})