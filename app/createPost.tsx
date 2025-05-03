import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { createPost } from "@/database/postService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePostScreen() {
    const [loading, setLoading] = useState(true);

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const router = useRouter();
    
    const handleCreatePost = () => {
        // Handle post creation logic here
        createPost(postTitle, postContent, "").then(() => {
            console.log("Post created successfully");
        }).catch((error) => {
            console.error("Error creating post:", error);
        });
    };

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
});