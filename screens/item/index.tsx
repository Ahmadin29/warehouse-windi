import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";
import Container from "../../components/Container";
import ItemList from "../../components/Item/list";
import Colors from "../../constants/Colors";

export default function Item() {

    const navigation = useNavigation();

    return(
        <Container>
            <ItemList/>
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
        </Container>
    )
}