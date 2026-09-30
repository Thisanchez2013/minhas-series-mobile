import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { getSeries } from "../src/database/serieRepository";
import { Serie, SerieFilter } from "../src/types/serie";

export default function HomeScreen() {
  const [filtro, setFiltro] = useState<SerieFilter>("todas");
  const [series, setSeries] = useState<Serie[]>([]);

  const carregarSeries = useCallback(async () => {
    try {
      const dados = await getSeries(filtro);
      setSeries(dados);
    } catch (error) {
      console.error("Erro ao carregar séries:", error);
    }
  }, [filtro]);

  useFocusEffect(
    useCallback(() => {
      carregarSeries();
    }, [carregarSeries])
  );

  return (
    <View className="flex-1 bg-slate-950 p-4">
      <Text className="mb-4 text-2xl font-bold text-white">
        Suas séries
      </Text>

      {/* Filtros */}
      <View className="flex-row gap-2">
        <Pressable
          onPress={() => setFiltro("todas")}
          className={`rounded-full px-4 py-2 ${
            filtro === "todas" ? "bg-blue-600" : "bg-slate-800"
          }`}
        >
          <Text className="font-semibold text-white">
            Todas
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFiltro("assistindo")}
          className={`rounded-full px-4 py-2 ${
            filtro === "assistindo" ? "bg-blue-600" : "bg-slate-800"
          }`}
        >
          <Text className="font-semibold text-white">
            Assistindo
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFiltro("concluidas")}
          className={`rounded-full px-4 py-2 ${
            filtro === "concluidas" ? "bg-blue-600" : "bg-slate-800"
          }`}
        >
          <Text className="font-semibold text-white">
            Concluídas
          </Text>
        </Pressable>
      </View>

      {/* Lista de séries */}
      <FlatList
        data={series}
        keyExtractor={(item) => item.id.toString()}
        className="mt-4"
        contentContainerClassName="gap-3 pb-24"
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-lg font-semibold text-slate-400">
              Nenhuma série encontrada
            </Text>

            <Text className="mt-1 text-center text-slate-500">
              Cadastre uma série para começar.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/detalhe",
                params: { id: item.id.toString() },
              })
            }
            className={`rounded-2xl border p-4 ${
              item.concluida === 1
                ? "border-emerald-800 bg-emerald-950"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-lg font-bold text-white">
                  {item.titulo}
                </Text>

                <Text className="mt-1 text-slate-400">
                  {item.plataforma}
                </Text>
              </View>

              {item.concluida === 1 && (
                <Text className="font-semibold text-emerald-400">
                  Concluída
                </Text>
              )}
            </View>

            <View className="mt-4 flex-row justify-between">
              <Text className="text-slate-300">
                {item.temporadas} temporada(s)
              </Text>

              <Text className="text-slate-300">
                {item.nota === null
                  ? "Sem nota"
                  : `★ ${item.nota}/5`}
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* Botão para cadastrar nova série */}
      <Pressable
        onPress={() => router.push("/form")}
        className="absolute bottom-6 right-6 rounded-full bg-blue-600 px-6 py-4"
      >
        <Text className="font-bold text-white">
          + Nova série
        </Text>
      </Pressable>
    </View>
  );
}