import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Container from "../components/Container";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Text from "../components/Text";
import Colors from "../constants/Colors";
import StockStatistics from "../components/Index/statistics";
import StockRequest from "../components/Index/stockRequest";
import * as Notifications from 'expo-notifications';
import useDefaultHeader from "../hooks/useDefaultHeader";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  

export default function Index() {

    const [stockRequest,setStockRequest] = useState();
    const [user,setUser] = useState();

    useEffect(()=>{
        checkSession();
    },[])

    const checkSession = async()=>{
        const session = await AsyncStorage.getItem('session');

        if (session) {
            axios.defaults.headers.common["x-api-key"] = JSON.parse(session).api_key;
            getPushToken();
            setUser(JSON.parse(session))
        }
    }

    const getPushToken = async ()=>{
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Terjadi Kesalahan','Failed to get push token for push notification!');
            return;
        }
        
        const {data} = await Notifications.getExpoPushTokenAsync();

        sendPushToken(data);
    }

    const sendPushToken = async(token:string)=>{
        const data = {
            push_token:token,
        }
        
        try {
            const response = await axios.post('/user/store-push-token',data);
        } catch (error) {
            Alert.alert('Terjadi Kesalahan','Gagal untuk mengirim token notifikasi')
        }
    }

    return(
        <Container>
            <ScrollView>
                <StockStatistics/>
                {
                    user?.role_id == 1 &&
                    <StockRequest data={stockRequest}/>
                }
            </ScrollView>
        </Container>
    )
}