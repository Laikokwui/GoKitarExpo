import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { useRouter } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button";
import { OnboardingSlider } from "@/components/OnboardingSlider";

export default function GetStartedScreen() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            
            <OnboardingSlider />
            
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={() => router.push('/login')} 
                    variant={"solid"}
                    style={styles.button}
                >
                    <ButtonText style={styles.buttonText}>Login</ButtonText>
                </Button>
                
                <Button 
                    onPress={() => router.push('/signup')}
                    variant={"outline"}
                    style={styles.button}
                >
                    <ButtonText style={styles.secondaryButtonText}>Create Account</ButtonText>
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#ffffff'
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 'auto',
        gap: 16,
        marginBottom: 16
    },
    button: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        marginHorizontal: 16,
        minHeight: 46
    },
    gradient: {
        width: '100%',
        padding: 16,
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },
    secondaryButtonText: {
        color: '#4C51BF',
        fontSize: 16,
        fontWeight: '600'
    }
});
