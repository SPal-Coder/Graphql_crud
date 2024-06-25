import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ApolloProviderComponent from './Apolloclient';
import Crud from './Crud';

const App = () => {
  return (
    <ApolloProviderComponent>
      <SafeAreaView style={styles.container}>
      
         <Crud/>

      </SafeAreaView>
    </ApolloProviderComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});

export default App;
