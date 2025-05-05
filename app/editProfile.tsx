import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useAuth } from "@/context/authContext";
import auth from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUri, setImageUri] = useState("");

    const { updateUser } = useAuth();

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

    const pickAndUploadImage = async () => {
        try {
          const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
          const mediaPerm = await MediaLibrary.requestPermissionsAsync();
      
          if (!permissionResult.granted || !mediaPerm.granted) {
            alert("Permission to access media library is required!");
            return;
          }
      
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
          });
      
          if (result.canceled) return;
      
          const imageUri = result.assets[0].uri;
          console.log("Original URI:", imageUri);
      
          // Convert to file:// path
          const asset = await MediaLibrary.createAssetAsync(imageUri);
          const fileUri = asset.uri;
          console.log("Converted fileUri:", fileUri);
      
          const filename = `test/test-image.jpg`;
          await storage().ref(filename).putFile(fileUri);
      
          const downloadUrl = await storage().ref(filename).getDownloadURL();
          console.log("Download URL:", downloadUrl);
      
          const currentUser = auth().currentUser;
          if (currentUser) {
            await currentUser.updateProfile({ photoURL: downloadUrl });
            alert("Profile picture updated!");
          }
        } catch (error) {
          console.error("Upload error:", error);
          alert("Upload failed");
        }
    };   

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

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={{ marginBottom: 16 }}>
                    <Pressable onPress={() => router.push('/account')} className="pt-4">
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
                        <Pressable onPress={() => pickAndUploadImage()}>
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