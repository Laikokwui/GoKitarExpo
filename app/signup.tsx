import { ThemedText } from "@/components/ThemedText"
import { Button, ButtonText } from "@/components/ui/button"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { ChevronLeftIcon, Icon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import { useAuth } from "@/context/authContext"
import auth from "@react-native-firebase/auth"
import { Link, useRouter } from "expo-router"
import React from "react"
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function SignupScreen() {
    const router = useRouter();

    const [emailValue, setEmailValue] = React.useState<string>("");
    const [pwdValue, setPwdValue] = React.useState<string>("");
    const [cpwdValue, setCPwdValue] = React.useState<string>("");

    const [emailErrorMsg, setEmailErrorMsg] = React.useState<string>("");
    const [pwdErrorMsg, setPwdErrorMsg] = React.useState<string>("");
    const [cpwdErrorMsg, setCPwdErrorMsg] = React.useState<string>("");

    const [isInvalidPwdValue, setIsInvalidPwdValue] = React.useState<boolean>(false);
    const [isInvalidEmailValue, setIsInvalidEmailValue] = React.useState<boolean>(false);
    const [isInvalidCPwdValue, setIsInvalidCPwdValue] = React.useState<boolean>(false);

    const { login } = useAuth();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const handleSubmit = async () => {
        if (emailValue.trim() === "" || pwdValue.trim() === "" || cpwdValue.trim() === "") {
            setIsInvalidEmailValue(true);
            setEmailErrorMsg("Email cannot be empty");
            setIsInvalidPwdValue(true);
            setPwdErrorMsg("Password cannot be empty");
            setIsInvalidCPwdValue(true);
            setCPwdErrorMsg("Confirm Password cannot be empty");
            return;
        }

        if (!emailRegex.test(emailValue)) {
            setIsInvalidEmailValue(true);
            setEmailErrorMsg("Email is invalid");
            return;
        }

        if (!passwordRegex.test(pwdValue)) {
            setIsInvalidPwdValue(true);
            setPwdErrorMsg("Password does not meet the criteria");
            return;
        }

        if (pwdValue)

        if (pwdValue !== cpwdValue) {
            setIsInvalidCPwdValue(true);
            setCPwdErrorMsg("Passwords do not match");
            return;
        }



        try {
            const user = await auth().createUserWithEmailAndPassword(emailValue, pwdValue);
            if (user) {
                login(user)
            };
        } catch (error: any) {
            console.log(error)
            Alert.alert('Sign up failed: ' + error.message);
            return;
        }

        router.push('/home');
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
                <View style={{ padding: 16 }}>
                    <Pressable onPress={() => router.push('/')} className="pt-4 items-start justify-start">
                        <Icon as={ChevronLeftIcon} size={"md"}  className="text-gray-900 dark:text-gray-50 w-8 h-8" />
                    </Pressable>
                </View>
                <ScrollView className="flex-1 px-6" contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1">
                        <Heading size="2xl" className="mt-4 mb-8">
                            Create your account
                        </Heading>
                        
                        <FormControl className="mb-4" isInvalid={isInvalidEmailValue} isRequired>
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
                                <FormControlErrorText>{emailErrorMsg}</FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <FormControl className="mb-4" isInvalid={isInvalidPwdValue} isRequired>
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
                            <FormControlHelper>
                                <FormControlHelperText>
                                    <ul>
                                        <li>6-16 characters</li>
                                        <li>At least one special character ['!', '@', '#', '$', '%', '^', '&', '*']</li>
                                        <li>One capital letter</li>
                                        <li>One lowercase letter</li>
                                        <li>One number</li>
                                    </ul>
                                </FormControlHelperText>
                            </FormControlHelper>
                            <FormControlError>
                                <FormControlErrorIcon />
                                <FormControlErrorText>{pwdErrorMsg}</FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <FormControl className="mb-6" isInvalid={isInvalidCPwdValue} isRequired>
                            <FormControlLabel>
                                <FormControlLabelText className="text-xl">Confirm Password</FormControlLabelText>
                            </FormControlLabel>
                            <Input className="mt-1 h-12" size="md">
                                <InputField
                                    type="password"
                                    placeholder="confirm password"
                                    value={cpwdValue}
                                    onChangeText={(text) => setCPwdValue(text)}
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon />
                                <FormControlErrorText>{cpwdErrorMsg}</FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <ThemedText className="text-sm text-center">
                            already a member of GoKitar? <Link href="/login"><ThemedText type="link">Login</ThemedText></Link>
                        </ThemedText>
                    </View>

                    <View className="pb-6">
                        <Button 
                            size="md" 
                            variant="solid" 
                            onPress={handleSubmit} 
                            style={{ paddingHorizontal: 16, minHeight: 46}}
                        >
                            <ButtonText>Sign up</ButtonText>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}