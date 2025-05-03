import { OnboardingSlider } from "@/components/OnboardingSlider";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import { initDB } from "@/database/init";
import auth from "@react-native-firebase/auth";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function GetStartedScreen() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [loading, setLoading] = useState(true);

    const router = useRouter();
    
    useEffect(() => {
        initDB();
        const unsubscribe = auth().onAuthStateChanged(user => {
          console.log(user ? "Logged in" : "Logged out");

          if (user) {
            router.push('/home');
          }
          setLoading(false);
        });
        return unsubscribe;
    }, []);
    
    if (loading) {
        return (
            <Center style={{height: windowHeight, width: windowWidth}}>
                <Spinner size="small" color={colors.green[500]} />
            </Center>
        );
    }
    
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
        padding: 24,
        marginBottom: 32,
    },
    button: {
        borderRadius: 6,
        overflow: 'hidden',
        elevation: 0,
        marginVertical: 8,
        minHeight: 50
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
