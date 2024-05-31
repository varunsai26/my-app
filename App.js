import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Routes from './src/Routes';
import Splash from './src/screens/Splash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // Load fonts using Expo's useFonts hook
  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {

    // SplashScreen.show();
    const prepareResources = async () => {
      try {
        // Simulate a delay for the splash screen
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn('Error loading resources:', error);
      } finally {
        // Hide splash screen when resources are loaded
        // SplashScreen.hide();
        setAppIsReady(true);
      }
    };
    prepareResources();
  }, []);

  if (!loaded || !appIsReady) {
    return (
      <Splash />
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <Routes />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
