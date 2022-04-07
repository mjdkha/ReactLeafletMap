import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';

export default class Users extends Component {

  constructor(props:{props:any}) {
    super(props);
    this.state = {
      data: [
        {name: "User 1"},
        {name: "User 2",}, 
        {name: "User 3",}, 
        {name: "User 4",}, 
       
      ],
    };
  }

  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              ref={'txtSearch'}
              placeholder="Search"
              underlineColorAndroid='transparent'
              />
          </View>
        </View>

        <FlatList 
          style={styles.notificationList}
          data={this.state.data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card]}>
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
  },
  
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    flex:1,
  },
  
  notificationList:{
    marginTop:20,
    padding:10,
  },
  card: {
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
  
});  
    