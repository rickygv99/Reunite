import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'

class SettingsScreen extends Component {
  render () {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ListItem
          key={7}
          title={`Profile`}
          bottomDivider
          chevron
        />
        <ListItem
          key={0}
          title={`Invites`}
          bottomDivider
          chevron
        />
        <ListItem
          key={1}
          title={`Notifications`}
          bottomDivider
          chevron
        />
        <ListItem
          key={2}
          title={`Accessibility`}
          bottomDivider
          chevron
        />
        <ListItem
          key={3}
          title={`Security`}
          bottomDivider
          chevron
        />
        <ListItem
          key={4}
          title={`Privacy`}
          bottomDivider
          chevron
        />
        <ListItem
          key={5}
          title={`Info`}
          bottomDivider
          chevron
        />
        <ListItem
          key={6}
          title={`Logout`}
          bottomDivider
          chevron
        />
      </SafeAreaView>
    )
  }
}

export default SettingsScreen
