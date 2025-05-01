import { Image } from "expo-image";
import { Platform, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Box } from "@/components/ui/box"
import { VStack } from "@/components/ui/vstack"

export default function HomeScreen() {
	const username = "Kok Wui"
	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">Welcome! {username}</ThemedText>
				</ThemedView>
				<Box className="justify-center h-80">
					<VStack space="md" reversed={false}>
						<Box className="h-20 w-20 bg-primary-300" />
						<Box className="h-20 w-20 bg-primary-400" />
						<Box className="h-20 w-20 bg-primary-500" />
					</VStack>
				</Box>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { 
		padding: 16 
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
