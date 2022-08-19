import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList, View } from "react-native";
import Container from "../../components/Container";
import Text from "../../components/Text";

export default function Notifications() {
    const [notifications,setNotifications] = useState();
    const [role_,setRole] = useState<any>()

    const getUser = async()=>{
        const session:any = await AsyncStorage.getItem('session');
        
        const role = JSON.parse(session).role_id == '1' ? "supervisor" : "admingudang";
        setRole(role)

        getNotifications(role)
    }

    const getNotifications = (role:any)=>{
        axios.get('/notifications/?reciever='+role)
        .then(response=>{
            setNotifications(response.data.data)
        })
    }

    useEffect(()=>{
        getUser();
    },[])

    return(
        <Container>
            <FlatList
                data={notifications}
                renderItem={({item})=>{
                    return(
                        <View style={{
                            padding:15,
                            borderBottomWidth:1,
                        }} >
                            <Text weight="semi" >To : {item.reciever}</Text>
                            <Text weight="semi" >{item.title}</Text>
                            <Text>{item.message}</Text>
                            
                            {
                                role_ != 'supervisor' &&
                                <>
                                    <Text style={{
                                        marginTop:10,
                                    }}>Item : {item?.data?.item.item.name ? item?.data?.item.item.name : 'Tidak ada / dihapus'}</Text>
                                    <Text>Variant : {item?.data?.item.variant.name ? item?.data?.item.variant.name : 'Tidak ada / dihapus'}</Text>
                                </>
                            }

                            {
                                 role_ == 'supervisor' &&
                                 <>
                                    <Text style={{
                                        marginTop:10,
                                    }}>Item : {item?.data?.item.name ? item?.data?.item.name : 'Tidak ada / dihapus'}</Text>
                                    <Text>Variant : {item?.data?.variant.name ? item?.data?.variant.name : 'Tidak ada / dihapus'}</Text>
                                </>
                            }

                            <Text>{item?.data?.type} : {item?.data?.amount}</Text>
                            <Text style={{
                                marginTop:10,
                            }} size={12} >{item.createdAt}</Text>
                        </View>
                    )
                }}
            />
        </Container>
    )
}