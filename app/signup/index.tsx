import { ThemedText } from "@/components/ThemedText"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { Input, InputField } from "@/components/ui/input"
import { Link } from "expo-router"
import React from "react"
import { SafeAreaView, ScrollView } from "react-native"

export default function SignupScreen() {
    const [emailValue, setEmailValue] = React.useState("")
    const [pwdValue, setPwdValue] = React.useState("")
    const [cpwdValue, setCPwdValue] = React.useState("")
    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 16 }}>
                <Heading size={"3xl"}>
                    Sign up and GoKitar
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
                        <FormControlErrorText>password doesn't meet criteria</FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>Confirm Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size={"md"}>
                        <InputField
                            type="password"
                            placeholder="confirm password"
                            value={cpwdValue}
                            onChangeText={(text) => setCPwdValue(text)}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon />
                        <FormControlErrorText>password doesn't match</FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <ThemedText>
                    already a member of GoKitar? <Link href="/login"><ThemedText type="link">Login</ThemedText></Link>
                </ThemedText>
            </ScrollView>
        </SafeAreaView>
    )
}