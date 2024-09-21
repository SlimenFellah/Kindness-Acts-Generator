import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, Alert, Share } from 'react-native';

const kindnessActs = [
  {
    act: "Compliment a stranger.",
    image: require('./assets/compliment.jpg'), // Ensure these images exist in your assets folder
  },
  {
    act: "Help someone with their groceries.",
    image: require('./assets/groceries.jpg'),
  },
  {
    act: "Leave a kind note for someone.",
    image: require('./assets/note.jpg'),
  },
  // Add more acts with images
];

export default function App() {
  const [currentKindness, setCurrentKindness] = useState(kindnessActs[Math.floor(Math.random() * kindnessActs.length)]);
  const [favorites, setFavorites] = useState([]);

  const getNewKindness = () => {
    const randomIndex = Math.floor(Math.random() * kindnessActs.length);
    setCurrentKindness(kindnessActs[randomIndex]);
  };

  const addToFavorites = () => {
    if (!favorites.includes(currentKindness.act)) {
      setFavorites([...favorites, currentKindness.act]);
      Alert.alert('Added to Favorites!', `${currentKindness.act} has been added to your favorites.`);
    } else {
      Alert.alert('Already a Favorite!', 'This act of kindness is already in your favorites.');
    }
  };

  const shareKindness = async () => {
    try {
      await Share.share({
        message: currentKindness.act,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share this act of kindness.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Random Acts of Kindness</Text>
      <Image source={currentKindness.image} style={styles.image} />
      <Text style={styles.kindnessText}>{currentKindness.act}</Text>
      <View style={styles.buttonContainer}>
        <Button title="New Kindness" onPress={getNewKindness} />
        <Button title="Add to Favorites" onPress={addToFavorites} />
        <Button title="Share" onPress={shareKindness} />
      </View>

      <Text style={styles.favoritesHeader}>Your Favorites:</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => <Text style={styles.favoriteItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginVertical:20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  kindnessText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#495057',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  favoritesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#343a40',
  },
  favoriteItem: {
    fontSize: 16,
    color: '#495057',
    paddingVertical: 5,
  },
});
