import {
  MESSAGE,
  MEETUP,
  CANCEL_MEETUP,
  LOCATION,
  DATE,
  FAVORITE,
  ADD_TRAVEL,
  DELETE_TRAVEL
} from './actions';

const initialState = {
  friends: [
    {
      firstName: "Tyler",
      lastName: "Hong",
      pronoun: 'him',
      date: "Saturday, Nov. 30th, 1:10 PM",
      arrival: "Dec. 1",
      picture: require("./assets/tyler.png"),
      location: 'Vadreis Heights, MN',
      favorite: true,
      messages: [
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf6",
          user: {
            _id: 2,
            name: "Tyler Hong",
            avatar: require("./assets/tyler.png")
          },
          text: "Hey Ricky!",
          createdAt: new Date("2019-12-02T14:40:55Z")
        }
      ]
    },
    {
      firstName: "Danielle",
      lastName: "Tang",
      pronoun: 'her',
      date: "Friday, Nov. 29th, 2:40 PM",
      arrival: null,
      picture: require("./assets/danielle.png"),
      location: 'Sydney, Australia',
      favorite: false,
      messages: [
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf5",
          user: {
            _id: 2,
            name: "Danielle Tang",
            avatar: require("./assets/danielle.png")
          },
          text: "Long time no see! How have you been?",
          createdAt: new Date("2019-12-01T14:40:55Z")
        },
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf4",
          user: {
            _id: 1,
            name: "Ricky Grannis-Vu"
          },
          text: "Hi!",
          createdAt: new Date("2019-12-01T14:39:55Z")
        },
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf3",
          user: {
            _id: 2,
            name: "Danielle Tang",
            avatar: require("./assets/danielle.png")
          },
          text: "Hi Ricky!",
          createdAt: new Date("2019-12-01T14:38:55Z")
        }
      ]
    },
    {
      firstName: "Jennifer",
      lastName: "He",
      pronoun: 'her',
      arrival: null,
      date: "Saturday, Nov. 30th, 10:20 PM",
      picture: require("./assets/jen.png"),
      location: 'Menlo Park, CA',
      favorite: false,
      messages: [
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf7",
          user: {
            _id: 2,
            name: "Jennifer He",
            avatar: require("./assets/jen.png")
          },
          text: "Oh hey! It's been a while :)",
          createdAt: new Date("2019-11-29T14:40:55Z")
        }
      ]
    },
    {
      firstName: "Barack",
      lastName: "Obama",
      pronoun: 'him',
      arrival: 'Dec. 2',
      date: "Sunday, Dec. 1st, 4:20 PM",
      picture: require("./assets/barack_obama.jpg"),
      location: 'Honolulu, HI',
      favorite: false,
      messages: [
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf0",
          user: {
            _id: 1,
            name: "Ricky Grannis-Vu"
          },
          text: "OBAMA",
          createdAt: new Date("2019-11-29T14:30:55Z")
        },
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf8",
          user: {
            _id: 2,
            name: "Barack Obama",
            avatar: require("./assets/barack_obama.jpg")
          },
          text: "Text OBAMA to receive more great messages like this one! (lol)",
          createdAt: new Date("2019-11-28T14:20:55Z")
        }
      ]
    },
    {
      firstName: "Daddy",
      lastName: "Marc",
      pronoun: 'him',
      arrival: null,
      date: null,
      picture: require('./assets/daddy_mark.jpeg'),
      location: 'Stanford, CA',
      favorite: true,
      messages: [
        {
          _id: "b63cd0d9-986b-430c-8738-e277a8cefdf9",
          user: {
            _id: 2,
            name: "Daddy Marc",
            avatar: require("./assets/daddy_mark.jpeg")
          },
          text: "Welcome to Stanford!",
          createdAt: new Date("2019-11-24T14:40:55Z")
        }
      ]
    }
  ],
  meetups: [
    {
      firstName: 'Jennifer',
      lastName: 'He',
      picture: require("./assets/jen.png"),
      date: new Date("2019-12-03T10:00:00Z"),
      location: 'Disneyland'
    },
    {
      firstName: 'Tyler',
      lastName: 'Hong',
      picture: require('./assets/tyler.png'),
      date: new Date("2019-12-06T13:00:00Z"),
      location: 'Main Quad'
    },
    {
      firstName: 'Barack',
      lastName: 'Obama',
      picture: require('./assets/barack_obama.jpg'),
      date: new Date("2019-12-08T12:00:00Z"),
      location: null
    }
  ],
  travelPlans: [
    {
      destination: 'Honolulu, HI',
      startDate: new Date("2019-12-13T12:00:00Z"),
      endDate: new Date("2019-12-26T12:00:00Z")
    },
    {
      destination: 'Sydney, Australia',
      startDate: new Date("2019-12-27T12:00:00Z"),
      endDate: new Date("2019-12-31T12:00:00Z")
    }
  ]
};

function rootReducer(state = initialState, action) {
  if (action.type === MESSAGE) {
    let friends = []
    for (let i = 0; i < state.friends.length; i++) {
      let { firstName, lastName, pronoun, arrival, date, picture, location, favorite, messages } = state.friends[i]
      let friend_copy = {
        firstName: firstName,
        lastName: lastName,
        pronoun: pronoun,
        date: date,
        arrival: arrival,
        picture: picture,
        location: location,
        favorite: favorite
      }
      let new_messages = []
      for (let j = 0; j < messages.length; j++) {
        let m = {}
        m._id = messages[j]._id
        m.text = messages[j].text
        m.createdAt = messages[j].createdAt
        m.user = messages[j].user
        new_messages.push(m)
      }
      if (action.firstName == firstName && action.lastName == lastName) {
        let m = {}
        m._id = action.id
        m.text = action.text
        m.createdAt = action.createdAt
        m.user = action.user
        new_messages.unshift(m)
      }
      friend_copy.messages = new_messages
      friends.push(friend_copy)
    }
    friends.sort((a, b) => {
      return b.messages[0].createdAt - a.messages[0].createdAt
    })
    return { friends, meetups: state.meetups, travelPlans: state.travelPlans }
  } else if (action.type === MEETUP) {
    let meetups = []
    for (let i = 0; i < state.meetups.length; i++) {
      meetups.push(state.meetups[i])
    }
    let new_meetup = {
      firstName: action.firstName,
      lastName: action.lastName,
      date: action.date,
      location: null
    }
    for (let i = 0; i < state.friends.length; i++) {
      if (state.friends[i].firstName == action.firstName && state.friends[i].lastName == action.lastName) {
        new_meetup.picture = state.friends[i].picture
        break
      }
    }
    meetups.push(new_meetup)
    meetups.sort((a, b) => {
      return a.date - b.date
    })
    return { friends: state.friends, meetups, travelPlans: state.travelPlans }
  } else if (action.type === CANCEL_MEETUP) {
    let meetups = []
    for (let i = 0; i < state.meetups.length; i++) {
      let { firstName, lastName, date } = state.meetups[i]
      if (firstName != action.firstName || lastName != action.lastName || date != action.date) {
        meetups.push(state.meetups[i])
      }
    }
    return { friends: state.friends, meetups, travelPlans: state.travelPlans }
  } else if (action.type === LOCATION) {
    let meetups = []
    for (let i = 0; i < state.meetups.length; i++) {
      let { firstName, lastName, date, location, picture } = state.meetups[i]
      let meetup_copy = {
        firstName: firstName,
        lastName: lastName,
        date: date,
        location: location,
        picture: picture
      }
      if (firstName == action.firstName && lastName == action.lastName && date == action.date) {
        meetup_copy.location = action.location
      }
      meetups.push(meetup_copy)
    }
    return { friends: state.friends, meetups, travelPlans: state.travelPlans }
  } else if (action.type === DATE) {
    let meetups = []
    for (let i = 0; i < state.meetups.length; i++) {
      let { firstName, lastName, date, location, picture } = state.meetups[i]
      let meetup_copy = {
        firstName: firstName,
        lastName: lastName,
        date: date,
        location: location,
        picture: picture
      }
      if (firstName == action.firstName && lastName == action.lastName && date == action.date) {
        meetup_copy.date = action.newDate
      }
      meetups.push(meetup_copy)
    }
    return { friends: state.friends, meetups, travelPlans: state.travelPlans }
  } else if (action.type === FAVORITE) {
    let friends = []
    for (let i = 0; i < state.friends.length; i++) {
      let { firstName, lastName, pronoun, arrival, date, picture, location, favorite, messages } = state.friends[i]
      let friend_copy = {
        firstName: firstName,
        lastName: lastName,
        pronoun: pronoun,
        date: date,
        arrival: arrival,
        picture: picture,
        location: location,
        favorite: favorite,
        messages: messages
      }
      if (firstName == action.firstName && lastName == action.lastName) {
        friend_copy.favorite = !friend_copy.favorite
      }
      friends.push(friend_copy)
    }
    return { friends, meetups: state.meetups, travelPlans: state.travelPlans }
  } else if (action.type === ADD_TRAVEL) {
    let plans = []
    for (let i = 0; i < state.travelPlans.length; i++) {
      let { destination, startDate, endDate } = state.travelPlans[i]
      let plan_copy = {
        destination: destination,
        startDate: startDate,
        endDate: endDate
      }
      plans.push(plan_copy)
    }
    plans.push({
      destination: action.destination,
      startDate: action.startDate,
      endDate: action.endDate
    })
    return { friends: state.friends, meetups: state.meetups, travelPlans: plans }
  } else if (action.type === DELETE_TRAVEL) {
    let plans = []
    for (let i = 0; i < state.travelPlans.length; i++) {
      let { destination, startDate, endDate } = state.travelPlans[i]
      let plan_copy = {
        destination: destination,
        startDate: startDate,
        endDate: endDate
      }
      if (destination != action.destination || startDate != action.startDate || endDate != action.endDate) {
        plans.push(plan_copy)
      }
    }
    return { friends: state.friends, meetups: state.meetups, travelPlans: plans }
  }
  return state
}

export default rootReducer;
