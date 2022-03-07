import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert, View } from "react-native";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Text from "../../components/Text";

export default function AddItem(props:any) {

    const params = props.route.params;

    const [_name,setName] = useState('');
    const [_description,setDescription] = useState("");
    
    const [loadingAdd,setLoadingAdd] = useState(false);

    const navigation = useNavigation();

    const createVariant = async()=>{

        const data = {
            _name,
            _description
        }

        setLoadingAdd(true);

        try {
            await axios.post('/items/create',data);
            Alert.alert('Perhatian!','Berhasil menambahkan Item!');
            navigation.goBack();
        } catch (error:any) {
            console.log(error.response);
            
            setLoadingAdd(false);
            Alert.alert('Terjadi Kesalahan','Gagal untuk menambahkan Item, '+error?.response.data.message)
        }

    }

    return(
        <Container>
            <View style={{
                padding:15,
            }} >
                <Input
                    label="Nama Item"
                    onChangeText={(text)=>{
                        setName(text)
                    }}
                    containerStyle={{
                        marginBottom:15,
                    }}
                />

                <Input
                    label="Deskripsi"
                    onChangeText={(text)=>{
                        setDescription(text)
                    }}
                    containerStyle={{
                        marginBottom:15,
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