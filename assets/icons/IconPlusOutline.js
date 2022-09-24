import React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconPlusOutline = ({ keyIcon, activeKeyIcon, sizeIcon, theme, color }) => {
    const styles = {
        st0: {
            stroke: color ? color : theme?.colors.text1,
            fill: color ? color : theme?.colors.text1,
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: 2,
        },
    };

    return (
        <Svg id="icon-add-outline" viewBox={`0 0 32 32`} width={sizeIcon || 32} height={sizeIcon || 32}>
            <Path
                style={styles.st0}
                d="M29,13.5H18.5V3a2,2,0,0,0-2-2h-1a2,2,0,0,0-2,2V13.5H3a2,2,0,0,0-2,2v1a2,2,0,0,0,2,2H13.5V29a2,2,0,0,0,2,2h1a2,2,0,0,0,2-2V18.5H29a2,2,0,0,0,2-2v-1A2,2,0,0,0,29,13.5Z"
            />
        </Svg>
    );
};

export default IconPlusOutline;
