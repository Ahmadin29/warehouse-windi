import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(()=>{
    axios.defaults.baseURL = "http://192.168.100.9:3000";
  },[]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaView style={{
        flex:1,
      }}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaView>
    );
  }
}
