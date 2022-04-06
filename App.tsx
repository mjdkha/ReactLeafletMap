import {Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db.testDb');

const renderCategory = ({ item }:{item:any}) => {
  return (
    <View style={{
      flexDirection: "row",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    }}>
      <Text style={{ marginRight: 9 }}>{item.id}</Text>
      <Text>{item.name}</Text>
    </View>
  );
};



export default function App() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([] as any);
  const db = SQLite.openDatabase('db.testDb');
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        }
      );
    });
   };

   const addCategory = () => {
    if (!category) {
      alert("Enter category");
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO categories (name) VALUES (?)`,
        [category],
        (sqlTxn, res) => {
          console.log(`${category} category added successfully`);
          getCategories();
          setCategory("")
        }
      );
    });
  };

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM categories ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("categories retrieved successfully");
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name });
            }
            setCategories(results);
          }
        }
      );
    });
  };

  useEffect(() => {
    const create =async ()=>{
      const createtable= await createTables();
    }
    const getCategorie = async ()=>{
      const getCategorie= await getCategories();
    }
    create()
    getCategorie()
  }, []);


  return (
    <View style={styles.container}>
     <StatusBar backgroundColor="#222" />

<TextInput
  placeholder="Enter category"
  value={category}
  onChangeText={setCategory}
  style={{ marginHorizontal: 8 }}
/>

<Button title="Submit" onPress={addCategory} />

<FlatList
  data={categories}
  renderItem={renderCategory}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

