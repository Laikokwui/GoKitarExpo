import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>({});

	useEffect(() => {
		const current_user = auth().currentUser || {};
		
		if (current_user) {
			setUser(current_user);
			
			console.log(current_user);
			setLoading(false);
		} 
	}, []);
	
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
				<View>
					<ThemedView style={styles.titleContainer}>
						<ThemedText type="title">Welcome! {user?.displayName || ""}</ThemedText>
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
