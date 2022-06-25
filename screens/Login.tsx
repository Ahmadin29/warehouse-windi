import * as React from 'react';
import Button from '../components/Button';
import Container from "../components/Container";
import Input from '../components/Input';
import Text from "../components/Text";
import { CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');

    const navigation = useNavigation();

    const processLogin = ()=>{
        const data = {
            username:username,
            password:password,
        }

        axios.post('/user/login',{
            username,
            password
        })
        .then(response=>{

            console.log(response);
            
            
            setSession(response.data.data)
        })
        .catch(e=>{
            console.log(e.response);
            Alert.alert('Terjadi kesalahan','Gagal untuk login, '+e.response.data.message)
        })
    }

    const setSession = async(data:object)=>{

        await AsyncStorage.setItem('session',JSON.stringify(data));

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Root' },
                ],
            })
        )
    }

    return(
        <Container style={{
            padding:15,
            justifyContent:"center"
        }} >
            <Input
                label="Username"
                value={username}
                onChangeText={(text:any)=>{
                    setUsername(text)
                }}
                containerStyle={{
                    marginBottom:10,
                }}
            />
            <Input
                label="Password"
                value={password}
                onChangeText={(text:any)=>{
                    setPassword(text)
                }}
            />
            <Button
                label='Selanjutnya'
                style={{
                    marginTop:15,
                }}
                onPress={()=>{
                    processLogin()
                }}
            />
        </Container>
    )
}