import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
	const router = useRouter();
	const handleLogout = () => {
        router.push('/');
    }
	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">Account</ThemedText>
				</ThemedView>
				<ThemedText>
					Edit Profile
				</ThemedText>
				<ThemedText>
					Contact us
				</ThemedText>
				<ThemedText>
					Term and Conditions
				</ThemedText>
				<Button onPress={handleLogout}>
					<ButtonText>Logout</ButtonText>
				</Button>
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
