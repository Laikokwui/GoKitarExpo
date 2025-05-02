import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const username = "Kok Wui"
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
				<View>
					<Avatar size="md">
						<AvatarFallbackText>{username}</AvatarFallbackText>
						<AvatarImage
							source={{
								uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
							}}
						/>
						<AvatarBadge />
					</Avatar>
					<ThemedView style={styles.titleContainer}>
						<ThemedText type="title">Welcome! {username}</ThemedText>
					</ThemedView>
				</View>
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
	safeArea: {
		flex: 1,
	},
	container: { 
		flex: 1,
		padding: 16 
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
