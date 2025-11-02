import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Retour",
        headerStyle: {
          backgroundColor: "#4b6cb7",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="books/[id]"
        options={{
          headerTitle: "Détails du livre",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="white"
              onPress={() => router.push("/")}
            />
          ),
        }}
      />

      <Stack.Screen
        name="books/new-book"
        options={{
          headerTitle: "Nouveau livre",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="white"
              onPress={() => router.push("/")}
            />
          ),
        }}
      />

      <Stack.Screen
        name="books/update-book/[id]"
        options={{
          headerTitle: "Modifier le livre",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="white"
              onPress={() => (id ? router.push(`/books/${id}`) : router.back())}
            />
          ),
        }}
      />
    </Stack>
  );
}
