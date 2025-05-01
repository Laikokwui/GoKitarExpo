import { Image } from "expo-image";
import { Platform, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function CommunityScreen() {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Community Post</ThemedText>
                </ThemedView>
                
                <ThemedText>
                    Your Area
                </ThemedText>
                <ThemedText>
                    Other Areas
                </ThemedText>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
});
