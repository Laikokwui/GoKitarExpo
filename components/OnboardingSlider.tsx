import { Image } from "expo-image";
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View, ViewToken } from 'react-native';
import { ThemedText } from "./ThemedText";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const slides = [
    {
        id: '1',
        title: 'GoKitar - Clean Starts Here.',
        description: 'Report waste, recycle right, and keep your area clean.',
        image: require('../assets/images/slide1.jpg')
    },
    {
        id: '2',
        title: 'Bin It Right. Track It Smart.',
        description: 'Smart tools for waste disposal and cleanliness tracking.',
        image: require('../assets/images/slide2.jpg')
    },
    {
        id: '3',
        title: 'Cleaner Communities. Smarter Living.',
        description: 'Join the movement for cleaner, smarter neighborhoods.',
        image: require('../assets/images/slide3.jpg')
    }
];

export const OnboardingSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems[0]) {
            setCurrentIndex(Number(viewableItems[0].index));
        }
    });

    const renderDots = () => {
        return (
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index.toString()}
                        style={[
                            styles.dot,
                            { backgroundColor: currentIndex === index ? 'limegreen' : '#ccc' }
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            contentFit="cover"
                        />
                        <View style={styles.content}>
                            <ThemedText type="title" style={styles.title}>
                                {item.title}
                            </ThemedText>
                            <ThemedText style={styles.description}>
                                {item.description}
                            </ThemedText>
                        </View>
                    </View>
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={(item) => item.id}
            />
            {renderDots()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        padding: 24,
        width: windowWidth,
        height: windowHeight * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: windowWidth * 0.8,
        height: windowWidth * 0.8,
        marginBottom: 20,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
});
