import { screenHeight, screenWidth } from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import { StyleSheet, Platform } from "react-native";

export const CELL_SIZE = screenWidth/6.85;
export const CELL_BORDER_RADIUS = screenWidth/51.375;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = Colors.tintColor;
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const verifyScreenStyles = StyleSheet.create({
    codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        // paddingHorizontal: 20,
        justifyContent: 'center',
      },
      cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({web: {lineHeight: 65}}),
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: '#3759b8',
        backgroundColor: '#fff',
    
        // IOS
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        // Android
        elevation: 3,
      },
    inputWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: screenWidth/20.55,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputLabel: {
        paddingTop: screenWidth/8.22,
        color: '#000',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        paddingBottom: screenWidth/10.275,
    },

    icon: {
        width: screenWidth/4.5465,
        height: screenWidth/6.2434,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    inputSubLabel: {
        paddingTop: screenWidth/13.7,
        color: '#000',
        textAlign: 'center',
    },
    inputWrapStyle: {
        height: CELL_SIZE,
        marginTop: screenWidth/13.7,
        paddingHorizontal: screenWidth/20.55,
        justifyContent: 'space-between',
    },

    input: {
        margin: 0,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: screenWidth/7.473,
        ...Platform.select({
            web: {
                lineHeight: screenWidth/6.323,
            },
        }),
        fontSize: screenWidth/13.7,
        borderRadius: CELL_BORDER_RADIUS,
        color: Colors.tintColor,
        backgroundColor: '#fff',

        // IOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },

    nextButton: {
        marginTop: screenWidth/10.275,
        borderRadius: screenWidth/5.87,
        minHeight: screenWidth/5.87,
        backgroundColor: Colors.tintColor,
        justifyContent: 'center',
        minWidth: screenWidth/1.142,
        marginBottom: screenWidth/4.11,
    },

    nextButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    

});

export default verifyScreenStyles;
