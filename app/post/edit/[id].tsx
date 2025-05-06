import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { useAuth } from "@/context/authContext";
import { deletePost, getPostById, updatePost } from "@/database/postService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, request } from 'react-native-permissions';
import { SafeAreaView } from "react-native-safe-area-context";

const RNFS = require('react-native-fs');

export default function ModifyPostScreen() {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [postID, setPostID] = useState<number>(0);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postContent, setPostContent] = useState<string>("");
    const [postImageUri, setPostImageUri] = useState<string>("");
    const [postImageData, setPostImageData] = useState<string>("");

    const { user }: any = useAuth();

    const router = useRouter();

    const handleUploadImage = () => {
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
            if (result === 'granted') {
                launchImageLibrary({mediaType: 'photo'}, async (response) => {
                    if (response.assets && response.assets.length > 0) {
                    const image = response.assets[0];
                    const filePath = image.uri?.replace('file://', '');
                    const fileData = await RNFS.readFile(filePath, 'base64');
                    setPostImageData(fileData);
                    const imageUri = `data:image/jpeg;base64,${fileData}`;
                    setPostImageUri(imageUri);
                    }
                });
            } else {
                Alert.alert('Permission denied', 'You need to grant permission to access the gallery.');
            }
        });
    }
    
    const handleUpdatePost = () => {
        if (postTitle.trim() === "" || postContent.trim() === "") {
            Alert.alert("Post title and content cannot be empty");
            return;
        }
        
        updatePost(postID, postTitle, postContent, "").then(() => {
            console.log("Post created successfully");
        }).catch((error) => {
            console.error("Error creating post:", error);
        });
    };

    const handleDeletePost = () => {
        deletePost(postID).then(() => {
            console.log("Post deleted successfully");
        }
        ).catch((error) => {
            console.error("Error deleting post:", error);
        });
    };

    useEffect(() => {
        getPostById(id)
            .then((post:any) => {
                setPostID(post.id);
                setPostTitle(post.title);
                setPostContent(post.content);
                setPostImageUri(post.image_uri);
                console.log("Post fetched successfully:", post);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
            });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={{ marginBottom: 16 }}>
                    <Pressable onPress={() => router.back()} className="pt-4">
                        <Icon as={ChevronLeftIcon} size={"md"}  className="text-gray-900 dark:text-gray-50 w-10 h-10" />
                    </Pressable>
                </View>

                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Edit Post</ThemedText>
                </ThemedView>

                {postImageUri !== "" ? (
                    <View style={{ position: "relative", marginBottom: 16, width: 200 }}>
                        <Image
                            source={{ uri: postImageUri }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Pressable
                            onPress={() => {
                                setPostImageUri("");
                                setPostImageData("");
                            }}
                            style={{
                                position: "absolute",
                                top: -5,
                                right: -15,
                                backgroundColor: "lightgrey",
                                borderRadius: 10,
                                width: 26,
                                height: 26,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ThemedText type="default" style={{ color: "grey", fontWeight: "bold" }}>X</ThemedText>
                        </Pressable>
                    </View>
                ) : (
                    <Pressable
                        onPress={() => handleUploadImage()}
                        className="bg-gray-200 rounded-lg p-4 mb-4"
                        style={{
                            borderWidth: 1,
                            borderColor: "lightgrey",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 200,
                            height: 120,
                            borderRadius: 8,
                        }}
                    >
                        <ThemedText type="default" style={{color: "grey"}}>Upload post thumbnail</ThemedText>
                    </Pressable>
                )}
                
                <FormControl className="mb-4">
                    <FormControlLabel>
                        <FormControlLabelText className="text-xl">Title</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="mt-1 h-12" size="md">
                        <InputField
                            type="text"
                            placeholder="post title"
                            value={postTitle}
                            onChangeText={(text) => setPostTitle(text)}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon />
                        <FormControlErrorText>Please provide a post title</FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl className="mb-4">
                    <FormControlLabel>
                        <FormControlLabelText className="text-xl">Content</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="mt-1 h-12" size="md">
                        <InputField
                            type="text"
                            placeholder="post content"
                            value={postContent}
                            onChangeText={(text) => setPostContent(text)}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon />
                        <FormControlErrorText>Please provide post content</FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <Button
                    onPress={() => handleUpdatePost()}
                    style={styles.listButton}
                    variant="solid"
                >
                    <ButtonText style={styles.buttonText}>Update Post</ButtonText>
                </Button>
                <Button
                    onPress={() => handleDeletePost()}
                    style={styles.deleteButton}
                    variant="solid"
                >
                    <ButtonText style={styles.buttonText}>Delete Post</ButtonText>
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
    listButton: {
        borderRadius: 6,
        overflow: 'hidden',
        elevation: 0,
        marginVertical: 8,
        minHeight: 50
    },
    deleteButton: {
        borderRadius: 6,
        overflow: 'hidden',
        elevation: 0,
        marginVertical: 8,
        minHeight: 50,
        backgroundColor: 'red'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 8,
        marginVertical: 8,
    }
});