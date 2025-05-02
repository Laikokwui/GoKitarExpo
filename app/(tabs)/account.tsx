import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { SkeletonText } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import auth from "@react-native-firebase/auth";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>({});
	
	const handleLogout = () => {
		auth().signOut()
			.then(() => {
				console.log('User signed out successfully');
				router.replace('/');
			})
			.catch((error) => {
				console.error('Error signing out:', error);
			});
    }

	useEffect(() => {
		const current_user = auth().currentUser || {};
		
		if (current_user) {
			setUser(current_user);
			console.log(current_user);
			setLoading(false);
		} 
	}, []);

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">Account</ThemedText>
				</ThemedView>
				<Box style={styles.profileCardContainer}>
					<View>
						<Avatar size="lg" style={{ marginRight: 16 }}>
							<AvatarImage
								source={{
									uri: user?.imageUri || "https://www.inforwaves.com/media/2021/04/dummy-profile-pic-300x300-1.png",
								}}
							/>
						</Avatar>
					</View>
					<View>
						<View style={styles.profileRowContainer}>
							<ThemedText type="default">Name: </ThemedText>
							{loading?
								<SkeletonText className="h-4 w-64 " /> :
								<ThemedText type="default">{user?.displayName || "-"}</ThemedText>
							}
						</View>
						<View style={styles.profileRowContainer}>
							<ThemedText type="default">Email: </ThemedText>
							{loading?
								<SkeletonText className="h-4 w-64 " /> :
								<ThemedText type="default">{user?.email || "-"}</ThemedText>
							}
						</View>
					</View>
				</Box>
				<Pressable
					onPress={() => router.push('/editProfile')}
					style={styles.listButton}
				>
					<Text style={styles.listButtonText}>Edit Profile</Text>
				</Pressable>
				<Pressable
					onPress={() => console.log("Hello")}
					style={styles.listButton}
					disabled={true}
				>
					<Text style={styles.listButtonText}>Contact us</Text>
				</Pressable>
				<Pressable
					onPress={() => console.log("Hello")}
					style={styles.listButton}
					disabled={true}
				>
					<Text style={styles.listButtonText}>Term and Condition</Text>
				</Pressable>
				<Pressable
					onPress={() => handleLogout()}
					style={styles.listButton}
				>
					<Text style={styles.listButtonRedText}>Logout</Text>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
	},
	profileCardContainer: {
		backgroundColor: "#fff",
		marginHorizontal: 16,
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		borderColor: "#e0e0e0",
		borderWidth: 1,
		display: "flex",
		flexDirection: "row",
		alignItems:"center",
	},
	titleContainer: {
		marginHorizontal: 16,
		marginBottom: 16,
		flexDirection: "row",
		gap: 8,
	},
	listButton: {
		backgroundColor: "#fff",
		padding: 16,
	},
	listButtonText:{
		color: "#000000",
		fontWeight: "bold",
	},
	listButtonRedText:{
		color: "#FF3D00",
		fontWeight: "bold",
	},
	profileRowContainer: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 8,
	}
});
