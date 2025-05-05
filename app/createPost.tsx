import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { useAuth } from "@/context/authContext";
import { createPost } from "@/database/postService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";

var RNFS = require('react-native-fs');

export default function CreatePostScreen() {
    const [loading, setLoading] = useState(true);

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postImageUri, setPostImageUri] = useState("");
    const [postImageData, setPostImageData] = useState("");
    
    const { user }: any = useAuth();

    const router = useRouter();
    
    const handleCreatePost = () => {
        // Handle post creation logic here
        console.log("Creating post with data:", user.uid);
        createPost(postTitle, postContent, postImageUri, user.uid).then(() => {

            console.log("Post created successfully");
            router.push('/community');
        }).catch((error) => {
            console.error("Error creating post:", error);
        });
    };

    const handleUploadImage = () => {
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
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <ScrollView style={styles.container}>
                <View style={{ marginBottom: 16 }}>
                    <Pressable onPress={() => router.push('/community')} className="pt-4">
                        <Icon as={ChevronLeftIcon} size={"md"}  className="text-gray-900 dark:text-gray-50 w-10 h-10" />
                    </Pressable>
                </View>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">Create Post</ThemedText>
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
                            <FormControlLabelText className="text-xl">Post</FormControlLabelText>
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
                        onPress={() => handleCreatePost()}
                        style={styles.listButton}
                        variant="solid"
                    >
                        <ButtonText style={styles.buttonText}>Create Post</ButtonText>
                    </Button>
                </ScrollView>
            </View>
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
    listButton: {
        borderRadius: 6,
        overflow: 'hidden',
        elevation: 0,
        marginVertical: 8,
        minHeight: 50
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