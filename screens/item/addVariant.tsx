import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert, View } from "react-native";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Text from "../../components/Text";

export default function AddVariant(props:any) {

    const params = props.route.params;

    const [_name,setName] = useState('');
    const [_first_stock,setFirstStock] = useState(0);
    
    const [loadingAdd,setLoadingAdd] = useState(false);

    const navigation = useNavigation();

    const createVariant = async()=>{

        const data = {
            _name,
            _first_stock,
        }

        setLoadingAdd(true);

        try {
            await axios.post('/items/'+params.id+'/create-variant',data);
            Alert.alert('Perhatian!','Berhasil menambahkan variant!');
            navigation.goBack();
        } catch (error:any) {
            console.log(error.response);
            
            setLoadingAdd(false);
            Alert.alert('Terjadi Kesalahan','Gagal untuk menambahkan variasi, '+error?.response.data.message)
        }

    }

    return(
        <Container>
            <View style={{
                padding:15,
            }} >
                <Input
                    label="Nama Variasi"
                    onChangeText={(text)=>{
                        setName(text)
                    }}
                    containerStyle={{
                        marginBottom:15,
                    }}
                />
                <Input
                    label="Jumlah Stock Awal"
                    keyboardType="numeric"
                    onChangeText={(text)=>{
                        setFirstStock(text)
                    }}
                />

                <Button
                    label="Tambahkan Variasi"
                    style={{
                        marginTop:15,
                    }}
                    loading={loadingAdd}
                    onPress={()=>{
                        createVariant()
                    }}
                />
            </View>
        </Container>
    )
}