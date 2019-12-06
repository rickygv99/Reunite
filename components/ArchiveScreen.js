import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Icon, SearchBar } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'

const MONTHS = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

class ArchiveScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  updateSearch = search => {
    this.setState({ search });
  }

  getMessageItem(firstName, lastName, picture, friends) {
    let day = ''
    let message = ''
    for (let i = 0; i < friends.length; i++) {
      let m = friends[i]
      if (firstName == m.firstName && lastName == m.lastName) {
        if (m.messages.length > 0) {
          message = m.messages[0].text
          let date = m.messages[0].createdAt
          day = `${MONTHS[date.getMonth()]} ${date.getDate()}`
        }
        break
      }
    }
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('Chat', { firstName, lastName })}>
        <Avatar
          size={50}
          rounded
          source={picture}
        />
        <View style={styles.listItemPanel}>
          <View style={styles.listItemTop}>
            <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
            <Text style={styles.listItemDate}>{`${day}`}</Text>
            <Icon name='chevron-right' size={18} type='material-community' color='gray' containerStyle={{marginRight: 20}}/>
          </View>
          <Text style={styles.listItemMessage}>{`${message}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    let { search } = this.state;

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
        <ScrollView style={styles.messagesPanel}>
          <FlatList
            data={this.props.friends}
            renderItem={({ item }) => this.getMessageItem(item.firstName, item.lastName, item.picture, this.props.friends)}
            keyExtractor={item => item.firstName + item.lastName}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchBarInput: {
    backgroundColor: '#ECEFF1',
    borderRadius: 20
  },
  messagesPanel: {
    position: 'absolute',
    top: '9%',
    height: '91%',
    width: '100%'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray'
  },
  listItemPanel: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  listItemTop: {
    flexDirection: 'row'
  },
  listItemName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  listItemDate: {
    fontSize: 14,
    marginLeft: 'auto',
    color: 'gray'
  },
  listItemMessage: {
    fontSize: 14,
    color: 'gray'
  }
})

function mapStateToProps(state) {
  const { friends } = state;
  return {
    friends
  };
}

export default connect(mapStateToProps)(ArchiveScreen);
