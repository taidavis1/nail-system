import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    color,
    interpolateColor,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

function ColorPicker({ colors, start, end, style, maxWidth, onColorChanged }) {
    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // const translateX = useSharedValue(0); //! storing the previous Position
    const translateX = useSharedValue(randomIntFromInterval(0, (maxWidth * (colors.length - 1)) / colors.length - CIRCLE_PICKER_SIZE));
    // const translateY = useSharedValue(0);
    // const scale = useSharedValue(1);

    //! the adjustedTranslateX will be derived from translateX
    const adjustedTranslateX = useDerivedValue(() => {
        return Math.min(Math.max(translateX.value, 0), maxWidth - CIRCLE_PICKER_SIZE);
    });

    const panGestureHandler = useAnimatedGestureHandler({
        //! handle pinch gesture, top gesture and pan Gesture
        //! here we can access some callbacks
        onStart: (_, context) => {
            context.x = adjustedTranslateX.value;
            // translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
            // scale.value = withSpring(1.2);
        }, //! onStart callback
        onActive: (event, context) => {
            //! each callback have 2 params, context will share value onStart - onEnd
            //! Active callback, we can access the Event
            translateX.value = context.x + event.translationX;
            console.log(`event Translation X: `, event.translationX); //! do luot
        },
        onEnd: () => {
            // translateY.value = withSpring(0);
            // scale.value = withSpring(1);
        }, //! End callback
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: adjustedTranslateX.value }],
        };
    }); //! reanimated Style

    const rInternalPickerStyle = useAnimatedStyle(() => {
        const inputRange = colors.map((_, index) => {
            return (index / colors.length) * maxWidth;
        });
        // const backgroundColor = interpolateColor(translateX.value, inputRange, colors);
        const backgroundColor = '#' + (interpolateColor(translateX.value, inputRange, colors) & 0x00ffffff).toString(16).padStart(6, '0');
        // console.log(`colorCode: `, colorCode);
        //! 2nd: Input Range
        //! 3th: Output Range

        onColorChanged?.(backgroundColor);

        return {
            backgroundColor: backgroundColor,
        };
    });

    return (
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={{ justifyContent: 'center' }}>
                <LinearGradient colors={colors} start={start} end={end} style={style} />
                <Animated.View style={[styles.picker, rStyle]}>
                    <Animated.View style={[styles.internalPicker, rInternalPickerStyle]} />
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    );
}

const CIRCLE_PICKER_SIZE = 35;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const styles = StyleSheet.create({
    picker: {
        position: 'absolute',
        // backgroundColor: '#fff',
        backgroundColor: '#f0f0f0',
        width: CIRCLE_PICKER_SIZE,
        height: CIRCLE_PICKER_SIZE,
        borderRadius: CIRCLE_PICKER_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    internalPicker: {
        width: INTERNAL_PICKER_SIZE,
        height: INTERNAL_PICKER_SIZE,
        borderRadius: INTERNAL_PICKER_SIZE / 2,
        borderWidth: 1.0,
        borderColor: 'rgba(0,0,0,0.2)',
    },
});

export default ColorPicker;
