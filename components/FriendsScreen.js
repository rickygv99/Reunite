import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native'
import { Avatar, Icon, SearchBar } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import PopoverTooltip from 'react-native-popover-tooltip';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class FriendsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <Icon name='person-add' size={34} type='material' color='#f50' containerStyle={{marginRight: 20}} onPress={() => navigation.navigate('AddFriends')}/>
    };
  };

  updateSearch = search => {
    this.setState({ search });
  }

  getFriendItem(navigation, dispatch, firstName, lastName, location, picture, isFavorite) {
    let favoriteLabel = 'Favorite'
    if (isFavorite) {
      favoriteLabel = 'Unfavorite'
    }
    return (
      <View style={styles.listItem}>
        <Avatar
          size={50}
          rounded
          source={picture}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
          <View style={styles.listItemLocationPanel}>
            <Icon name='location-on' size={16} type='material' color='#f50'/>
            <Text style={styles.listItemLocation}>{`${location}`}</Text>
          </View>
        </View>
        <PopoverTooltip
          buttonComponent={
            <View style={styles.tooltipMenu}>
              <Icon name='dots-horizontal' size={34} type='material-community' color='#f50'/>
            </View>
          }
          items={[
            {
              label: favoriteLabel,
              onPress: () => dispatch({ type: 'FAVORITE', firstName, lastName })
            }
          ]}
        />
      </View>
    );
  }

  render () {
    let { search } = this.state

    let normal = []
    let favorites = []
    for (let i = 0; i < this.props.friends.length; i++) {
      if (this.props.friends[i].favorite) {
        favorites.push(this.props.friends[i])
      } else {
        normal.push(this.props.friends[i])
      }
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchBar
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme
          style={{
            position: 'absolute'
          }}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />
        <ScrollView style={styles.friendsPanel}>
          <Text style={styles.friendsText}>Favorites</Text>
          <FlatList
            data={favorites}
            renderItem={({ item }) => this.getFriendItem(this.props.navigation, this.props.dispatch, item.firstName, item.lastName, item.location, item.picture, true)}
            keyExtractor={item => item.firstName + item.lastName}
          />
          <Text style={styles.friendsText}>Friends</Text>
          <FlatList
            data={normal}
            renderItem={({ item }) => this.getFriendItem(this.props.navigation, this.props.dispatch, item.firstName, item.lastName, item.location, item.picture, false)}
            keyExtractor={item => item.firstName + item.lastName}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  friendsPanel: {
    position: 'absolute',
    top: '9%',
    height: '91%',
    width: '100%'
  },
  friendsText: {
    fontSize: 20,
    marginTop: '3%',
    marginLeft: '5%'
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchBarInput: {
    backgroundColor: '#ECEFF1',
    borderRadius: 20
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray'
  },
  listItemText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  listItemName: {
    fontSize: 18
  },
  listItemLocationPanel: {
    flexDirection: 'row',
    marginTop: '2%'
  },
  listItemLocation: {
    fontSize: 14
  },
  tooltipMenu: {
    alignSelf: 'flex-end',
    marginRight: 20
  }
})

function mapStateToProps(state) {
  const { friends } = state;
  return {
    friends
  };
}

export default connect(mapStateToProps)(FriendsScreen)
