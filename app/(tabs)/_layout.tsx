import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						position: "absolute",
						paddingTop:10,
						height: 80,
					},
					default: {
						paddingTop:10,
						height: 80,
					},
				}),
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "",
					tabBarIcon: ({ color }: any) => (
						<IconSymbol
							size={30}
							name="house.fill"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="community"
				options={{
					title: "",
					tabBarIcon: ({ color }: any) => (
						<Feather name="globe" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "",
					tabBarIcon: ({ color }: any) => (
						<IconSymbol
							size={30}
							name="person.fill"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
