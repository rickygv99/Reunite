import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, StyleSheet, FlatList, TextInput } from 'react-native'
import { Icon, Overlay, Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import PopoverTooltip from 'react-native-popover-tooltip';
import DatePicker from 'react-native-datepicker'

const MONTHS = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: "Ricky",
      lastName: "Grannis-Vu",
      home: "Irvine, CA",
      email: "test@stanford.edu",
      phone: "+1 (123) 456-7890",
      overlayVisible: false,
      destination: '',
      startDate: '',
      endDate: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => <Icon name='settings' size={34} type='material' color='#f50' onPress={() => navigation.navigate('Settings')} containerStyle={{marginLeft: 20}}/>,
      headerRight: () => <Icon name='people' size={34} type='material' color='#f50' onPress={() => navigation.navigate('Friends')} containerStyle={{marginRight: 20}}/>
    };
  };

  updateDestination = destination => {
    this.setState({ destination });
  }

  getTravelItem(dispatch, destination, startDate, endDate) {
    console.log(startDate)
    return (
      <View style={styles.listItem}>
        <View style={styles.listItemPanel}>
          <Text style={styles.listItemDestination}>{`${destination}`}</Text>
          <Text style={styles.listItemDate}>{`${MONTHS[startDate.getMonth()]} ${startDate.getDate()}-${MONTHS[endDate.getMonth()]} ${endDate.getDate()}`}</Text>
        </View>
        <PopoverTooltip
          buttonComponent={
            <View style={styles.tooltipMenu}>
              <Icon name='dots-horizontal' size={34} type='material-community' color='#f50'/>
            </View>
          }
          items={[
            {
              label: 'Delete',
              onPress: () => { dispatch({ type: 'DELETE_TRAVEL', destination, startDate, endDate }) }
            },
          ]}
        />
      </View>
    );
  }

  render () {
    let { firstName, lastName, email, phone, destination, startDate, endDate } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column'}}>
        <Overlay
          isVisible={this.state.overlayVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ overlayVisible: false, destination: '', startDate: '', endDate: '' })}
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>New travel plan</Text>
            <TextInput
              placeholder='Location'
              style={styles.overlayInput}
              onChangeText={this.updateLocation}
            />
            <DatePicker
              date={startDate}
              mode="date"
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
              onDateChange={(date) => this.setState({ startDate: new Date(date) })}
            />
            <DatePicker
              date={endDate}
              mode="date"
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
              onDateChange={(date) => this.setState({ endDate: new Date(date) })}
            />
            <Button
              title='Add travel plan'
              containerStyle={styles.overlayButtonContainer}
              buttonStyle={styles.overlayButton}
              onPress={() => {
                if (startDate == '') {
                  startDate = new Date()
                }
                if (endDate == '') {
                  endDate = new Date()
                }
                this.props.dispatch({ type: 'ADD_TRAVEL', destination, startDate, endDate })
                this.setState({ overlayVisible: false, destination: '', startDate: '', endDate: '' })
              }}
            />
          </View>
        </Overlay>
        <View style={styles.mainInfo}>
          <Image
            source={require('../assets/ricky.jpg')}
            style={{width: imageRadius, height: imageRadius, borderRadius: imageRadius/2}}
          />
          <View style={styles.namePanel}>
            <Text style={styles.nameText}>{`${this.state.firstName} ${this.state.lastName}`}</Text>
          </View>
          <View style={styles.homePanel}>
            <Icon name='location-on' size={24} type='material' color='#f50'/>
            <Text style={styles.homeText}>{`${this.state.home}`}</Text>
          </View>
        </View>
        <View style={styles.profilePanel}>
          <View style={styles.travelPanel}>
            <Text style={styles.profileText}>Travel plans </Text>
            <Icon name='add-circle' size={24} type='material' color='#f50' onPress={() => { this.setState({ overlayVisible: true }) }}/>
          </View>
          <FlatList
            data={this.props.travelPlans}
            renderItem={({ item }) => this.getTravelItem(this.props.dispatch, item.destination, item.startDate, item.endDate)}
            keyExtractor={item => item.destination}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const imageRadius = 150;

const styles = StyleSheet.create({
  mainInfo: {
    alignItems: 'center',
    marginTop: '8%'
  },
  namePanel: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  nameText: {
    fontSize: 24
  },
  homePanel: {
    flexDirection: 'row',
    marginTop: '3%',
    marginBottom: '3%'
  },
  homeText: {
    fontSize: 20
  },
  profilePanel: {
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%'
  },
  profileText: {
    fontSize: 20
  },
  travelPanel: {
    flexDirection: 'row',
    marginTop: '3%',
    marginBottom: '3%'
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
    flexDirection: 'column'
  },
  listItemDestination: {
    fontSize: 18
  },
  listItemDate: {
    fontSize: 14
  },
  tooltipMenu: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  overlay: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20
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
    marginBottom: 20
  }
})

function mapStateToProps(state) {
  const { travelPlans } = state;
  return {
    travelPlans
  };
}

export default connect(mapStateToProps)(ProfileScreen)
