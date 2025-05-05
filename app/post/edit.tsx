import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { deletePost, updatePost } from "@/database/postService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModifyPostScreen() {
    const [loading, setLoading] = useState(true);

    const [postID, setPostID] = useState<number>(0);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postContent, setPostContent] = useState<string>("");

    const router = useRouter();
    
    const handleUpdatePost = () => {
        // Handle post creation logic here
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
                        <ThemedText type="title">Edit Post</ThemedText>
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
});