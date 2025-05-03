import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { initDB } from "@/database/init";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		initDB();
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<GluestackUIProvider mode="light">
				<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="login" options={{ headerShown: false }}/>
						<Stack.Screen name="signup" options={{ headerShown: false }}/>
						<Stack.Screen name="editProfile" options={{ headerShown: false }}/>
						<Stack.Screen name="createPost" options={{ headerShown: false }}/>
						<Stack.Screen name="+not-found" options={{ headerShown: false }}/>
					</Stack>
					<StatusBar style="auto" />
				</ThemeProvider>
			</GluestackUIProvider>
		</SafeAreaProvider>
	);
}
