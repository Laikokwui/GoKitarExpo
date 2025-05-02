import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>({});

	useEffect(() => {
		const current_user = auth().currentUser || {};
		
		if (current_user) {
			setUser(current_user);
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

				<Text size="2xl" style={{marginTop: 16}}>News & Insights</Text>
				<Box style={{ marginTop: 2 }}>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						<HStack space="md" reversed={false}>
							<View style={styles.imageBox}>
								<Image
									source={require("../../assets/images/insight1.jpg")}
									style={{ width: "100%", height: "80%" }}
									resizeMode="cover"
								/>
								<Text style={{  paddingHorizontal: 8, textAlign: "left", marginTop: 8 }}>Always recycle</Text>
							</View>
							<View style={styles.imageBox}>
								<Image
									source={require("../../assets/images/insight2.jpg")}
									style={{ width: "100%", height: "80%" }}
									resizeMode="cover"
								/>
								<Text style={{ paddingHorizontal: 8, textAlign: "left", marginTop: 8 }}>Work together to get the job done</Text>
							</View>
							<View style={styles.imageBox}>
								<Image
									source={require("../../assets/images/insight3.jpg")}
									style={{ width: "100%", height: "80%" }}
									resizeMode="cover"
								/>
								<Text style={{  paddingHorizontal: 8, textAlign: "left", marginTop: 8 }}>Love the earth</Text>
							</View>
						</HStack>
					</ScrollView>
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
	imageBox: {
		width: 250,
		height: 320,
		borderRadius: 8,
		backgroundColor: "#fff",
	},
});
