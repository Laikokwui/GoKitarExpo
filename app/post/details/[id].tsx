import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/authContext";
import { getPostById } from "@/database/postService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
	const router = useRouter();

	const { id } = useLocalSearchParams();

	const { user }: any = useAuth();

	const [post, setPost] = useState<any>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPostById(id)
			.then((post) => {
				setPost(post);
				console.log("Post fetched successfully:", post);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching post:", error);
			});
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ marginBottom: 16 }}>
				<Pressable
					onPress={() => router.push("/community")}
					className="pt-4"
				>
					<Icon
						as={ChevronLeftIcon}
						size={"md"}
						className="text-gray-900 dark:text-gray-50 w-10 h-10"
					/>
				</Pressable>
			</View>
			{loading ? (
				<></>
			) : (
				<>
					<ThemedView style={styles.titleContainer}>
						<ThemedText type="title">{post.title}</ThemedText>
					</ThemedView>
                    <Image
                        source={{ uri: post.image_uri }}
                        style={styles.image}
                    />
                    <Text style={{ marginTop: 16, fontSize: 16 }}>
                        {post.content}
                    </Text>
					{post.userid === user?.uid ? (
						<TouchableOpacity style={styles.editButton}>
							<Text style={styles.editButtonText}>Edit</Text>
						</TouchableOpacity>
					) : (
						<></>
					)}
				</>
			)}
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
		marginBottom: 16,
	},
	editButton: {
		backgroundColor: "#007BFF",
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginTop: 15,
	},
	editButtonText: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	},
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    }
});
