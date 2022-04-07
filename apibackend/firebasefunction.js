import { dbFirebase } from './firebase'
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore'







export const addLocation = (latitude, longitude, description) => {
    addDoc(collection(dbFirebase, 'locations'), {
        latitude: latitude,
        longitude: longitude,
        description: description,
    });
};




export const getLocations = () => {
    const q = query(collection(dbFirebase, 'locations'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
        setLocations(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            description: doc.data()['description'],
            latitude: doc.data()['latitude'],
            longitude: doc.data()['longitude']
        })))
    })
};