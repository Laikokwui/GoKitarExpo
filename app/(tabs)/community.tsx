import PostCard from "@/components/postCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { getPosts } from "@/database/postService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommunityScreen() {
	const router = useRouter();

	const [posts, setPosts] = useState<any>([]);

	useEffect(() => {
		getPosts()
			.then((posts) => {
				setPosts(posts);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			});
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">Community</ThemedText>
				</ThemedView>

				<VStack style={{marginTop: 2, paddingBottom: 40}} space="md" reversed={false}>
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
			</ScrollView>
			<Fab
				size="md"
				placement="bottom right"
				isHovered={false}
				isDisabled={false}
				isPressed={false}
				onPress={() => router.push("/post/create")}
				className={"position-fixed bottom-5 right-5"}
			>
				<FabIcon as={AddIcon} />
				<FabLabel>New Post</FabLabel>
			</Fab>
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
