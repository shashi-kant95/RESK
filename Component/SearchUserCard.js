import React, { useEffect, useState } from 'react';
import { StyleSheet,View , Text} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { auth, db } from '../firebase'

const SearchUserCard = ({id, data, enterChat}) => {
    return (<ListItem onPress={() => { enterChat(id, data.username, data.userprofilephoto) }} onLongPress={() => alert('long pressed')} key={id} bottomDivider
        Component={TouchableScale}
        containerStyle={{ borderRadius: 20, borderBottomColor: 'black', marginBottom: 3 }}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        rightIcon={ <Ionicons name="time-outline" size={44} color="black" containerStyle={{ alignSelf: 'flex-end' }} /> }
        linearGradientProps={{
            colors: ['#3a8db1', '#2aa9de'],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
        }}
        ViewComponent={LinearGradient}>
        <Avatar
            rounded
            source={{ uri: data.userprofilephoto }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: 'bold' }}>{data.username}</ListItem.Title>
            <ListItem.Subtitle><Text>{data.bio}</Text></ListItem.Subtitle>
            
        </ListItem.Content>
        <ListItem.Chevron color="black" />
    </ListItem>
    )

}

export default SearchUserCard