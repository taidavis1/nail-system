import React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconQuit = ({ nameIcon, activeNameIcon, sizeIcon, theme }) => {

    const styles = {
        st0: {
            fill: theme.colors.text1,
            stroke: 'none',
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: 2,
        },
    };

    return (
        <Svg id="icon-services-outline" viewBox={`0 0 32 32`} width={sizeIcon || 32} height={sizeIcon || 32}>
            <Path style={styles.st0}  d="M18.12,16,31.56,2.56A1.5,1.5,0,0,0,29.44.44L16,13.88,2.56.44A1.5,1.5,0,0,0,.44,2.56L13.88,16,.44,29.44a1.49,1.49,0,0,0,0,2.12,1.5,1.5,0,0,0,2.12,0L16,18.12,29.44,31.56a1.5,1.5,0,0,0,2.12,0,1.49,1.49,0,0,0,0-2.12Z" />
        </Svg>
    );
};

export default IconQuit;
