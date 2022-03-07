import { useEffect, useState } from "react";
import Text from "../../components/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container from "../../components/Container";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import { Divider } from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function Profile(params) {

    const [user,setUser] = useState();
    const navigation = useNavigation();

    useEffect(()=>{
        getProfile();
    },[])

    const getProfile = async()=>{
        const session = JSON.parse(await AsyncStorage.getItem('session'));

        if (session) {
            setUser(session)
        }
    }

    const logout = async()=>{
        await AsyncStorage.removeItem('session');

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' },
                ],
            })
        )
    }

    return(
        <Container>
            <ScrollView>
                <View style={{
                    padding:15,
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"
                }} >
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center"
                    }} >
                        <View style={{
                            width:50,
                            height:50,
                            backgroundColor:Colors.primary,
                            alignItems:"center",
                            justifyContent:"center",
                            borderRadius:100,
                            marginRight:15,
                        }} >
                            <Text size={20} color="white" >AS</Text>
                        </View>
                        <View>
                            <Text>{user?.name}</Text>
                            <Text color="textSecondary" >{user?.role_id == '1' ? 'Supervisor' : 'Admin Gudang'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        padding:10,
                        backgroundColor:Colors.danger,
                        paddingHorizontal:20,
                        borderRadius:100,
                    }} onPress={()=>{
                        Alert.alert('Perhatian!','Apakah kamu yakin untuk keluar?',[
                            {text:'Batalkan'},
                            {
                                text:'Ya, Keluar',
                                onPress:()=>{
                                    logout()
                                }
                            }
                        ])
                    }}>
                        <Text color="white" >Keluar</Text>
                    </TouchableOpacity>
                </View>

                <Divider
                    style={{
                        height:10,
                    }}
                />
            </ScrollView>
        </Container>
    )
}