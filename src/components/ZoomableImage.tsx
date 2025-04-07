import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    withDecay,
} from "react-native-reanimated";

type ZoomableImageProps = {
    imageUri: string | number;
    imageWidth?: number;
    imageHeight?: number;
};

const ZoomableImage = ({
    imageUri,
    imageWidth = 300,
    imageHeight = 300,
}: ZoomableImageProps) => {
    const pinchScale = useSharedValue(1);
    const baseScale = useSharedValue(1);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const panFactor = 0.4; // 👈 slow down panning

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            const newScale = event.scale;
            pinchScale.value = Math.max(newScale, 1); // 👈 Prevent zoom out below 1
        })
        .onEnd((event) => {
            baseScale.value *= pinchScale.value;
            pinchScale.value = 1;
        });

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = offsetX.value + event.translationX*panFactor;
            translateY.value = offsetY.value + event.translationY*panFactor;
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        });

    const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => {
        const finalScale = pinchScale.value *baseScale.value

        return {
            transform: [
                { scale: finalScale },
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.View
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    overflow: "hidden",
                }}
            >
                <Animated.Image
                    source={
                        typeof imageUri === "string"
                            ? { uri: imageUri }
                            : imageUri
                    }
                    style={[
                        { width: imageWidth, height: imageHeight },
                        animatedStyle,
                    ]}
                    resizeMode="contain"
                />
            </Animated.View>
        </GestureDetector>
    );
};

export default ZoomableImage;
