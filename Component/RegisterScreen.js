import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, ImageBackground, Images, TouchableOpacity } from 'react-native';
import { Button, Image, Input, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth,db } from '../firebase'
// import AlertBox from './AlertBox'
import bgImage from '../assets/Images/Login.gif'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import bgImageAnimation from '../assets/Images/loginbg.jpg';
//import bgImageAnimation from '../assets/Images/registeranimation.gif'






const RegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [defaultProfileImages, setDefaultProfileImages] = useState([
        'https://i.pinimg.com/736x/9d/d1/8c/9dd18c57ab6e1961793834e9ec54fa35.jpg', 
        'https://ih1.redbubble.net/image.1011612836.6057/st,small,507x507-pad,600x600,f8f8f8.jpg',
        'https://i.pinimg.com/474x/ad/86/00/ad86000ae7f18e5ee5589c66a99edf00.jpg',
        'https://i.pinimg.com/474x/ad/86/00/ad86000ae7f18e5ee5589c66a99edf00.jpg', 
        'https://i.pinimg.com/originals/1d/a2/fa/1da2fa738066fd135abcab63576289d2.jpg',
        'https://i.pinimg.com/736x/e2/98/cf/e298cf2d72a8cd045c59b38757caf2dd.jpg'
    ])
    const [randomProfilePic,SetRandomProfilePic]=useState(defaultProfileImages[Math.floor(Math.random() * defaultProfileImages.length)])


    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

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

    const addUser = (uid,uname) => {
        db
       .collection('users').doc(uid)
        .set({ 
            userid:uid,
            username:uname,
            userprofilephoto:imageUrl || randomProfilePic,
            addedby:[],
            bio:'Ask '+ uname + ' to update bio.'
          })
        .then(() => alert(uname + " Added"))
        .catch((error) =>  alert(error));
}

    const register = () => {
        auth.createUserWithEmailAndPassword(userEmail, userPassword)
            .then((authuser) => {addUser(authuser.user.uid,userName)
                authuser.user.updateProfile({
                    displayName: userName,
                    photoURL: imageUrl || randomProfilePic,
                })
            }).catch((error) => alert(error));
          
    }
    return (<View style={styles.container}>
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
                <View style={{ flexDirection: 'row',marginRight: '60%'}}>
                            <Text style={{ marginTop: '25%', fontSize: 37, fontWeight: "bold" }} >Hello! </Text>
                                                 
                    </View>
                    <Text style={{  fontWeight: "bold", justifyContent:"space-between",marginLeft: '15%' }} >A simple, magical way to connect with people....  </Text>   
                    
                    <View style={{ flexDirection: 'row',}}>
                            <Text style={{  fontSize: 20, fontWeight: "bold" }} >Join Our Community </Text>
                                                 
                    </View>
                <View style={{ height: '80%', width: '100%', backgroundColor: '#4891b1', 
                    alignItems: 'center', justifyContent: 'center', marginTop: '35%', borderRadius: 80, 
                    borderWidth: 2, borderColor: 'black' }}>
                        <StatusBar style='light'></StatusBar>
                    <View style={{ width: '80%', height:'40%', alignItems: 'center',marginTop:'15%'}}>
                        {/* <AlertBox modalVisible={modalVisible} message={modalMessage}></AlertBox> */}
                        <View style={{ paddingBottom: 15, width: '100%' }}>
                            <TextInput style={styles.inputbox}
                                placeholder="Name"
                                placeholderTextColor="white"
                                autofocus
                                value={userName}
                                onChangeText={(text) => setUserName(text)} />
                        </View>
                        <View style={{ paddingBottom: 15, width: '100%' }}>
                            <TextInput style={styles.inputbox}
                                placeholder="Email"
                                placeholderTextColor="white"
                                // type="email"
                                autofocus
                                value={userEmail}
                                onChangeText={(text) => setUserEmail(text)} />
                        </View>


                        <View style={{ paddingBottom: '4%', width: '100%' }}>
                            <TextInput style={styles.inputbox}
                                placeholder="Password"
                                placeholderTextColor="white"
                                type="password"
                                autofocus
                                secureTextEntry
                                value={userPassword}
                                onChangeText={(text) => setUserPassword(text)} />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', padding: 6 }}>Profile picture</Text>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 5 }}>
                                    <Ionicons name="information-circle" size={18} color="black" onPress={() => alert('If you have some privacy concern allowing access to camera, then no worry we will put some random pic as your profile photo')} />
                                </TouchableOpacity>
                                <Button title="Upload" color='#26a9e1' onPress={pickImage} />
                            </View>

                            <View style={{ width: '30%', height: '20%', marginLeft: '5%' }}>
                                <Button color='#26a9e1' title="REGISTER" onPress={register} />

                            </View>
                        </View>
                        {/* <View style={{ width: '30%', height: 20, marginLeft: '70%', marginTop: '-7%' }}>
                        <Button color='#26a9e1' title="REGISTER" onPress={login} />

                    </View> */}

                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { navigation.navigate('Login') }}>

                                <Text style={{ textDecorationLine: 'underline' }} >Already registered, Go to login</Text>

                            </TouchableOpacity>
                        </View>



                    </View>
                   

                    <ImageBackground
                        style={{ width: '100%', height:'60%'}}
                        source={bgImageAnimation}
                        /> 
                </View>
            </ImageBackground>
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


export default RegisterScreen