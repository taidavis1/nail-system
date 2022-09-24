import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

const IconEmployeesOutline = ({ keyIcon, activeKeyIcon, sizeIcon, theme }) => {
    const styles = {
        st0: {
            fill: keyIcon === activeKeyIcon ? theme.colors.text1 : 'none',
            stroke: keyIcon === activeKeyIcon ? theme.colors.text1 : theme.colors.text1,
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: 2,
        },
        st1: {
            fill: keyIcon === activeKeyIcon ? theme.colors.boxBackground : theme.colors.text1,
            stroke: keyIcon === activeKeyIcon ? theme.colors.text1 : theme.colors.boxBackground,
        },
    };

    return (
        <Svg id="icon-employees-outline" viewBox={`0 0 32 28`} width={sizeIcon || 32} height={sizeIcon || 32}>
            <Circle style={styles.st0} cx="11" cy="6.5" r="5.5" />
            <Path style={styles.st0} d="M21,23.6c0,4.6-20,4.6-20,0s5.4-8.33,10-8.33S21,19,21,23.6Z" />
            <Circle style={styles.st0} cx="23.62" cy="8.03" r="4" />
            {keyIcon === activeKeyIcon ? (
                <Path
                    id="_Path-active_"
                    style={styles.st0}
                    d="M23.62,14.87a7.5,7.5,0,0,0-2.52.48A11.25,11.25,0,0,1,25,23.52c3.18-.18,6-1,6-2.5C31,17.62,27,14.87,23.62,14.87Z"
                />
            ) : (
                <Path style={styles.st0} d="M25,23.52c3.18-.18,6-1,6-2.5,0-3.4-4-6.15-7.38-6.15a7.5,7.5,0,0,0-2.52.48" />
            )}
        </Svg>
    );
};

export default IconEmployeesOutline;

{
    /* <Rect style={styles.st0} x="1" y="1" width="30" height="30" rx="2" />
<Rect style={[styles.st0, styles.st1]} x="5" y="5" width="22" height="4" rx="2" />
<Rect style={[styles.st0, styles.st1]} x="5" y="14" width="22" height="4" rx="2" />
<Rect style={[styles.st0, styles.st1]} x="5" y="23" width="22" height="4" rx="2" /> */
}
