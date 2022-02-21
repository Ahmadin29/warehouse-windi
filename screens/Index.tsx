import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Container from "../components/Container";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Text from "../components/Text";
import Colors from "../constants/Colors";
import StockStatistics from "../components/Index/statistics";
import StockRequest from "../components/Index/stockRequest";

export default function Index() {

    const [stockRequest,setStockRequest] = useState();

    const getRequestStock = async()=>{
        
        try {
            const response = await axios.get('/stock');
            setStockRequest(response.data.data);
        } catch (error) {
            console.log(error.response);
        }

    }

    useEffect(()=>{

        axios.defaults.headers.common["x-api-key"] = 'f8051e8452f0f943c6aa62392a05feab5273669775f43f8781bd103c55088bec';

        getRequestStock();
    },[])

    return(
        <Container>
            <StockStatistics/>
            <StockRequest data={stockRequest} />
        </Container>
    )
}