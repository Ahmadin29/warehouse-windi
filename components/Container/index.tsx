import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';

interface ContainerStyle {
    style?          : ViewStyle | ViewStyle[],
    children?       :   any
}

export default function Container(props:ContainerStyle) {
    return(
        <View
            {...props}
            style={[
                props.style,
                {
                    flex:1,
                    backgroundColor:Colors.white,
                }
            ]}
        />
    )
}