import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  screenParagraph: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

const ContactScreen: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenTitle}>Contact Us</Text>
    <Text style={styles.screenParagraph}>Enjoy a luxury fine dining experience tailored to your personality for the night!</Text>
    <Text style={styles.screenParagraph}>Call 072 649 5122</Text>
  </View>
);

export default ContactScreen;