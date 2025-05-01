import { ThemedText } from "@/components/ThemedText"
import { Button, ButtonText } from "@/components/ui/button"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { Input, InputField } from "@/components/ui/input"
import { Link,useRouter } from "expo-router"
import React from "react"
import { SafeAreaView, ScrollView } from "react-native"

export default function LoginScreen() {
    const router = useRouter();
    const [isInvalid, setIsInvalid] = React.useState(false)
    const [emailValue, setEmailValue] = React.useState("")
    const [pwdValue, setPwdValue] = React.useState("")
    const handleSubmit = () => {
        router.push('/home');
    }

    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 16 }}>
                <Heading size={"3xl"}>
                    Login to GoKitar
                </Heading>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size={"md"}>
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

                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size={"md"}>
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

                <ThemedText>
                    Dont have an account? <Link href="/signup"><ThemedText type="link">Sign Up</ThemedText></Link>
                </ThemedText>

                <Button size="md" variant="solid" onPress={handleSubmit} className="my-4">
                    <ButtonText>Login</ButtonText>
                </Button>
            </ScrollView>
        </SafeAreaView>
    )
}