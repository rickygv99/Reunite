import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Button, ListItem, Icon, SearchBar } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'

class AddFriendsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      requests: [
        {
          firstName: "Angela",
          lastName: "Merkel",
          picture: require("../assets/angela_merkel.jpg")
        },
        {
          firstName: "Pete",
          lastName: "Buttigieg",
          picture: require("../assets/pete_buttigieg.jpg")
        }
      ],
      quick: [
        {
          firstName: "Justin",
          lastName: "Bieber",
          numMutuals: 2,
          picture: require("../assets/justin_bieber.jpg")
        }
      ]
    }
  }

  updateSearch = search => {
    this.setState({ search });
  }

  getRequestItem(firstName, lastName, picture) {
    return (
      <View style={styles.listItem}>
        <Avatar
          size={40}
          rounded
          source={picture}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
        </View>
        <TouchableOpacity style={styles.addFriendButton}>
          <Icon name='person-add' size={24} type='material' color='white' />
          <Text style={styles.addFriendButtonText}>Add</Text>
        </TouchableOpacity>
        <Icon name='close' size={24} type='material' color='lightgray'/>
      </View>
    );
  }

  getQuickItem(firstName, lastName, numMutuals, picture) {
    return (
      <View style={styles.listItem}>
        <Avatar
          size={40}
          rounded
          source={picture}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.listItemNumMutuals}>{`${numMutuals} mutual friends`}</Text>
        </View>
        <TouchableOpacity style={styles.addFriendButton}>
          <Icon name='person-add' size={24} type='material' color='white' />
          <Text style={styles.addFriendButtonText}>Add</Text>
        </TouchableOpacity>
        <Icon name='close' size={24} type='material' color='lightgray'/>
      </View>
    );
  }

  render () {
    let { search, requests, quick } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchBar
          placeholder="Find Friends"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />
        <Button
          containerStyle={styles.facebookButtonContainer}
          buttonStyle={styles.facebookButton}
          title=' Add friends from Facebook'
          icon={<Icon name='facebook-box' size={24} type='material-community' color='white'/>}
        />
        <ScrollView>
          <Text style={styles.requestsText}>Requests</Text>
          <FlatList
            data={this.state.requests}
            renderItem={({ item }) => this.getRequestItem(item.firstName, item.lastName, item.picture)}
            keyExtractor={item => item.firstName + item.lastName}
          />
          <Text style={styles.requestsText}>People you may know</Text>
          <FlatList
            data={this.state.quick}
            renderItem={({ item }) => this.getQuickItem(item.firstName, item.lastName, item.numMutuals, item.picture)}
            keyExtractor={item => item.firstName + item.lastName}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  requestsText: {
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
  facebookButtonContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    height: '8%'
  },
  facebookButton: {
    backgroundColor: '#3B5998'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 17,
    marginLeft: '3%'
  },
  listItemNumMutuals: {
    fontSize: 14,
    marginLeft: '3%'
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
    height: '85%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginRight: '5%',
    backgroundColor: '#f50',
    borderRadius: 20
  },
  addFriendButtonText: {
    color: 'white',
    fontSize: 16
  }
})

export default AddFriendsScreen
