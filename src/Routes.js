import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import BottomSheetMore from './screens/BottomSheetMore';
import Home from './screens/Home';
import ProductDetail from './screens/Product/ProductDetail';

const Profile = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile</Text>
  </View>
);

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          drawerLabel: 'Home',
          // headerShown: false
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {

  const Tab = createBottomTabNavigator();

  const bottomSheetRef = useRef(null);

  const openMoreModal = () => {
    bottomSheetRef.current?.present();
  };
  return (<>
    <Tab.Navigator>
      <Tab.Screen
        name="HomeDrawer"
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="More"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            openMoreModal();
          },
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'apps' : 'apps-outline'} size={size} color={color} />
          ),
          headerShown: false
        }}
        component={() => null}
      />
    </Tab.Navigator>
    <BottomSheetMore ref={bottomSheetRef} />
  </>)
}

const Routes = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
              ),
            })}
          />

        </Stack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default Routes;
