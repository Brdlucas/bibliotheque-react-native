import { Stack, usePathname } from "expo-router";

export default function RootLayout() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <Stack
      screenOptions={{
        headerShown: !isHome,
        headerTitle: "Retour",
        headerStyle: {
          backgroundColor: "#4b6cb7",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    />
  );
}