import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Splash = () => {
  return (
    <View style={styles.splashContainer}>
      <LottieView
        source={require('../../assets/splash.json')}
        style={{width: "100%", height: "100%"}}
        autoPlay
        loop
      />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})