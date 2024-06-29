import React, {useState, useRef} from 'react';
import CustomInput from './Components/CustomInput';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, FlatList, Animated } from 'react-native';
import Slides from '../Slides';
import OnbardingItem from '../OnboardingItem'
import Paginator from './Paginator';

const Welcome = ({navigation}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentageThreshold: 50}).current;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Articul-e</Text>
            <FlatList data={Slides} renderItem={({item}) => <OnbardingItem item={item} />} 

            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                useNativeDriver: false,
            })}
            
            />
            <Paginator data={Slides} scrollX={scrollX}></Paginator>
            <Button style={styles.button} title="Get Started" onPress={() =>navigation.navigate("Login")} />

        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        marginTop: 30,
        color: '#FFFFFF',
        fontFamily: 'Advent Pro',
        fontWeight: 'bold',
        color: "black",
    },
    button: {
        marginBottom: 100,
        position: 40,
        flex: 1,
        
        
    },
    
});

export default Welcome;
