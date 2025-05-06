import { ThemedText } from "@/components/ThemedText"
import { Button, ButtonText } from "@/components/ui/button"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { ChevronLeftIcon, Icon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import { useAuth } from "@/context/authContext"
import auth from "@react-native-firebase/auth"
import { Link, useRouter } from "expo-router"
import React from "react"
import { Alert, Pressable, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function LoginScreen() {
    const router = useRouter();

    const { login } = useAuth();

    const [isInvalid, setIsInvalid] = React.useState(false);
    const [emailValue, setEmailValue] = React.useState("");
    const [pwdValue, setPwdValue] = React.useState("");

    const handleSubmit = async () => {
        try {
            const user = await auth().signInWithEmailAndPassword(emailValue, pwdValue);
            if (user) {
                login(user);

            }
        } catch (error: any) {
            console.log(error)
            Alert.alert('Login in failed: ' + error.message);
            return;
        }
       
        router.push('/home');
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View style={{ padding: 16 }}>
                <Pressable onPress={() => router.push('/')} className="pt-4 items-start justify-start">
                    <Icon as={ChevronLeftIcon} size={"md"}  className="text-gray-900 dark:text-gray-50 w-8 h-8" />
                </Pressable>
            </View>
            <ScrollView className="flex-1 px-6" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1">
                    <Heading size="2xl" className="mt-8 mb-8">
                        Login to your account
                    </Heading>
                    
                    <FormControl className="mb-4">
                        <FormControlLabel>
                            <FormControlLabelText className="text-xl">Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="mt-1 h-12" size="md">
                            <InputField
                                type="text"
                                placeholder="email"
                                value={emailValue}
                                onChangeText={(text) => setEmailValue(text)}
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon />
                            <FormControlErrorText>Email Invalid</FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl className="mb-6">
                        <FormControlLabel>
                            <FormControlLabelText className="text-xl">Password</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="mt-1 h-12" size="md">
                            <InputField
                                type="password"
                                placeholder="password"
                                value={pwdValue}
                                onChangeText={(text) => setPwdValue(text)}
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon />
                            <FormControlErrorText>Incorrect password or email</FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <ThemedText className="text-sm text-center">
                        Don't have an account? <Link href="/signup"><ThemedText type="link">Sign Up</ThemedText></Link>
                    </ThemedText>
                </View>

                <View className="pb-6">
                    <Button 
                        size="md" 
                        variant="solid" 
                        onPress={handleSubmit}
                        style={{ paddingHorizontal: 16, minHeight: 46}}
                    >
                        <ButtonText>Login</ButtonText>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}