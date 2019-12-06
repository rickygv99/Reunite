# Reunite

Team members: Ricky Grannis-Vu, Danielle Tang, Tyler Hong, Jennifer He

Final project for CS 147: Introduction to Human-Computer Interaction in Fall of 2019 at Stanford University.

Link to project website (contains all design steps):
http://web.stanford.edu/class/cs147/projects/OnlineLocalCommunity/reunite/

## Operating instructions

We developed this prototype using React Native. It is meant to be run on the iPhone X. You can download the .zip file of the GitHub repository by visiting our website (link above). To run the app using Expo:

TODO: STEPS GO HERE

## Limitations

Due to the time and resource constraints of this project, we had to simplify certain features:
* User information is hardcoded into the app.
* While the state of the app persists through a run of the app, once the app exits, the state of the app is reset.
* Finding optimal meetup times + selecting meetup time from preferred meetup times was accomplished via Wizard of Oz techniques whereas in a fully functional app, we would accomplish this with an AI.

We also had to omit certain features from our high-fi prototype, such as:
* A signup / login process (in our prototype, the user starts out with an account / hardcoded data)
* The ability to add friends. We display the Add Friends screen to show our design; however, the functionality to actually add friends is not included (since we are primarily using hardcoded data, this would greatly increase our time constraints with minimal benefit)
* An onboarding tutorial explaining the swiping / meetup process (we tried to use affordances which made the app self-explanatory, rendering the onboarding tutorial less beneficial (but still necessary for a fully functional app))
* A "Help" feature. We have included an icon on the main screen to mark where the Help feature would be accessible from in a fully functional app; however, this icon is non-clickable in our high-fi prototype
* The ability to change the user's settings. We display a settings icon on the user's profile, which is clickable and takes the user to a settings screen, in order to show what the design would look like. However, the tabs on the settings screen are non-clickable.
