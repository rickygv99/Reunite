export const MESSAGE = 'MESSAGE'
export const MEETUP = 'MEETUP'
export const CANCEL_MEETUP = 'CANCEL_MEETUP'
export const LOCATION = 'LOCATION'
export const DATE = 'DATE'
export const FAVORITE = 'FAVORITE'
export const ADD_TRAVEL = 'ADD_TRAVEL'
export const DELETE_TRAVEL = 'DELETE_TRAVEL'

export function message(firstName, lastName, id, text, createdAt, user) {
  return { type: MESSAGE, firstName, lastName, id, text, createdAt, user }
}

export function meetup(firstName, lastName, date) {
  return { type: MEETUP, firstName, lastName, date }
}

export function cancelMeetup(firstName, lastName, date) {
  return { type: CANCEL_MEETUP, firstName, lastName, date }
}

export function location(firstName, lastName, date, location) {
  return { type: LOCATION, firstName, lastName, date, location }
}

export function date(firstName, lastName, date, newDate) {
  return { type: DATE, firstName, lastName, date, newDate }
}

export function favorite(firstName, lastName) {
  return { type: FAVORITE, firstName, lastName }
}

export function addTravel(destination, startDate, endDate) {
  return { type: ADD_TRAVEL, destination, startDate, endDate }
}

export function deleteTravel(destination, startDate, endDate) {
  return { type: DELETE_TRAVEL, destination, startDate, endDate }
}
