import { Dimensions, Platform } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export const screenWidth = viewportWidth;
export const screenheight = viewportHeight;
export const APPBAR_HEIGHT = Platform.select({
    ios: 44,
    android: 56,
    default: 64,
});
