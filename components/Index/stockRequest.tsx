import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import Colors from "../../constants/Colors";
import Button from "../Button";
import Text from "../Text";

export default function StockRequest(props:any) {

    const [data,setData] = useState()

    const [accepting,setAccepting] = useState(false);

    useEffect(()=>{
        setData(props.data)
    },[])

    const acceptRequest = (id:any)=>{

        const request = {
            _id:data.id
        }

        setAccepting(true);

        axios.post('/stock/accept-inbound',request)
        .then(response=>{
            setAccepting(false);
            console.log(response);
        })
        .catch(e=>{
            setAccepting(false);
            console.log(e.response);
            
        })
    }

    return(
        <View style={{
            margin:15,
            marginTop:0,
        }} >
            <Text weight="semi" >Permintaan Persetujuan Stok</Text>
            {
                data?.map((v:any)=>{
                    return(
                        <View key={v._id} style={{
                            padding:10,
                            elevation:3,
                            backgroundColor:Colors.white,
                            marginTop:15,
                            borderRadius:10,
                        }} >
                            <View style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center"
                            }} >
                                <View>
                                    <Text weight="semi" >{v.item.item.name}</Text>
                                    <Text size={10} >Variant {v.item.variant.name}</Text>
                                </View>
                                <View>
                                    <Text weight="semi" style={{
                                        textAlign:"right"
                                    }} >Jumlah</Text>
                                    <Text size={10} style={{
                                        textAlign:"right"
                                    }}>{v.amount} Item</Text>
                                </View>
                            </View>
                            <Divider
                                style={{
                                    marginVertical:10,
                                    height:2,
                                }}
                            />
                            <View style={{
                                flexDirection:"row",
                                justifyContent:"flex-end"
                            }} >
                                <Button
                                    label="Tolak"
                                    size="small"
                                    color="danger"
                                    bordered
                                    style={{
                                        marginRight:10,
                                    }}
                                    onPress={()=>{
                                        acceptRequest(v._id)
                                    }}
                                />
                                <Button
                                    label="Terima"
                                    size="small"
                                    loading={accepting}
                                />
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}