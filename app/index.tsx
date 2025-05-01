import { Image } from "expo-image";
import { Platform, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Link, useRouter } from 'expo-router';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";

export default function GetStartedScreen() {
	const router = useRouter();
	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">GoKitar get started here</ThemedText>
				</ThemedView>

                <Button onPress={()=>router.push('/login')} className="mb-2">
					<ButtonText>Login</ButtonText>
				</Button>
                <Button onPress={()=>router.push('/signup')}>
					<ButtonText>Sign Up</ButtonText>
				</Button>
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
