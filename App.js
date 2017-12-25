import React from 'react';
import { Provider } from 'react-redux';
import { Text, View, StatusBar, Alert, AsyncStorage } from 'react-native';
import firebaseApp from './src/firebase';
import Header from './src/components/common/Header';
import Spinner from './src/components/common/Spinner';
import Button from './src/components/common/Button';
import SignedInNavigator from './src/components/loggedIn/SignedInNavigator';
import SignedOutNavigator from './src/components/loginSignup/SignedOutNavigator';
import configureStore from './src/Store';
import registerForLocalNotifications from './src/services/localPush';
import Expo, {Notifications} from 'expo';
import moment from 'moment';

export default class App extends React.Component {

  state = {
    loggedIn: null
  }

  store = configureStore()

 

  handleNotification = async ({ origin, data }) => {
    const {type} = data;
    //const {data: {text}, origin} = notification;
    console.log('inside handle notif');
    try {
      const lastQuizString = await AsyncStorage.getItem('lastQuiz');
      if (lastQuizString !== null){
        // We have data!!
        const lastQuiz = moment(new Date(lastQuizString));
        if (lastQuiz.isSame(new Date(), "day")){
          console.log('same date, oh yeah. this is working!!!!');
          return;
        }

        if (type==='dailyReminder'){
          Alert.alert(
            'Geek Reminder',
            'Stay sharp with GeeKARD quizes today.',
            [{text: 'Ok'}]
          );
        }
      }else{
        if (type==='dailyReminder'){
          Alert.alert(
            'Geek Reminder',
            'Stay sharp with GeeKARD quizes today.',
            [{text: 'Ok'}]
          );
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log('error retrievving last quiz ', error);
    }
  }

  notifyDaily () {
    const localNotification = {
      title: 'Geek Reminder',
      body: 'Stay sharp with GeeKARD quizes today.',
      data: { type: 'dailyReminder' }
    }
    const schedulingOptions = {
      time: (new Date()).getTime() + 3000,
      repeat: 'day'
    }


    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
      .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    console.log('componentDidMount');
    registerForLocalNotifications();
    this.notifyDaily();
    Notifications.addListener(this.handleNotification);
    
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      }else{
        this.setState({loggedIn: false});
      }
    });
  }


  renderContent(){
    switch(this.state.loggedIn){
      case true:
        return (
          <SignedInNavigator />
        );
      case false:
        
        return <SignedOutNavigator />
      default:
        return <Spinner size='large' />
    }
  }

  

  render() {
    return (
      <Provider store={this.store}>
        <View style={{flex:1}}>
          <StatusBar barStyle="light-content" />
          {this.renderContent()}
        </View>
      </Provider>
    );
  }
}



