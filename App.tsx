import { Alert, Button, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView,{ Callout, MapEvent, Marker } from 'react-native-maps';
import React, { useEffect, useState} from 'react';
import * as Location from 'expo-location';



export default function App() {
  const [text, setText] = useState("");
  const[location,setLocation]= useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
  });
  
  const [modalVisible, setModalVisible] = useState(false);
  const [userInput , setUserInput] = useState("")
  const [marker , setMarker] = useState([] as any)
  const onLocationSelect = (event: MapEvent) => {
    setLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
            <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Text style={styles.modalText}>Entre votre description : </Text>
            <TextInput
              style={styles.input}
              value={text}
              placeholder="description"
              onChangeText={setText}
              />

<Text style={styles.modalText}>votre Latitude est : 122045745</Text>
<Text style={styles.modalText}>votre longitude : 12836465</Text>
          </View>
        </View>
      </Modal>



      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={location}
        onPress={onLocationSelect}
      >
   
            
   
    <Marker coordinate={location} onPress={() => setModalVisible(true)} >

    <Callout tooltip={true} >
      
      </Callout>
      </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },

  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 100
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf:'flex-end'
    
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "black",
    alignItems:'center',
    textAlign:'center',
    width:'20%',
    
    
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

