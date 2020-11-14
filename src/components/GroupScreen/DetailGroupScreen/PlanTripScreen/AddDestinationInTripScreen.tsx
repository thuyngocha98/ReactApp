import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import Colors from '../../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import ListItemSelectDestination from '../../../SearchScreen/PlanTripScreen/ListItemSelectDestination';
import Constants from 'expo-constants';

type Props = {
  navigation?: any;
};

type State = {
  data: any[];
  values: string;
};

class AddDestinationScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  mainData: any[];
  state = {
    values: '',
    data: [],
  };
  arrData: any[];

  componentDidMount() {
    const data = this.props.navigation.getParam('data', '');
    this.mainData = [...data.map((item) => ({ ...item, selected: false }))];
    this.setState({ data: [...data.map((item) => ({ ...item, selected: false }))] });
  }

  searchFilterFunction = (text) => {
    let textSearch = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase(); // remove accent
    this.setState({
      values: text,
    });
    if (text == '') {
      this.setState({ data: this.mainData });
    } else {
      let newData = this.mainData.filter((el) => {
        return el.noAccent.indexOf(textSearch) > -1;
      });
      this.setState({ data: newData });
    }
  };

  selectedDestination = () => {
    let destination = this.state.data.filter((el) => el.selected == true);
    this.props.navigation.navigate('DetailPlanInTripScreen', { destination: destination });
  };

  render() {
    const RenderItem = ({ item, index }) => (
      <ListItemSelectDestination
        item={item}
        onPressAdd={() => onPressHandler(index)}
        onNavigate={() => this.props.navigation.navigate('DescriptionLocationInTripScreen', { data: item })}
      />
    );

    const onPressHandler = async (index) => {
      let renderData = [...this.state.data];
      renderData[index].selected = !renderData[index].selected;
      this.setState({ data: renderData });
    };

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerLeft}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons name="md-arrow-back" size={28} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chọn điểm đến</Text>
            <TouchableOpacity style={styles.headerRight} onPress={() => this.selectedDestination()}>
              <Text style={styles.textHeaderRight}>Kết thúc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SearchBar
          onFocus={() => this.searchFilterFunction('')}
          autoFocus
          placeholder="Điểm đến..."
          lightTheme
          clearIcon={{ size: 24, name: 'clear' }}
          round={true}
          searchIcon={{ size: 26, name: 'search', color: Colors.tintColor }}
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.values}
          inputStyle={styles.input}
          inputContainerStyle={styles.containerInput}
          containerStyle={styles.containerSearchBar}
        />
        <View style={styles.viewList}>
          <FlatList
            initialNumToRender={8}
            keyboardShouldPersistTaps="handled"
            extraData={this.state}
            data={this.state.data}
            renderItem={RenderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    width: screenWidth,
    height: APPBAR_HEIGHT + Constants.statusBarHeight,
    backgroundColor: Colors.tabIconSelected,
  },
  header: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  headerLeft: {
    paddingLeft: screenWidth / 27,
    paddingRight: screenWidth / 24,
    paddingVertical: screenWidth / 72,
  },
  headerRight: {
    paddingLeft: screenWidth / 24,
    paddingRight: screenWidth / 27,
    paddingVertical: screenWidth / 72,
  },
  textHeaderRight: {
    fontSize: 17,
    color: Colors.white,
  },
  viewList: {
    flex: 1,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: screenWidth / 27.43,
    paddingVertical: screenWidth / 27.43,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavender,
  },
  viewImage: {
    width: screenWidth / 3.8,
    height: screenWidth / 6.43,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: screenWidth / 36,
  },
  image: {
    width: screenWidth / 3.8,
    height: screenWidth / 6.43,
    resizeMode: 'cover',
  },
  viewContent: {
    flex: 1,
  },
  txtTitle: {
    color: Colors.blackText,
    fontSize: 13,
    fontWeight: 'bold',
  },
  txtDesc: {
    color: Colors.gray,
    fontSize: 13,
    fontStyle: 'italic',
  },
  viewAdd: {
    height: screenWidth / 6.43,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: screenWidth / 27.43,
    paddingLeft: screenWidth / 20,
  },
  input: {
    width: screenWidth / 2.2,
    height: screenWidth / 9,
    fontSize: 16,
    color: Colors.blackText,
  },
  containerInput: {
    borderRadius: screenWidth / 82.2,
    elevation: 0,
    backgroundColor: Colors.background,
    borderWidth: 0.8,
    borderColor: Colors.tintColor,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.tintColor,
  },
  containerSearchBar: {
    paddingHorizontal: screenWidth / 27.4,
    paddingVertical: screenWidth / 20,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});

export default AddDestinationScreen;
