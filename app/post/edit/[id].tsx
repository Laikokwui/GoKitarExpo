import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { useAuth } from "@/context/authContext";
import { deletePost, getPostById, updatePost } from "@/database/postService";
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
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

    const [isInvalidPostTitle, setIsInvalidPostTitle] = useState<boolean>(false);
    const [postTitleErrorMsg, setPostTitleErrorMsg] = useState<string>("");
    const [isInvalidPostContent, setIsInvalidPostContent] = useState<boolean>(false);
    const [postContentErrorMsg, setPostContentErrorMsg] = useState<string>("");

    const [showAlertDialog, setShowAlertDialog] = React.useState<boolean>(false)
    const handleClose = () => setShowAlertDialog(false);

    const { user }: any = useAuth();

    const router = useRouter();

    const handleUploadImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'App needs media library permission to upload images.');
            return false;
        }
        
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
    
    const handleUpdatePost = () => {
        if (postTitle.trim() === "" || postContent.trim() === "") {
            setIsInvalidPostTitle(true);
            setPostTitleErrorMsg("Post title cannot be empty");
            setIsInvalidPostContent(true);
            setPostContentErrorMsg("Post content cannot be empty");
            return;
        }
        
        updatePost(postID, postTitle, postContent, postImageUri).then(() => {
            console.log("Post updated successfully");
            router.replace('/community');
        }).catch((error) => {
            console.error("Error updating post:", error);
        });
    };

    const handleDeletePost = () => {
        deletePost(postID).then(() => {
            console.log("Post deleted successfully");
            router.replace('/community');
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
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <SafeAreaView style={{flex: 1}}>
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
                    
                    <FormControl className="mb-4" isInvalid={isInvalidPostTitle} isRequired>
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
                            <FormControlErrorText>{postTitleErrorMsg}</FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl className="mb-4"  isInvalid={isInvalidPostContent} isRequired>
                        <FormControlLabel>
                            <FormControlLabelText className="text-xl">Content</FormControlLabelText>
                        </FormControlLabel>
                        <Textarea className="mt-1" size="lg">
                            <TextareaInput 
                                type="text"
                                multiline
                                numberOfLines={4}
                                style={{ height: 100, textAlignVertical: 'top' }}
                                placeholder="post content..." 
                                value={postContent}
                                onChangeText={(text) => setPostContent(text)}
                            />
                        </Textarea>
                        <FormControlError>
                            <FormControlErrorIcon />
                            <FormControlErrorText>{postContentErrorMsg}</FormControlErrorText>
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
                        onPress={() => setShowAlertDialog(true)}
                        style={styles.deleteButton}
                        variant="solid"
                    >
                        <ButtonText style={styles.buttonText}>Delete Post</ButtonText>
                    </Button>
                </ScrollView>
                
                <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
                    <AlertDialogBackdrop />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Heading className="text-typography-950 font-semibold" size="md">
                                Are you sure you want to delete this post?
                            </Heading>
                        </AlertDialogHeader>
                        <AlertDialogBody className="mt-3 mb-4">
                            <Text size="sm">
                                Deleting the post will remove it permanently and cannot be undone.
                                Please confirm if you want to proceed.
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter className="">
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={handleClose}
                                size="sm"
                            >
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                            <Button size="sm" onPress={handleDeletePost}>
                                <ButtonText>Delete</ButtonText>
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#ffffff',
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