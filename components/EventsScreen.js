import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, StyleSheet, FlatList, Alert, TextInput } from 'react-native'
import { Avatar, Icon, SearchBar, Overlay, Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import PopoverTooltip from 'react-native-popover-tooltip';
import { showMessage } from "react-native-flash-message";
import DatePicker from 'react-native-datepicker'

const MONTHS = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

class EventsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      overlayVisible: false,
      overlayDateVisible: false,
      location: '',
      newDate: '',
      firstName: null,
      lastName: null,
      date: null
    }
  }

  updateSearch = search => {
    this.setState({ search });
  }

  updateLocation = location => {
    this.setState({ location });
  }

  getMeetupItem(dispatch, firstName, lastName, date, location, picture) {
    console.log(firstName + " " + date)
    location = location == null ? "No location chosen yet" : location
    let hours = date.getUTCHours() + 1
    let minutes = date.getUTCMinutes()
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    let time = hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`
    let dayAndTime = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${time}`
    return (
      <View style={styles.listItem}>
        <Avatar
          size={50}
          rounded
          source={picture}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemDate}>{`${dayAndTime}`}</Text>
          <Text style={styles.listItemName}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.listItemLocation}>{`${location}`}</Text>
        </View>
        <PopoverTooltip
          buttonComponent={
            <View style={styles.tooltipMenu}>
              <Icon name='dots-horizontal' size={34} type='material-community' color='#f50'/>
            </View>
          }
          items={[
            {
              label: 'Suggest location',
              onPress: () => {
                setTimeout(() => {
                  this.setState({ overlayVisible: true, firstName: firstName, lastName: lastName, date: date })
                }, 1400);
              }
            },
            {
              label: 'Request date/time change',
              onPress: () => {
                setTimeout(() => {
                  this.setState({ overlayDateVisible: true, firstName: firstName, lastName: lastName, date: date })
                }, 1400);
              }
            },
            {
              label: 'Cancel meetup',
              onPress: () => {
                setTimeout(() => {
                  Alert.alert(
                    'Cancel meetup',
                    `Are you sure you want to cancel your meetup with ${firstName}?`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {
                          dispatch({ type: 'CANCEL_MEETUP', firstName, lastName, date })
                          showMessage({
                            message: `Your meetup with ${firstName} has been canceled.`,
                            type: "info",
                            duration: 5000
                          });
                        },
                        style: 'destructive'
                      },
                      {
                        text: `Don't cancel`,
                        onPress: () => {}
                      }
                    ],
                    {cancelable: false},
                  );
                }, 1000);
              }
            },
          ]}
        />
      </View>
    );
  }

  render () {
    let { search, firstName, lastName, date, location, newDate } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <Overlay
          isVisible={this.state.overlayVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ overlayVisible: false, location: '' })}
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Suggest a location</Text>
            <TextInput
              placeholder='Location'
              style={styles.overlayInput}
              onChangeText={this.updateLocation}
            />
            <Button
              title='Send suggestion'
              containerStyle={styles.overlayButtonContainer}
              buttonStyle={styles.overlayButton}
              onPress={() => {
                showMessage({
                  message: `Your location suggestion has been sent to ${firstName}.`,
                  type: "info",
                  duration: 5000
                });
                setTimeout(() => {
                  this.props.dispatch({ type: 'LOCATION', firstName, lastName, date, location })
                  showMessage({
                    message: `${firstName} accepted your suggestion to meet at ${location}.`,
                    type: "info",
                    duration: 5000
                  });
                }, 10000);
                this.setState({ overlayVisible: false, location: '' })
              }}
            />
          </View>
        </Overlay>
        <Overlay
          isVisible={this.state.overlayDateVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ overlayDateVisible: false, newDate: '' })}
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Suggest a new date</Text>
            <DatePicker
              date={newDate}
              mode="datetime"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={styles.overlayDate}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => this.setState({ newDate: new Date(date) })}
            />
            <Button
              title='Send suggestion'
              containerStyle={styles.overlayButtonContainer}
              buttonStyle={styles.overlayButton}
              onPress={() => {
                if (newDate == '') {
                  newDate = new Date()
                }
                showMessage({
                  message: `Your date suggestion has been sent to ${firstName}.`,
                  type: "info",
                  duration: 5000
                });
                setTimeout(() => {
                  newDate.setDate(newDate.getDate() + 1)
                  newDate.setHours(newDate.getHours() - 9) // Hacky fix for us being in PST (8 hours behind) (+1 for Daylight Savings)
                  this.props.dispatch({ type: 'DATE', firstName, lastName, date, newDate })
                  let hours = newDate.getUTCHours() + 1
                  let minutes = newDate.getUTCMinutes()
                  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
                  let time = hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`
                  let dayAndTime = `${MONTHS[newDate.getMonth()]} ${newDate.getDate()}, ${time}`
                  showMessage({
                    message: `${firstName} accepted your suggestion to meet on ${dayAndTime}.`,
                    type: "info",
                    duration: 5000
                  });
                }, 10000);
                this.setState({ overlayDateVisible: false, newDate: '' })
              }}
            />
          </View>
        </Overlay>
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
        <Text style={styles.eventsText}>Upcoming meetups</Text>
        <ScrollView style={styles.eventsPanel}>
          <FlatList
            data={this.props.meetups}
            renderItem={({ item }) => this.getMeetupItem(this.props.dispatch, item.firstName, item.lastName, item.date, item.location, item.picture)}
            keyExtractor={item => item.firstName + item.lastName}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  eventsPanel: {
    position: 'absolute',
    top: '13%',
    height: '90%',
    width: '100%'
  },
  eventsText: {
    fontSize: 20,
    left: '5%'
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
    fontSize: 14,
    fontWeight: 'bold'
  },
  listItemDate: {
    fontSize: 14
  },
  listItemLocation: {
    fontSize: 14
  },
  tooltipMenu: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  overlay: {
    margin: 10
  },
  overlayInput: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#ECEFF1',
    borderRadius: 20,
    fontSize: 14
  },
  overlayTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  overlayButton: {
    backgroundColor: '#f50',
    paddingLeft: 10,
    paddingRight: 10
  },
  overlayDate: {
    marginTop: 20,
    marginBottom: 20
  }
})

function mapStateToProps(state) {
  const { meetups } = state;
  return {
    meetups
  };
}

export default connect(mapStateToProps)(EventsScreen)
