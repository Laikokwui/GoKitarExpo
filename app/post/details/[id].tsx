import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ChevronLeftIcon, DownloadIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/authContext";
import { getPostById } from "@/database/postService";
import { format, parseISO } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RNFS = require('react-native-fs');

export default function PostDetailScreen() {
	const router = useRouter();

	const { id } = useLocalSearchParams();

	const { user }: any = useAuth();

	const [post, setPost] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);

	const downloadImage = async () => {
		try {
            // Request permission on Android
			const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'App needs access to media library.');
                return false;
            }

			// Get the actual base64 content
			const base64Data = post?.image_uri?.replace(/^data:image\/jpeg;base64,/, '');
            const fileName = `image_${Date.now()}.jpg`;
            const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

            // 3. Write the base64 image to a file
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
            });

            // 4. Save the file to media library (gallery)
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('Download', asset, false);

		
			Alert.alert('Image saved');
            return;
		} catch (error) {
			Alert.alert('Error saving image:', JSON.stringify(error));
		}
	};

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
					onPress={() => router.back()}
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
                   	{ post.image_uri !== "" ? 
						<View style={{ position: "relative", marginBottom: 16, width: 200 }}>
							<Image
								source={{ uri: post.image_uri }}
								style={styles.image}
							/>
							<Pressable
								onPress={downloadImage}
								style={{
									position: "absolute",
									top: -5,
									right: -15,
									backgroundColor: "lightgrey",
									borderRadius: 8,
									width: 40,
									height: 40,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Icon as={DownloadIcon} className="text-typography-500 m-2 w-8 h-8 " />
							</Pressable>
						</View>:<></>
					}
                    <Text style={{ marginTop: 16, fontSize: 16 }}>
                        {format(parseISO(post.created_at), 'd MMM yyyy h:mm a')}
                    </Text>
                    <Text style={{ marginTop: 16, fontSize: 16 }}>
                        {post.content}
                    </Text>
					{post.userid === user?.uid ? (
						<TouchableOpacity style={styles.editButton} onPress={() => router.push({ pathname: '/post/edit/[id]', params:{ id: post.id }})}>
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
        backgroundColor: '#fff',
        flex: 1
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
