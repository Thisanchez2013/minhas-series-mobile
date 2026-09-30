import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import {
  createSerie,
  getSerieById,
  updateSerie,
} from "../src/database/serieRepository";

export default function FormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [temporadas, setTemporadas] = useState("");
  const [nota, setNota] = useState<number | null>(null);

  const editando = id !== undefined;

  useEffect(() => {
    async function carregarSerie() {
      if (!id) {
        return;
      }

      try {
        const serie = await getSerieById(Number(id));

        if (!serie) {
          return;
        }

        setTitulo(serie.titulo);
        setPlataforma(serie.plataforma);
        setTemporadas(serie.temporadas.toString());
        setNota(serie.nota);
      } catch (error) {
        console.error("Erro ao carregar série:", error);
      }
    }

    carregarSerie();
  }, [id]);

  async function salvar() {
    const tituloLimpo = titulo.trim();
    const plataformaLimpa = plataforma.trim();
    const numeroTemporadas = Number(temporadas);

    if (!tituloLimpo) {
      Alert.alert("Atenção", "Informe o título da série.");
      return;
    }

    if (!plataformaLimpa) {
      Alert.alert("Atenção", "Informe a plataforma.");
      return;
    }

    if (
      temporadas.trim() === "" ||
      !Number.isInteger(numeroTemporadas) ||
      numeroTemporadas < 0
    ) {
      Alert.alert(
        "Atenção",
        "Informe uma quantidade válida de temporadas."
      );
      return;
    }

    try {
      const dados = {
        titulo: tituloLimpo,
        plataforma: plataformaLimpa,
        temporadas: numeroTemporadas,
        nota,
      };

      if (editando && id) {
        await updateSerie(Number(id), dados);
      } else {
        await createSerie(dados);
      }

      router.back();
    } catch (error) {
      console.error("Erro ao salvar série:", error);

      Alert.alert(
        "Erro",
        "Não foi possível salvar a série."
      );
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="p-4"
      keyboardShouldPersistTaps="handled"
    >
      <Text className="mb-6 text-2xl font-bold text-white">
        {editando ? "Editar série" : "Nova série"}
      </Text>

      {/* Título */}
      <View className="mb-4">
        <Text className="mb-2 font-semibold text-slate-300">
          Título
        </Text>

        <TextInput
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Breaking Bad"
          placeholderTextColor="#64748b"
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />
      </View>

      {/* Plataforma */}
      <View className="mb-4">
        <Text className="mb-2 font-semibold text-slate-300">
          Plataforma
        </Text>

        <TextInput
          value={plataforma}
          onChangeText={setPlataforma}
          placeholder="Ex: Netflix"
          placeholderTextColor="#64748b"
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />
      </View>

      {/* Temporadas */}
      <View className="mb-4">
        <Text className="mb-2 font-semibold text-slate-300">
          Temporadas
        </Text>

        <TextInput
          value={temporadas}
          onChangeText={setTemporadas}
          placeholder="Ex: 5"
          placeholderTextColor="#64748b"
          keyboardType="numeric"
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />
      </View>

      {/* Nota */}
      <View>
        <Text className="mb-2 font-semibold text-slate-300">
          Nota
        </Text>

        <View className="flex-row gap-3">
          {[1, 2, 3, 4, 5].map((valor) => (
            <Pressable
              key={valor}
              onPress={() =>
                setNota(nota === valor ? null : valor)
              }
            >
              <Text
                className={`text-4xl ${
                  nota !== null && valor <= nota
                    ? "text-yellow-400"
                    : "text-slate-600"
                }`}
              >
                ★
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="mt-2 text-slate-500">
          {nota === null ? "Sem nota" : `Nota: ${nota}/5`}
        </Text>
      </View>

      {/* Salvar */}
      <Pressable
        onPress={salvar}
        className="mt-8 items-center rounded-xl bg-blue-600 px-4 py-4"
      >
        <Text className="text-base font-bold text-white">
          {editando ? "Salvar alterações" : "Cadastrar série"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}