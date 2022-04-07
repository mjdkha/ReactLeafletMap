import {Alert, Button, FlatList, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import NetInfo from '@react-native-community/netinfo'



export default function App() {
  const [connectStatus, setConnectStatus]=useState(false)
  const checkConnected=()=>{
    return NetInfo.fetch().then(state=>{
      console.log('Connection type', state.type)
      console.log('Is Connected', state.isConnected)
      return state.isConnected
    })
  }
  checkConnected().then((res:any)=>{
    setConnectStatus(res)
  })

























































  const[locationMap,setLocationMap]= useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [location, setLocation] = useState({
    latitude:0,
    longitude:0,
  });
  const [locations, setLocations] = useState([] as any);
  const db = SQLite.openDatabase('db.testDb');


  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude VARCHAR(100), longitude VARCHAR(100), description VARCHAR(240))`,
        [],
        (sqlTxn, res) => {
          console.log("table locations created successfully");
        }
      );
    });
   };

   const addLocation = (text:string) => {
    if (!text) {
      alert("Enter description");
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO locations (latitude,longitude,description) VALUES (?,?,?)`,
        [locationMap.latitude,locationMap.longitude,text],
        (sqlTxn, res) => {
          console.log(`${location} added successfully`);
          setModalVisible(false)
          getLocations();
          setLocation({
            latitude:0,
            longitude:0,
          })
        }
      );
    });
  };

  const getLocations = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM locations ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("locations retrieved successfully");
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              console.log(item)
              results.push({latitude: item.latitude, longitude:item.longitude, description:item.description});
            }
            setLocations(results);
            
          }
        }
      );
    });
  };

  useEffect(() => {
    const create =async ()=>{
      const createtable= await createTables();
    }
    const getLocation = async ()=>{
      const getLocation= await getLocations();
    }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocationMap({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    })();

    create()
    getLocation()
  }, []);

 

const [modalVisible, setModalVisible] = useState(false);
const onLocationSelect = (event: MapEvent) => {
  setLocationMap({
    latitude: event.nativeEvent.coordinate.latitude,
    longitude: event.nativeEvent.coordinate.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
}





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
        placeholder="description"
        onSubmitEditing={(event) => addLocation(event.nativeEvent.text)}
        />
      <Text style={styles.modalText}>Latitude est : {locationMap.latitude}</Text>
      <Text style={styles.modalText}>longitude : {locationMap.longitude}</Text>
        </View>
      </View>
    </Modal>



  <MapView
  style={{ alignSelf: 'stretch', height: '100%' }}
  region={locationMap}
  onPress={onLocationSelect}
>

  <Marker coordinate={locationMap} onPress={() => setModalVisible(true)} >
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
    marginTop: 100
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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


