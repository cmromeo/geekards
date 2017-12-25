import { Permissions, Constants } from 'expo';
import { AsyncStorage } from 'react-native';

export default async () => {
    let previousGrant = await AsyncStorage.getItem('localNotificationGrant');

    if (previousGrant === 'granted') {
        return true;
    }else{
        let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && status === 'granted') {
            console.log('Notification permissions granted.')
            AsyncStorage.setItem('localNotificationGrant', 'granted');
            return true;
        }else {
            return false
        }
        if (status !== 'granted'){
            return false;
        }
        
    }




}