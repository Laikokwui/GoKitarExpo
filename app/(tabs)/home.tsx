import PostCard from "@/components/postCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/context/authContext";
import { getPosts } from "@/database/postService";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const { user }: any = useAuth();

	const [posts, setPosts] = useState<any>([]);

	useEffect(() => {
		getPosts()
			.then((postsList) => {
				setPosts(
					postsList.filter((post: any) => post.userid === user?.uid)
				);
				console.log(postsList.filter((post: any) => post.userid === user?.uid));
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			});
	}, []);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
				<View>
					<ThemedView style={styles.titleContainer}>
						<ThemedText type="title">
							Welcome! {user?.displayName || ""}
						</ThemedText>
					</ThemedView>
				</View>

				<Text
					size="2xl"
					style={{ marginTop: 16 }}
				>
					News & Insights
				</Text>
				<Box style={{ marginTop: 2 }}>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<HStack
							space="md"
							reversed={false}
						>
							<View style={styles.imageBox}>
								<Image
									source={require("../../assets/images/insight1.jpg")}
									style={{ width: "100%", height: "80%" }}
									resizeMode="cover"
								/>
								<Text
									style={{
										paddingHorizontal: 8,
										textAlign: "left",
										marginTop: 8,
									}}
								>
									Always recycle
								</Text>
							</View>
							<View style={styles.imageBox}>
								<Image
									source={require("../../assets/images/insight2.jpg")}
									style={{ width: "100%", height: "80%" }}
									resizeMode="cover"
								/>
								<Text
									style={{
										paddingHorizontal: 8,
										textAlign: "left",
										marginTop: 8,
									}}
								>
									Work together to get the job done
								</Text>
							</View>
							<View style={styles.imageBox}>
								<Image
									source={require("../../assets/images/insight3.jpg")}
									style={{ width: "100%", height: "80%" }}
									resizeMode="cover"
								/>
								<Text
									style={{
										paddingHorizontal: 8,
										textAlign: "left",
										marginTop: 8,
									}}
								>
									Love the earth
								</Text>
							</View>
						</HStack>
					</ScrollView>
				</Box>

				{posts.length > 0 ? (
					<>
						<Text
							size="2xl"
							style={{ marginTop: 16 }}
						>
							My Posts
						</Text>
						<Box style={{ marginTop: 2 }}>
							<VStack>
								<FlatList
									data={posts}
									keyExtractor={(item: any) => item.id}
									renderItem={({ item }: any) => (
										<PostCard
											postID={item.id}
											postTitle={item.title}
											postContent={item.content}
											postImageUri={item.image_uri}
											postCreationDate={item.created_at}
										/>
									)}
								/>
							</VStack>
						</Box>
					</>
				) : (
					<></>
				)}
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
		padding: 16,
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
