import { Image } from "expo-image";
import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

export default function CommunityScreen() {
    return (
        <SafeAreaView>
            <View>
                <ScrollView style={styles.container}>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">Community</ThemedText>
                    </ThemedView>

                    <ThemedText>
                        Your Area
                    </ThemedText>
                    <ThemedText>
                        Other Areas
                    </ThemedText>
                </ScrollView>
                <Fab
                    size="md"
                    placement="bottom right"
                    isHovered={false}
                    isDisabled={false}
                    isPressed={false}
                    className={"position-fixed bottom-4 right-4"}
                >
                    <FabIcon as={AddIcon} />
                    <FabLabel>Post</FabLabel>
                </Fab>
            </View>
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
