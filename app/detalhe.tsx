import { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import {
  deleteSerie,
  getSerieById,
  toggleSerieConcluida,
} from "../src/database/serieRepository";
import { Serie } from "../src/types/serie";

export default function DetalheScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [serie, setSerie] = useState<Serie | null>(null);

  const carregarSerie = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      const dados = await getSerieById(Number(id));
      setSerie(dados);
    } catch (error) {
      console.error("Erro ao carregar série:", error);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregarSerie();
    }, [carregarSerie])
  );

  async function alternarConcluida() {
    if (!serie) {
      return;
    }

    try {
      await toggleSerieConcluida(serie.id);
      await carregarSerie();
    } catch (error) {
      console.error("Erro ao alterar status da série:", error);

      Alert.alert(
        "Erro",
        "Não foi possível alterar o status da série."
      );
    }
  }

  function editarSerie() {
    if (!serie) {
      return;
    }

    router.push({
      pathname: "/form",
      params: { id: serie.id.toString() },
    });
  }

  function confirmarExclusao() {
    if (!serie) {
      return;
    }

    Alert.alert(
      "Excluir série",
      `Deseja realmente excluir "${serie.titulo}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSerie(serie.id);
              router.back();
            } catch (error) {
              console.error("Erro ao excluir série:", error);

              Alert.alert(
                "Erro",
                "Não foi possível excluir a série."
              );
            }
          },
        },
      ]
    );
  }

  if (!serie) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950">
        <Text className="text-slate-400">
          Carregando série...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="p-4"
    >
      {/* Informações principais */}
      <View className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-2xl font-bold text-white">
              {serie.titulo}
            </Text>

            <Text className="mt-1 text-base text-slate-400">
              {serie.plataforma}
            </Text>
          </View>

          <View
            className={`rounded-full px-3 py-2 ${
              serie.concluida === 1
                ? "bg-emerald-950"
                : "bg-blue-950"
            }`}
          >
            <Text
              className={`font-semibold ${
                serie.concluida === 1
                  ? "text-emerald-400"
                  : "text-blue-400"
              }`}
            >
              {serie.concluida === 1
                ? "Concluída"
                : "Assistindo"}
            </Text>
          </View>
        </View>

        {/* Temporadas */}
        <View className="mt-6 border-t border-slate-800 pt-4">
          <Text className="text-sm text-slate-500">
            Temporadas
          </Text>

          <Text className="mt-1 text-lg font-semibold text-white">
            {serie.temporadas}
          </Text>
        </View>

        {/* Nota */}
        <View className="mt-4">
          <Text className="text-sm text-slate-500">
            Avaliação
          </Text>

          <Text className="mt-1 text-lg font-semibold text-white">
            {serie.nota === null
              ? "Sem nota"
              : `★ ${serie.nota}/5`}
          </Text>
        </View>

        {/* Data de cadastro */}
        <View className="mt-4">
          <Text className="text-sm text-slate-500">
            Cadastrada em
          </Text>

          <Text className="mt-1 text-slate-300">
            {new Date(serie.createdAt).toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </View>

      {/* Alterar status */}
      <Pressable
        onPress={alternarConcluida}
        className={`mt-6 items-center rounded-xl px-4 py-4 ${
          serie.concluida === 1
            ? "bg-slate-700"
            : "bg-emerald-600"
        }`}
      >
        <Text className="font-bold text-white">
          {serie.concluida === 1
            ? "Voltar a assistir"
            : "Marcar como concluída"}
        </Text>
      </Pressable>

      {/* Editar */}
      <Pressable
        onPress={editarSerie}
        className="mt-3 items-center rounded-xl bg-blue-600 px-4 py-4"
      >
        <Text className="font-bold text-white">
          Editar série
        </Text>
      </Pressable>

      {/* Excluir */}
      <Pressable
        onPress={confirmarExclusao}
        className="mt-3 items-center rounded-xl border border-red-900 bg-red-950 px-4 py-4"
      >
        <Text className="font-bold text-red-400">
          Excluir série
        </Text>
      </Pressable>
    </ScrollView>
  );
}