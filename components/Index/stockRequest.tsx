import { View } from "react-native";
import { Divider } from "react-native-paper";
import Colors from "../../constants/Colors";
import Button from "../Button";
import Text from "../Text";

export default function StockRequest(props:any) {

    const data = props.data

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
                                />
                                <Button
                                    label="Terima"
                                    size="small"
                                />
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}