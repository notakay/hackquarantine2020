/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import database from '@react-native-firebase/database';
const reference = database().ref('/users/123');

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Geolocation from 'react-native-geolocation-service';

const locationAccessPermissionRequest = async() => {
    try {
        if(Platform.OS === "ios") {
          Geolocation.requestAuthorization();
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
            },
            (error) => {
              console.log("map error: ",error);
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Blah blah bullshit",
                message: "message",
                buttonNeutral: "Later",
                butonNegative: "No",
                buttonPositive: "yes",
            }
          );
          if (granted == PermissionsAndroid.RESULTS.GRANTED) {
              console.log("yes");
          } else {
              console.log("no");
          }
        }
        
    } catch (err) {
        console.log(err);
    }
}

const getLocation = async () => {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      database()
            .ref('/locations/')
            .set({
                thing: position,
            }).then(() => console.log('Data set.'));
    },
    (error) => {
      console.log(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
  );
}


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button
                title="Send location lol" 
                onPress={locationAccessPermissionRequest} />
              <Button
                title="Send location lol2" 
                onPress={getLocation} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
