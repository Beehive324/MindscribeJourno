import React, {useState, useRef} from 'react';
import CustomInput from './Components/CustomInput';
import { View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Animated, Button} from 'react-native';
import Slides from '../Slides';
import OnbardingItem from '../OnboardingItem'
import Paginator from './Paginator';
import { Colors } from 'react-native/Libraries/NewAppScreen';




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
            <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate("Login")} >
                <Text style={styles.appButtonTex}>Get Started</Text>
            </TouchableOpacity>
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
        backgroundColor: "#007AFF",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 70,
        marginBottom: 30,        
    },
    appButtonTex: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    }
    
});

export default Welcome;
