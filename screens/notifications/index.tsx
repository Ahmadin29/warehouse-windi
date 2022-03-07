import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Container from "../../components/Container";
import Text from "../../components/Text";

export default function Notifications() {
    const [notifications,setNotifications] = useState();

    const getNotifications = ()=>{
        axios.get('/notifications/?reciever=admingudang')
        .then(response=>{
            setNotifications(response.data.data)
        })
    }

    useEffect(()=>{
        getNotifications()
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
                            <Text size={12} >{item.createdAt}</Text>
                            <Text weight="semi" >{item.title}</Text>
                            <Text>{item.message}</Text>
                        </View>
                    )
                }}
            />
        </Container>
    )
}