import React from 'react';
import Svg, { Circle, Polyline } from 'react-native-svg';

const IconTurnTrackingOutline = ({ keyIcon, activeKeyIcon, sizeIcon, theme }) => {
    const styles = {
        st0: {
            stroke: theme.colors.text1,
            fill: keyIcon === activeKeyIcon ? theme.colors.text1 : 'none',
            strokeLinecap: 'round',
            strokeMiterlimit: 10,   
            strokeWidth: 2,
        },
        st1: {
            stroke: keyIcon === activeKeyIcon ? theme.colors.boxBackground : theme.colors.text1,
        },
    };

    return (
        <Svg id="icon-appointment-outline" viewBox={`0 0 32 32`} width={sizeIcon || 32} height={sizeIcon || 32}>
            <Circle style={styles.st0} cx="15.5" cy="15.5" r="14.5" />
            <Polyline style={[styles.st0, styles.st1]} class="cls-1" points="15.5 4 15.5 16 21.5 16" />
        </Svg>
    );
};

export default IconTurnTrackingOutline;
