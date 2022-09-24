import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const IconBarsOutline = (props) => {
    const styles = {
        st0: {
            fill: 'none',
            stroke: props.theme.colors.text1,
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: 2,
        },
    };

    return (
        <TouchableOpacity style={[props.style]} onPress={props.onPress}>
            <Svg id="icon-bars-outline" viewBox={`0 0 32 32`} width={props.sizeIcon || 32} height={props.sizeIcon || 32}>
                <Rect style={styles.st0} x="1" y="21" width="30" height="3" rx="1" />
                <Rect style={styles.st0} x="1" y="14" width="30" height="3" rx="1" />
                <Rect style={styles.st0} x="1" y="7" width="30" height="3" rx="1" />
            </Svg>
        </TouchableOpacity>
    );
};

export default IconBarsOutline;
