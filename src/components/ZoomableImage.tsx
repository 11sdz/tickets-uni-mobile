import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    clamp,
} from "react-native-reanimated";
import LottieAnimation from "./LottieAnimation";

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
    const [loading, setLoading] = React.useState(false);
    const baseScale = useSharedValue(1);
    const pinchScale = useSharedValue(1);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const panFactor = 0.4;

    const MIN_SCALE = 1;
    const MAX_SCALE = 5;

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            pinchScale.value = event.scale;
        })
        .onEnd(() => {
            // Clamp and set the new base scale
            const newScale = baseScale.value * pinchScale.value;
            baseScale.value = clamp(newScale, MIN_SCALE, MAX_SCALE);

            // Reset gesture scale for next time
            pinchScale.value = 1;
        });

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = offsetX.value + event.translationX * panFactor;
            translateY.value = offsetY.value + event.translationY * panFactor;
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        });

    const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => {
        const finalScale = clamp(baseScale.value * pinchScale.value, MIN_SCALE, MAX_SCALE);

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
            >{loading && <LottieAnimation 
                    source={require("../assets/lottie/loading.json")}
            />}
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
                    onLoadStart={() => {setLoading(true)}} // Start loading animation
                    onLoadEnd={() => {setLoading(false)}}
                />
            </Animated.View>
        </GestureDetector>
    );
};

export default ZoomableImage;
