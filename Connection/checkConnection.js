import NetInfo from '@react-native-community/netinfo'

export default checkConnected = () => {
    return NetInfo.fetch().then(state => {
        console.log('Connection type', state.type)
        console.log('Is Connected', state.isConnected)
        return state.isConnected
    })
}