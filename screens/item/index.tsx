import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";
import Container from "../../components/Container";
import ItemList from "../../components/Item/list";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from "../../constants/Colors";

export default function Item() {

    const navigation = useNavigation();

    const [user,setUser] = useState();

    useEffect(()=>{
        getProfile();
    },[])

    const getProfile = async()=>{
        const session = JSON.parse(await AsyncStorage.getItem('session'));

        if (session) {
            setUser(session)
        }
    }

    return(
        <Container>
            <ItemList/>
            {
                user && user?.role_id != 1 &&
                <View style={{
                    padding:15,
                    elevation:20,
                    backgroundColor:Colors.white,
                }} >
                    <Button
                        label="Tambahkan Produk"
                        onPress={()=>{
                            navigation.navigate('AddItem' as never)
                        }}
                    />
                </View>
            }
        </Container>
    )
}