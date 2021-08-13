import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [atttempCount, setAttempCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  const pokemons = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'},
    {name: 'E'},
    {name: 'F'},
    {name: 'G'},
    {name: 'H'},
  ];
  const pairOfPokemons = [...pokemons, ...pokemons];
  
  function flipCard(index) {
    setOpenedCard(opened => [...opened, index]);
  }

  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = randomData[openedCard[0]];
    const secondMatched = randomData[openedCard[1]];

    if (secondMatched && firstMatched.name === secondMatched.name) {
      setMatched([...matched, firstMatched.name]);
      setMatchCount(matchCount + 1);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  }, [openedCard]);

  const shuffleArray = arr => {
    var i = arr.length,
      j,
      temp;
    if (i == 0) return arr;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };
  useEffect(() => {
    setRandomData(shuffleArray(pairOfPokemons));
    console.log('');
  }, []);

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.countText}>{`Count: ${atttempCount}`}</Text>
      <Text style={styles.countText}>{`Match: ${matchCount}`}</Text>
      <FlatList
        data={randomData}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setAttempCount(atttempCount + 1);
              flipCard(index);
            }}
            style={[
              styles.GridViewBlockStyle,
              {
                backgroundColor:
                  openedCard.includes(index) || matched.includes(item.name)
                    ? 'red'
                    : 'blue',
              },
            ]}>
            {openedCard.includes(index) || matched.includes(item.name) ? (
              <Text style={styles.GridViewInsideTextItemStyle}>{item.name}</Text>
            ) : null}
          </TouchableOpacity>
        )}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 100,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  GridViewBlockStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: '#00BCD4',
  },
  GridViewInsideTextItemStyle: {
    color: '#fff',
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',
  },
  countText: {
    alignSelf: 'center',
    fontSize: 16,
    margin: 10,
  },
});

export default App;
