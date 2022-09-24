import React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconEditOutline = ({ keyIcon, activeKeyIcon, sizeIcon, theme }) => {
    const styles = {
        st0: {
            fill: keyIcon === activeKeyIcon ? theme.colors.text1 : 'none',
            stroke: theme.colors.text1,
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: 2,
        },
    };

    return (
        <Svg id="icon-edit-outline" viewBox={`0 0 32 32`} width={sizeIcon || 32} height={sizeIcon || 32}>
            <Path style={styles.st0} d="M17.69,18.56l-5,.7.7-5L26.17,1.59a2,2,0,0,1,2.83,0L30.41,3a2,2,0,0,1,0,2.83Z" />
            {keyIcon === activeKeyIcon ? (
                <Path
                    style={styles.st0}
                    d="M19.57,22.33l-1,.14-6.6.94L8,24l.57-4,.94-6.6.14-1,.71-.71L19.1,3H5A4,4,0,0,0,1,7V27a4,4,0,0,0,4,4H25a4,4,0,0,0,4-4V12.9l-8.72,8.72Z"
                />
            ) : (
                <Path style={styles.st0} d="M19.1,3H5A4,4,0,0,0,1,7V27a4,4,0,0,0,4,4H25a4,4,0,0,0,4-4V12.9" />
            )}
        </Svg>
    );
};

export default IconEditOutline;
