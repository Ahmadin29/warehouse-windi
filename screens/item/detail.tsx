import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Alert, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import Container from "../../components/Container";
import Text from "../../components/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";
import BottomSheet from 'react-native-raw-bottom-sheet';
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function ItemDetail(props:any) {

    const params = props.route.params;
    const navigation = useNavigation();

    const [items,setItems] = useState();
    
    const [request,setRequest] = useState('');
    const [selected,setSelected] = useState();
    const [amount,setAmount] = useState();

    const requestSheetRef = useRef();

    const requestSheet = ()=>{
        return(
            <BottomSheet
                ref={requestSheetRef}
                height={200}
                onClose={()=>{
                    setRequest('');
                }}
            >
                <View style={{
                    padding:15,
                }} >
                    <Text weight="semi" size={15} >Masukan Jumlah Barang {request}</Text>
                    <Input
                        label={"Jumlah "+request}
                        onChangeText={(text)=>{
                            setAmount(text)
                        }}
                        containerStyle={{
                            marginTop:10,
                        }}
                    />
                    <Button
                        label={"Kirim Request "+request}
                        style={{
                            marginTop:15,
                        }}
                        onPress={()=>{
                            sendRequest();
                        }}
                    />
                </View>  
            </BottomSheet>
        )
    }

    const sendRequest = ()=>{
        const uri = '/stock/request-'+request;

        const data = {
            amount:amount,
            variant:selected,
            item:items,
        }

        if (request == 'outbound' && (selected.stock - amount < 1)) {
            Alert.alert('Perhatian!','Jumlah outbound lebih besar daripada stok tersedia sekarang!')
            return;
        }
        
        axios.post(uri,data)
            .then(response=>{
                Alert.alert('Berhasil!','Berhasil untuk meminta permintaan '+request);
                setRequest('');
                setSelected();
                requestSheetRef.current.close();
            })
            .catch(e=>{
                console.log(e.response);
                Alert.alert('Terjadi Kesalahan','Gagal untuk meminta permintaan '+request+', '+e.response.message)
            })
    }

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

    useEffect(()=>{
        if (selected && request != '') {
            requestSheetRef.current.open();
        }
    },[selected,request]);
    
    const getItem = async() =>{
        try {
            const response = await axios.get('/items/'+params.id);
            setItems(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getItem()
    },[])

    return(
        <Container>
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=>{
                            setItems(undefined);
                            getItem()
                        }}
                    />
                }
            >
                <View style={{
                    padding:15,
                }}>
                    <Text>{items?.status}</Text>
                    <Text weight="semi" size={17} >{items?.name}</Text>
                </View>
                <View style={{
                    paddingHorizontal:15,
                    borderTopWidth:10,
                    borderTopColor:Colors.grey1,
                    paddingTop:10,
                }} >
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between",
                        marginBottom:15,
                    }} >
                        <Text weight="semi" size={17} >Variasi Item</Text>
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate('AddVariant',{
                                    id:items?._id
                                })
                            }}
                        >
                            <Text weight="semi" color="primary" >Tambahkan Variasi</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        items?.item_variants.map((v:any)=>{
                            return(
                                <View key={v._id} style={{
                                    paddingBottom:10,
                                    marginBottom:10,
                                    borderBottomWidth:1,
                                    borderBottomColor:Colors.grey1,
                                }} >
                                    <View>
                                        <Text size={10} >{v.sku}</Text>
                                        <Text weight="semi" >{v.name}</Text>
                                        <Text>Stock Tersedia : {v.stock}</Text>
                                    </View>
                                    {
                                        user.role_id == 2 &&
                                        <View>
                                            <View style={{
                                                marginVertical:10,
                                            }} >
                                                <Text>Buat Request</Text>
                                            </View>
                                            <View style={{
                                                flexDirection:"row",
                                            }} >
                                                <TouchableOpacity style={{
                                                    padding:10,
                                                    backgroundColor:Colors.danger,
                                                    flex:1,
                                                    marginRight:10,
                                                    alignItems:"center",
                                                    borderRadius:10,
                                                }}
                                                onPress={()=>{
                                                    setRequest('outbound');
                                                    setSelected(v)
                                                }}
                                                >
                                                    <Text weight="medium" color="white" >Outbound</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{
                                                    padding:10,
                                                    backgroundColor:Colors.primary,
                                                    flex:1,
                                                    alignItems:"center",
                                                    borderRadius:10,
                                                }}onPress={()=>{
                                                    setRequest('inbound')
                                                    setSelected(v)
                                                }}>
                                                    <Text weight="medium" color="white" >Inbound</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>

            {requestSheet()}

        </Container>
    )
}