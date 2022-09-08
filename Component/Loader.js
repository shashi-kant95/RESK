import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import loaderIcon from '../assets/Images/loader.gif';

export default () =>
    <View style={styles.loader}>
        <Image
            style={styles.loaderStyle}
            resizeMode={'contain'}
            resizeMethod={'scale'}
            source={loaderIcon}
        />
    </View>;

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        transform: [{ translate: [0, 0, 1] }],
    },
    loaderStyle: {
        height: '50%',
        width: '50%',
        alignSelf: 'center'
        //aspectRatio:1
    },
});