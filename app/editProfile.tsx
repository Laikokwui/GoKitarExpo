import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useAuth } from "@/context/authContext";
import auth from "@react-native-firebase/auth";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, request } from "react-native-permissions";
import { SafeAreaView } from "react-native-safe-area-context";

const RNFS = require('react-native-fs');

export default function EditProfileScreen() {
    const router = useRouter();

    const [user, setUser] = useState<any>({});
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [imageUri, setImageUri] = useState<string>("");
    const [imageData, setImageData] = useState<string>("");

    const { updateUser } = useAuth();
    
    const handleUpdateProfile = async () => {
        try {
            const user = auth().currentUser;
            if (user) {
                user.updateProfile({displayName: name, photoURL: imageUri}).then((user) => {updateUser(user);});
                user.updateEmail(email);
                
                console.log("Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            return;
        }

        router.replace('/account');
    };
    
    const handleUploadImage = () => {
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
            if (result === 'granted') {
                launchImageLibrary({mediaType: 'photo'}, async (response) => {
                    if (response.assets && response.assets.length > 0) {
                    const image = response.assets[0];
                    const filePath = image.uri?.replace('file://', '');
                    const fileData = await RNFS.readFile(filePath, 'base64');
                    setImageData(fileData);
                    const imageUri = `data:image/jpeg;base64,${fileData}`;
                    setImageUri(imageUri);
                    }
                });
            } else {
                Alert.alert('Permission denied', 'You need to grant permission to access the gallery.');
            }
        });
    }

    useEffect(() => {
        const current_user: any = auth().currentUser || {};

        if (current_user) {
            setUser(current_user);
            setName(current_user?.displayName || "");
            setEmail(current_user?.email || "");
            setImageUri(current_user?.photoURL || "");
        } else {
            router.replace('/');
        }
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={{ marginBottom: 16 }}>
                    <Pressable onPress={() => router.back()} className="pt-4">
                        <Icon as={ChevronLeftIcon} size={"md"}  className="text-gray-900 dark:text-gray-50 w-10 h-10" />
                    </Pressable>
                </View>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Edit Profile</ThemedText>
                </ThemedView>
                <Box style={styles.profileCardContainer}>
                    <View style={{marginBottom: 16}}>
						<Avatar size="lg" style={{ marginRight: 16 }}>
							<AvatarImage
								source={{
									uri: user?.imageUri || "https://www.inforwaves.com/media/2021/04/dummy-profile-pic-300x300-1.png",
								}}
							/>
						</Avatar>
                        <Pressable onPress={() => handleUploadImage()}>
                            <ThemedText type="link">Change Profile Picture</ThemedText>
                        </Pressable>
					</View>
					<View>
                        <View style={styles.profileRowContainer}>
                            <ThemedText type="default">Name: </ThemedText>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.profileRowContainer}>
                            <ThemedText type="default">Email: </ThemedText>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                style={styles.input}
                            />
                        </View>
                    </View>
                </Box>
                <Button
                    onPress={() => handleUpdateProfile()}
                    style={styles.listButton}
                    variant="solid"
                >
                    <ButtonText style={styles.buttonText}>Update Profile</ButtonText>
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
        marginBottom: 16,
    },
    profileCardContainer: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 16,
    },
    profileRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        width: "70%",
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