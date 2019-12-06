import React, { Component } from 'react'
import { ARCHIVE } from '../actions'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native'
import { Card, Button, Icon, Image, Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class HomeScreen extends Component {
  constructor (props) {
    super(props)

    this.position = new Animated.ValueXY()
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    }
    this.reachOutOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.notNowOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

    this.state = {
      home: 'Irvine, CA',
      idx: 0
    }
  }

  componentWillMount() {
    let notifications = []
    for (let i = 0; i < this.props.friends.length; i++) {
      if (this.props.friends[i].date != null) {
        notifications.push(this.props.friends[i])
      }
    }
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ idx: this.state.idx + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
              let friendFirstName = notifications[this.state.idx - 1].firstName
              let friendLastName = notifications[this.state.idx - 1].lastName
              this.props.navigation.navigate('FindTime', { friendFirstName, friendLastName })
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ idx: this.state.idx + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => <Icon name='chat' size={34} type='material-community' color='#f50' onPress={() => navigation.navigate('Messages')} containerStyle={{marginLeft: 20}}/>,
      headerTitle: () => <Image source={require('../assets/reunite.png')} style={{width: 130, height: 40}}/>,
      headerRight: () => <Icon name='help' size={34} type='material' color='#f50' containerStyle={{marginRight: 20}}/>
    };
  };

  renderCards = () => {
    let { friends } = this.props;
    let notifications = []
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].date != null) {
        notifications.push(friends[i])
      }
    }
    return notifications.map((item, i) => {
      if (i < this.state.idx) {
        return null;
      } else if (i == this.state.idx) {
        let { firstName, lastName, pronoun, picture, arrival, date } = notifications[i]
        let day = date.split(", ")[1] + ", " + date.split(", ")[2]
        let areaText = "is in your area right now"
        if (arrival != null) {
          areaText = `will be in your area on ${arrival}`
        }
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={i}
            style={[this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 260,
                width: SCREEN_WIDTH - 40,
                margin: 20,
                padding: 10,
                borderWidth: 1,
                borderRadius: 20,
                position: 'absolute',
                backgroundColor: 'white'
              }
            ]}
          >
            <Animated.View
              style={{
                opacity: this.reachOutOpacity,
                transform: [{ rotate: '-30deg' }],
                position: 'absolute',
                top: 40,
                left: 5,
                zidx: 1000
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 24,
                  fontWeight: '800',
                  padding: 10
                }}
              >
                MEET UP
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: this.notNowOpacity,
                transform: [{ rotate: '30deg' }],
                position: 'absolute',
                top: 40,
                right: 5,
                zidx: 1000
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 24,
                  fontWeight: '800',
                  padding: 10
                }}
              >
                NOT NOW
              </Text>
            </Animated.View>
            <View style={styles.cardProfile}>
              <View style={styles.cardTop}>
                <Avatar
                  size={120}
                  rounded
                  source={picture}
                />
                <Text style={styles.cardTopName}>{`${firstName} ${lastName}`}</Text>
              </View>
            </View>
            <View style={styles.cardMessagePanel}>
                <Text style={styles.cardMessage}>
                  {`${firstName} ${areaText}.\n\nMeet up with ${pronoun}?`}
                </Text>
            </View>
            <Text style={styles.dateMessage}>
              {`${day}`}
            </Text>
            <Button
              containerStyle={styles.messageButtonContainer}
              buttonStyle={styles.messageButton}
              title='Send a message'
              onPress={() => this.props.navigation.navigate('Chat', { firstName, lastName })}
            />
          </Animated.View>
        )
      } else {
        let { firstName, lastName, pronoun, picture, arrival, date } = notifications[i]
        let day = date.split(", ")[1] + ", " + date.split(", ")[2]
        let areaText = "is in your area right now"
        if (arrival != null) {
          areaText = `will be in your area on ${arrival}`
        }
        return (
          <Animated.View
            key={i}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: SCREEN_HEIGHT - 260,
                width: SCREEN_WIDTH - 40,
                margin: 20,
                padding: 10,
                borderWidth: 1,
                borderRadius: 20,
                position: 'absolute',
                backgroundColor: 'white'
              }
            ]}
          >
            <View style={styles.cardProfile}>
              <View style={styles.cardTop}>
                <Avatar
                  size={120}
                  rounded
                  source={picture}
                />
                <Text style={styles.cardTopName}>{`${firstName} ${lastName}`}</Text>
              </View>
            </View>
            <View style={styles.cardMessagePanel}>
                <Text style={styles.cardMessage}>
                  {`${firstName} ${areaText}.\n\nMeet up with ${pronoun}?`}
                </Text>
            </View>
            <Text style={styles.dateMessage}>
              {`${day}`}
            </Text>
            <Button
              containerStyle={styles.messageButtonContainer}
              buttonStyle={styles.messageButton}
              title='Send a message'
              onPress={() => this.props.navigation.navigate('Chat', { firstName, lastName })}
            />
          </Animated.View>
        )
      }
    }).reverse()
  }

  render () {
    let numNotifications = 0
    for (let i = 0; i < this.props.friends.length; i++) {
      if (this.props.friends[i].date != null) {
        numNotifications += 1
      }
    }
    if (this.state.idx == numNotifications) {
      return (
        <SafeAreaView style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Text style={styles.noMessagesText}>No new notifications</Text>
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        {
          this.renderCards()
        }
        {/*<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Text style={styles.remainingText}>{`Notifications remaining: ${this.props.notifications.length}`}</Text>
        </View>*/}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%'
  },
  card: {
    height: '85%',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%'
  },
  cardProfile: {
    height: '40%'
  },
  cardTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10%'
  },
  cardTopName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%'
  },
  cardMessagePanel: {
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    height: '37%'
  },
  cardMessage: {
    fontSize: 18
  },
  messageButtonContainer: {
    marginTop: '6%',
    height: '20%',
    width: '80%',
    marginLeft: '10%'
  },
  messageButton: {
    backgroundColor: '#f50',
    borderRadius: 20
  },
  remainingText: {
    position: 'absolute',
    top: SCREEN_HEIGHT - 215,
    fontSize: 18,
    fontWeight: 'bold'
  },
  noMessagesText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '60%'
  },
  dateMessage: {
    textAlign: 'right',
    color: 'gray',
    fontSize: 14,
    marginRight: 15
  }
})


function mapStateToProps(state) {
  const { friends } = state;
  return {
    friends
  };
}

export default connect(mapStateToProps)(HomeScreen);
