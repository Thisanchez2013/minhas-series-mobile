import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <Text className="text-3xl font-bold text-white">
        Configuração OK
      </Text>

      <Text className="mt-2 text-base text-slate-400">
        Expo Router + NativeWind funcionando
      </Text>
    </View>
  );
}