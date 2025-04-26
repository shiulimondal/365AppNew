import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { Platform, AppState } from 'react-native';

class FCMService {
  constructor() {
    this.messageListener = null;
    this.processedNotifications = {}; // Store processed notifications
  }

  register = async (onRegister, onNotification, onOpenNotification) => {
    if (Platform.OS === 'ios') {
      await this.registerAppWithFCM();
    }
    this.checkPermission(onRegister);
    this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = async (onRegister) => {
    const authStatus = await messaging().hasPermission();
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      this.getToken(onRegister);
    } else {
      this.requestPermission(onRegister);
    }
  };

  getToken = async (onRegister) => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        onRegister(fcmToken);
      } else {
        console.log('[FCMService] User does not have a device token');
      }
    } catch (error) {
      console.log('[FCMService] getToken Rejected', error);
    }
  };

  requestPermission = async (onRegister) => {
    try {
      const authStatus = await messaging().requestPermission();
      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        this.getToken(onRegister);
      }
    } catch (error) {
      console.log('[FCMService] Request Permission Rejected', error);
    }
  };

  createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('[FCMService] OnNotificationOpenedApp', remoteMessage);
      if (remoteMessage) {
        onOpenNotification(remoteMessage);
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log('[FCMService] getInitialNotification', remoteMessage);
        if (remoteMessage) {
          onOpenNotification(remoteMessage);
        }
      });

    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCM message arrived', remoteMessage);
      if (remoteMessage) {
        onNotification(remoteMessage);
      }
    });

    messaging().onTokenRefresh((fcmToken) => {
      console.log('[FCMService] New token refresh', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    if (this.messageListener) {
      this.messageListener();
    }
  };
}

async function onDisplayNotification(title, body) {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'resturentwalaz_owner',
    name: 'ResturentWalazOwner',
    sound: 'default',
  });

  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
}

const fcmService = new FCMService(); // Ensure this is defined before using in functions

const onNotification = (notify) => {
  console.log('[App] onNotification', notify);

  const notificationId = notify?.messageId;

  if (notificationId && !fcmService.processedNotifications[notificationId]) {
    fcmService.processedNotifications[notificationId] = true;

    if (AppState.currentState === 'active' && notify.notification) {
      onDisplayNotification(notify.notification.title, notify.notification.body);
    }
  } else {
    console.log('[App] Duplicate notification ignored');
  }
};

const onOpenNotification = (notify) => {
  console.log('notify', notify);
  const notiData = notify?.data;
  onclickNotification(notiData);
};

const onclickNotification = (data) => {
  console.log('data-----------------', data);
  // Handle navigation here if needed
};

const onForegroundEvent = (data) => {
  const { type, detail } = data;
  if (type === EventType.PRESS) {
    const notiData = detail?.notification?.data;
    onclickNotification(notiData);
  }
};

export { fcmService, onDisplayNotification, onNotification, onOpenNotification, onForegroundEvent };
