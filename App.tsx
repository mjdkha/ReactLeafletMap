import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView,{ Marker } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });


  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    })();

  }, []);

  
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={location}
      >
<Marker coordinate={location} />
      </MapView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

