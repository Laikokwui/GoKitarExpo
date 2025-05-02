import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommunityScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <ScrollView style={styles.container}>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">Community</ThemedText>
                    </ThemedView>

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
