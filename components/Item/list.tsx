import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import Colors from "../../constants/Colors";
import Button from "../Button";
import Text from "../Text";

export default function ItemList() {

    const navigation = useNavigation();

    const [item,setItem] = useState([]);

    useEffect(()=>{
        getItem();
    },[])

    const getItem = async()=>{
        try {
            const response = await axios.get('/items')
            setItem(response.data.data)
        } catch (error) {
            console.log(error);   
        }
    }

    const renderItem = ({item}:any)=>{
        return(
            <View style={{
                borderWidth:1,
                marginBottom:10,
                padding:10,
                borderRadius:10,
            }} >
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center"
                }} >
                    <Text weight="semi" >{item.name}</Text>
                    <Text size={12} >{item.status}</Text>
                </View>
                <View style={{
                    marginTop:10,
                    borderRadius:10,
                }} >
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between",
                        marginBottom:10,
                        borderBottomWidth:1,
                        paddingBottom:10,
                    }} >
                        <Text weight="semi">Variant</Text>
                        <Text weight="semi">Stock</Text>
                    </View>
                    {
                        item.item_variants.map((v:any)=>{
                            return(
                                <View key={v._id} style={{
                                    marginBottom:10,
                                    borderBottomWidth:1,
                                    paddingBottom:10,
                                    flexDirection:"row",
                                    alignItems:"center",
                                    borderBottomColor:Colors.grey1,
                                    justifyContent:"space-between",
                                }} >
                                    <Text>{v.name}</Text>
                                    <Text>{v.stock}</Text>
                                </View>
                            )
                        })
                    }
                    <Button
                        label="Lihat Detail"
                        onPress={()=>{
                            navigation.navigate('ItemDetail',{
                                id:item._id
                            })
                        }}
                    />
                </View>
            </View>
        )
    }

    return(
        <View style={{
            paddingHorizontal:15,
        }} >
            <FlatList
                data={item}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=>{
                            setItem([]);
                            getItem()
                        }}
                    ></RefreshControl>
                }
            />
        </View>
    )
}