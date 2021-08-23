import React from 'react'
import { StyleSheetProperties, Image, SafeAreaView, View } from 'react-native'

const Header = () => {
    return(
        <View style = {styles.header}>
            <Image
            source={require('../assets/Logo.png')}
            resizeMode='contain'
            style={{height:50}}
            />
        </View>
    )

    const styles = StyleSheet.create({
        header: {
            width: '100%',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 20
        }
    })
}

export default Header;