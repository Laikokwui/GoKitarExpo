import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useAuth } from "@/context/authContext";
import auth from "@react-native-firebase/auth";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RNFS = require('react-native-fs');

export default function EditProfileScreen() {
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [imageUri, setImageUri] = useState<string>("");
    // const [imageData, setImageData] = useState<string>("");
    const { user }: any = useAuth();

    const { updateUser } = useAuth();
    
    const handleUpdateProfile = async () => {
        try {
            const user = auth().currentUser;
            if (user) {
                user.updateProfile({displayName: name}).then((user) => {updateUser(user);});
                user.updateEmail(email);
                
                console.log("Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            return;
        }

        router.replace('/account');
    };

    // const uploadToCloudinary = async (base64Image:string) => {
    //     const data = {
    //       file: base64Image,
    //       upload_preset: 'your_unsigned_preset', // Set this in your Cloudinary dashboard
    //     };
      
    //     const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //     });
      
    //     const result = await res.json();
    //     return result.secure_url; // This is the hosted image URL
    // };
    
    // const handleUploadImage = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                
    //     if (status !== 'granted') {
    //         Alert.alert('Permission Denied', 'App needs media library permission to upload images.');
    //         return false;
    //     }
        
    //     launchImageLibrary({mediaType: 'photo'}, async (response) => {
    //         if (response.assets && response.assets.length > 0) {
    //             const image = response.assets[0];
    //             const filePath = image.uri?.replace('file://', '');
    //             const fileData = await RNFS.readFile(filePath, 'base64');
    //             setImageData(fileData);
    //             const cimageUri = `data:image/jpeg;base64,${fileData}`;

    //             const cloudinaryUrl = await uploadToCloudinary(cimageUri);
    //             setCloudinaryUrl(cloudinaryUrl);
    //             setImageUri(cimageUri);
    //         }
    //     });
    // }

    useEffect(() => {
        setName(user?.displayName || "");
        setEmail(user?.email || "");
        setImageUri(user?.photoURL || "");
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
                            <AvatarFallbackText>{user?.displayName}</AvatarFallbackText>
							<AvatarImage
								source={{
									uri: imageUri,
								}}
							/>
						</Avatar>
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