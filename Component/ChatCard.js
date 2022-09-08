import React,{useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';
import {db,auth} from '../firebase' 


const ChatCard = ({id, data, enterChat}) => {
    const [chatMessages, setChatMessages]=useState([])
    const [userName,setUserName]=useState(data.username[0]==auth.currentUser.displayName?data.username[1]:data.username[0])

    useEffect(() => {
        const unsubscribe =db.collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) => {setChatMessages(
            snapshot.docs.map(doc=>(
                // id:doc.id, 
                doc.data()
            ))
        )})
        return unsubscribe;
    },[id])


    return (
        
        <ListItem onPress={()=>{enterChat(id, userName ,data.profilephoto)}} onLongPress={()=>alert('long pressed')} key={id} bottomDivider
        Component={TouchableScale}
        containerStyle={{borderRadius:20,borderBottomColor: 'black',marginBottom:3}}
         friction={90} //
         tension={100} // These props are passed to the parent component (here TouchableScale)
         activeScale={0.95} //
        linearGradientProps={{
          colors: ['#3a8db1', '#2aa9de'],
      start: { x: 1, y: 0 },
         end: { x: 0.2, y: 0 },
  }}
  ViewComponent={LinearGradient}>
            <Avatar
            rounded
            source={{uri:data.profilephoto}}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold'}}>{userName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeeMode='tail'>
                   {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron></ListItem.Chevron>
        </ListItem>
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
        borderColor: '#ed1b24',
        borderWidth: 1,
        width: "100%",
        height: 25,
        backgroundColor: '#383838',
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'white'

    },
    shadowbox:{
        flexDirection: 'row',
    // backgroundColor:'#d9d9d9',
    shadowColor: "red",
    shadowOpacity: 0.8,
    borderColor:'black',
    borderWidth:2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
      backgroundColor:'#111111',
      height:70, 
      width:'90%',
      marginLeft:"5%",
      borderRadius:20
    
}
});

export default ChatCard