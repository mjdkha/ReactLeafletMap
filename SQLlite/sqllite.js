import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db.db');

export const createTables = () => {
    db.transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude VARCHAR(100), longitude VARCHAR(100), description VARCHAR(240))`, [],
            (sqlTxn, res) => {
                console.log("table locations created successfully");
            }
        );
    });
};

export const addLocation = (text) => {
    if (!text) {
        alert("Enter description");
        return false;
    }
    db.transaction(txn => {
        txn.executeSql(
            `INSERT INTO locations (latitude,longitude,description) VALUES (?,?,?)`, [locationMap.latitude, locationMap.longitude, text],
            (sqlTxn, res) => {
                console.log(`${location} added successfully`);
                setModalVisible(false)
                getLocations();
                setLocation({
                    latitude: 0,
                    longitude: 0,
                })
            }
        );
    });
};


export const getLocations = () => {
    db.transaction(txn => {
        txn.executeSql(
            `SELECT * FROM locations ORDER BY id DESC`, [],
            (sqlTxn, res) => {
                console.log("locations retrieved successfully");
                let len = res.rows.length;
                if (len > 0) {
                    let results = [];
                    for (let i = 0; i < len; i++) {
                        let item = res.rows.item(i);
                        console.log(item)
                        results.push({ latitude: item.latitude, longitude: item.longitude, description: item.description });
                    }
                    setLocations(results);

                }
            }
        );
    });
};

export const deleteLocation = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM locations', [],
            (tx, results) => {
                console.log('supression pass bien', results.rowsAffected);

            }
        );
    });
}