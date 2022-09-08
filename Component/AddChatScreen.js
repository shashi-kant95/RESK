import React, {  useState, useEffect } from 'react';
import { StyleSheet,  View, Button, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import bgImage from '../assets/Images/chatbg.png'
import { db,auth } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Images/Logo.png'
import SearchUserCard from './SearchUserCard'
import * as firebase from 'firebase'





const AddChatScreen = ({ navigation }) => {

    const [inputName, setInputName] = useState('')
    const [userNameList, setUserNameList] = useState([])
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
            setUserNameList(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )

        })
        return unsubscribe
    }, [])

    const createChat = (id,chatName, profilephoto) => {
        db
            .collection('chats').doc(id)
            .set({ chatmember: [id,auth.currentUser.uid],
                username:[auth.currentUser.displayName,chatName],
                profilephoto:profilephoto
             })
            .then()
            .catch((error) => alert(error));
    }
    
    const addNewFriend= (id) => {
        db.collection('users').doc(id).update({
           addedby :firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)                      
        });
    }
   
    const enterChat = (id, chatName, profilephoto) => {
        createChat(id,chatName,profilephoto)
        addNewFriend(id)
        navigation.navigate('Chat', {
            id, chatName, profilephoto
        })
    }

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = userNameList.filter(function (item) {
            const itemData = item.data.username
              ? item.data.username.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setInputName(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(userNameList);
          setInputName(text);
          
        }
      };
    

    return (
        <View style={{ width: '100%',height: '100%',}} >
            <ImageBackground
                style={{ width: '100%', height: '100%', zIndex: 11 }}
                source={bgImage}
                resizeMode={'stretch'}
                resizeMethod={'scale'}
            >

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', height: '70%', marginTop: '8%', marginBottom: '3%' }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ height: '100%', width: '10%', alignItems: 'center', flexDirection: 'row', marginLeft: '5%' }} >
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { alert('logo clicke') }} style={{ height: '100%', width: '20%', marginLeft: '25%' }} >
                            <Image onPress={() => { alert('logo clicke') }}
                                style={{ width: '100%', height: '85%', }}
                                source={logo}
                                resizeMode={'contain'}
                                resizeMethod={'scale'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { alert('option clicke') }} style={{ alignItems: 'center', justifyContent: "center", marginLeft: '25%' }}>
                            <Ionicons name="options" size={24} color="black" />

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: '5%', flexDirection: 'row', width: '80%' }} >
                    <View style={{ width: '80%', marginLeft: '5%' }}>
                        <TextInput style={styles.inputbox}
                            placeholderTextColor="white"
                            placeholder="Enter a name/room to search"
                            value={inputName}
                            onChangeText={(text) => searchFilterFunction(text)}
                        />
                    </View>
                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center', height: "33%", borderRadius: 10 }} >
                        <Button color='#26a9e1' style={styles.buttonstyle} title="Search" />
                    </View>
                </View>


                <ScrollView style={{ width: '95%',marginLeft: '2.5%' }}>
                        {filteredDataSource.map(({ id, data }) => (
                            <SearchUserCard key={id} id={id} data={data} enterChat={enterChat} />))}


                </ScrollView>



            </ImageBackground>
        </View >

    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {},
    inputbox: {
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        height: 45,
        backgroundColor: '#383838',
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'white'


    },
    buttonstyle: {
        paddingTop: 10,
        width: '20%'
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
})