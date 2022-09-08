import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, Share, Text, View, Button, ImageBackground, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import bgImage from '../assets/Images/chatbg.png'
import { db, auth } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements'
import logo from '../assets/Images/Logo.png'
import SearchUserCard from './SearchUserCard'
import * as firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker';
import AlertBox from './AlertBox'
import * as MailComposer from 'expo-mail-composer';




const ProfileScreen = ({ navigation }) => {
    const [userName, setUserName] = useState(auth.currentUser.displayName)
    const [userBio, setUserBio] = useState('')
    const [imageUrl ,setImageUrl] = useState(auth.currentUser.photoURL)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalHeader, setModalHeader] = useState('')
    const [modalMessage, setModalMessage] = useState('')



    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
         db.collection('users').doc(auth.currentUser.uid).get().
         then((doc) => {
            setUserBio(doc.data().bio)
            console.log(doc.data())
            // alert(doc.data().imageUrl)
            })
      }, []);


      const sendMail =()=>{
        MailComposer.composeAsync({
            recipients: ['abcdshashikant.com'], // array of email addresses
            subject: "",
            body: ""
          })
      }
      const onShare = async () => {
        try {
          const result = await Share.share({
            message: 'Hey, RESK Messenger is a fast, simple and secure app that I use to message and always connected to the people I care about Get it for free at https://expo.io/artifacts/233b7e3e-2770-4921-99b4-fe43942e31d4',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

      const privacyPolicy = ()=>{

        setModalMessage(`Information Collection and Use:
          For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.The app does not use any third party services.

Security:
          I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
          
Update:
          I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.
          This policy is effective as of 2021-04-20'`)
          setModalHeader('PRIVACY POLICY')
          setIsModalVisible(!isModalVisible)
        }

        const aboutResk = ()=>{
            setModalMessage('RESK is a free social media chatting app developed by Shashi Kant. All services and information are based on encryption and decryption technology. As of now no third parties services are there in this app.')
            setModalHeader('ABOUT RESK')
             setIsModalVisible(!isModalVisible)


        }

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
            setImageUrl(result.uri);
          }
    }

    const toggleModal= (val)=>{
        setIsModalVisible(false)
    }

    const updateUserProfile=async()=>{ 
       await auth.currentUser.updateProfile({
            displayName: userName,
            photoURL: imageUrl || randomProfilePic,
        })
        .then(() => 
        {
        db.collection('users').doc(auth.currentUser.uid).update({
            bio :userBio,
            username: userName,
            userprofilephoto:imageUrl                    
         })
         .then(()=>
         {
             setModalHeader("Cheers!! Profile updated")
             setModalMessage("Your profile information has been updated successfully. ")
             setIsModalVisible(!isModalVisible)
        });
        })
        .catch((error)=>{
            setModalHeader("Opps!! Somwthing Wrong")
             setModalMessage=(error)
            setIsModalVisible(!isModalVisible)})
    }


    const signOut = () => {
        auth.signOut().then(function () {
            
            navigation.navigate('Login')
        }, function (error) {
            alert(error.message)
        });
    }


    return (
        <View style={{ width: '100%', height: '100%', }} >
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
                        <TouchableOpacity onPress={signOut} style={{ alignItems: 'center', justifyContent: "center", marginLeft: '25%' }}>
                            <Ionicons name="md-log-out-outline" size={24} color="black" />

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: '87%' }}>
                    <View style={{ marginLeft: '30%', marginTop: '10%' }}>
                        <Avatar
                            rounded
                            source={{ uri: imageUrl  }}
                            size={160}

                        >
                            <Avatar.Accessory size={44} color='#4891b1' onPress={pickImage} />
                        </Avatar>
                    </View>

                    <View style={{ height: '20%', width: '90%', marginTop: '3%', marginLeft: '5%' }}>
                        <View style={{ height: '30%', flexDirection: 'row' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#4891b1', width: '30%', borderRadius: 40 }}>
                                <Text style={{ fontWeight: 'bold' }}>User Name </Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginLeft: '3%' }}>
                                <Text style={{ fontWeight: 'bold' }}>:</Text>
                            </View>
                            <TextInput style={styles.inputbox}
                                placeholder="User Name"
                                placeholderTextColor="white"
                                autofocus
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                            />


                        </View>
                        <View style={{ height: '30%', flexDirection: 'row', marginTop: '5%' }}>
                            <View style={{ justifyContent: 'center', backgroundColor: '#4891b1', width: '30%', borderRadius: 40 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: '13%' }}>Bio</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginLeft: '3%' }}>
                                <Text style={{ fontWeight: 'bold' }}>:</Text>
                            </View>
                            <TextInput style={styles.inputbox}
                                placeholder="Bio"
                                placeholderTextColor="white"
                                autofocus
                                value={userBio}
                                onChangeText={(text) => setUserBio(text)}
                            />


                        </View>
                        <View style={{ width: '30%', height: '20%', marginTop: '5%', marginLeft: '70%' }}>
                            <Button color='#26a9e1' title="SAVE" onPress={updateUserProfile} />

                        </View>


                    </View>
                    <View style={{ backgroundColor: '#4891b1', height: '50%', marginTop: '9%', borderTopLeftRadius: 70, borderTopRightRadius: 70, borderWidth:2, borderLeftWidth:0,borderRightWidth:0 }}>
                        <View style={{ width: '80%', height: '100%', alignItems: 'center', marginLeft: '10%', marginTop: '6%' }}>
                            <TouchableOpacity onPress={()=>alert('Work in progress!!')} style={{ marginBottom: '6%', flexDirection: 'row' }}>
                                <Ionicons name="md-help-circle" size={22} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 8 }}>Help</Text></TouchableOpacity>
                            <TouchableOpacity onPress={aboutResk} style={{ marginBottom: '6%', flexDirection: 'row' }}>
                                <Ionicons name="information-circle" size={22} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 8 }}>About RESK</Text></TouchableOpacity>
                            <TouchableOpacity onPress={privacyPolicy} style={{ marginBottom: '6%', flexDirection: 'row' }}>
                                <Ionicons name="md-lock-closed" size={20} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 8 }}>Privacy policy</Text></TouchableOpacity>


                            <TouchableOpacity onPress={onShare} style={{ marginBottom: '6%', flexDirection: 'row' }}>
                                <Ionicons name="md-person-add" size={22} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 8 }}>Invite your friend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={sendMail} style={{ marginBottom: '6%', flexDirection: 'row' }}>
                                <Ionicons name="mail" size={20} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 8 }}>Feedback or Improvement</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={signOut} style={{ marginBottom: '6%', flexDirection: 'row' }}>
                                <Ionicons name="log-out" size={24} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 8 }}>Logout</Text></TouchableOpacity>



                        </View>
                    </View>

                </View>
            </ImageBackground>
            {isModalVisible && <AlertBox message={modalMessage} header={modalHeader} toggleModal={toggleModal} />}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4891b1',
        height: '13%',
        width: '100%',
        borderBottomEndRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    inputbox: {
        marginLeft: '3%',
        borderColor: 'black',
        borderWidth: 1,
        width: "65%",
        height: '100%',
        backgroundColor: '#4891b1',
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'white',
        // borderTopLeftRadius:0,
        // borderBottomLeftRadius:0,


    },

})


export default ProfileScreen