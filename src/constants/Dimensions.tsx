import { Dimensions } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export const screenWidth = viewportWidth;
export const screenheight = viewportHeight;