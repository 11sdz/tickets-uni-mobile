import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get("window"); // Get the width and height of the window

interface LottieAnimationProps {
    source: any; // Animation JSON file
    autoPlay?: boolean;
    loop?: boolean;
    porportion?: number; // Optional: proportion of the screen width to use for the animation size
}

const LottieAnimation = forwardRef<Partial<LottieView>, LottieAnimationProps>(
    ({ source, autoPlay = true, loop = true, porportion = 0.5 }, ref) => {
        const localRef = useRef<LottieView>(null); // Create internal ref if none is provided

        // Expose play, pause, reset methods only if ref is provided
        useImperativeHandle(ref, () => ({
            play: () => localRef.current?.play?.(),
            pause: () => localRef.current?.pause?.(),
            reset: () => localRef.current?.reset?.(),
        }));

        return (
            <View style={styles.container}>
                <LottieView
                    ref={localRef}
                    source={source}
                    autoPlay={autoPlay}
                    loop={loop}
                    style={{ width: porportion * width, height: porportion * width }}
                />
            </View>
        );
    }
);

export default LottieAnimation;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
