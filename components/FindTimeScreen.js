import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation'
import { showMessage } from "react-native-flash-message";

const MONTHS = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

class FindTimeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      friendFirstName: this.props.navigation.getParam('friendFirstName'),
      friendLastName: this.props.navigation.getParam('friendLastName'),
      times: [
        {
          date: new Date("2019-12-03T19:00:00Z"),
          selected: false
        },
        {
          date: new Date("2019-12-04T17:00:00Z"),
          selected: false
        },
        {
          date: new Date("2019-12-07T14:00:00Z"),
          selected: false
        },
        {
          date: new Date("2019-12-07T20:00:00Z"),
          selected: false
        }
      ]
    }
  }

  toggleSelection(date) {
    for (let i = 0; i < this.state.times.length; i++) {
      if (date == this.state.times[i].date) {
        let times = this.state.times
        times[i].selected = !times[i].selected
        this.setState({ times: times })
        return
      }
    }
  }

  getIcon(selected) {
    if (selected) {
      return (
        <Icon name='check-box' size={28} type='material' color='white' containerStyle={styles.check}/>
      )
    } else {
      return (
        <Icon name='check-box-outline-blank' size={28} type='material' color='white' containerStyle={styles.check}/>
      )
    }
  }

  getTimeItem(date, selected) {
    let hours = date.getUTCHours() + 1
    let minutes = date.getUTCMinutes()
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    let time = hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`
    let dayAndTime = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${time}`
    return (
      <TouchableOpacity style={selected ? styles.listItemSelected : styles.listItem} onPress={() => this.toggleSelection(date)}>
        <Text style={styles.listItemTime}>{`${dayAndTime}`}</Text>
        {
          this.getIcon(selected)
        }
      </TouchableOpacity>
    );
  }

  navigate(dispatch, navigation, firstName, lastName, times) {
    let date = null
    for (let i = 0; i < times.length; i++) {
      if (times[i].selected) {
        date = times[i].date
        break
      }
    }
    navigation.dispatch(StackActions.pop({ n: 1 }))
    navigation.navigate('Meetups')
    showMessage({
      message: `Your meetup preference has been saved. Awaiting ${firstName}'s preference.`,
      type: "info",
      duration: 5000
    });
    setTimeout(() => {
      let hours = date.getUTCHours() + 1
      let minutes = date.getUTCMinutes()
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      let time = hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`
      let dayAndTime = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${time}`
      dispatch({ type: 'MEETUP', firstName, lastName, date })
      showMessage({
        message: `Meetup with ${firstName} successfully scheduled for ${dayAndTime}.`,
        type: "info",
        duration: 5000
      });
    }, 10000);
  }

  render () {
    let { friendFirstName, friendLastName, times } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.infoText}>
          <Text style={styles.infoText1}>
            {`We have found the optimal times for you and ${friendFirstName} ${friendLastName} to meet, based off of your Google Calendars.`}
          </Text>
          <Text style={styles.infoText2}>
            Select times you are available. You can select as many times as you like.
          </Text>
        </View>
        <FlatList
          data={this.state.times}
          renderItem={({ item }) => this.getTimeItem(item.date, item.selected)}
          keyExtractor={item => item.date}
        />
        <Button
          containerStyle={styles.finishButtonContainer}
          buttonStyle={styles.finishButton}
          title='Finish'
          onPress={() => this.navigate(this.props.dispatch, this.props.navigation, friendFirstName, friendLastName, times)}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  infoText: {
    backgroundColor: '#ffbf9f',
    borderStyle: 'dashed',
    borderColor: '#f50',
    borderWidth: 2,
    margin: '5%'
  },
  infoText1: {
    fontSize: 16,
    margin: '5%'
  },
  infoText2: {
    fontSize: 16,
    margin: '5%',
    marginTop: 0
  },
  finishButtonContainer: {
    height: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%'
  },
  finishButton: {
    backgroundColor: '#f50'
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f50',
    marginBottom: '3%',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%'
  },
  listItemSelected: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffbf9f',
    marginBottom: '3%',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%'
  },
  listItemTime: {
    fontSize: 16,
    color: 'white',
    paddingTop: 4
  },
  check: {
    marginLeft: 'auto'
  }
})

export default connect()(FindTimeScreen)
