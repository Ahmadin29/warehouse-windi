import { View } from "react-native";
import Colors from "../../constants/Colors";
import Text from "../Text";

export default function StockStatistics (){
    return(
        <View style={{
            margin:15,
            padding:15,
            elevation:3,
            backgroundColor:Colors.white,
            borderRadius:10,
        }} >
            <Text weight="semi" >Statistik Item</Text>
            <View style={{
                marginBottom:10,
                marginTop:10,
            }} >
                <Text>Total Item</Text>
                <Text color="textSecondary" >20 Item</Text>
            </View>
            <View style={{
                marginBottom:10,
            }} >
                <Text>Item Tersedia</Text>
                <Text color="textSecondary" >300 Item</Text>
            </View>
            <View style={{
                marginBottom:10,
            }} >
                <Text>Item Tidak Tersedia</Text>
                <Text color="textSecondary" >300 Item</Text>
            </View>
        </View>
    )
}