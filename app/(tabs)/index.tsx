import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchPratos } from '../../services/pratosService';
import { Prato } from '../../models/prato';
import styles from '../(styles)/listar.style';

export default function HomeScreen() {
  const [pratos, setPratos] = useState<Prato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPratos = async () => {
      try {
        const data = await fetchPratos();
        setPratos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPratos();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pratos</Text>
      <FlatList
        data={pratos}
        keyExtractor={(item) => item.pratoId.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.pratoNome}</Text>
            <Text>{item.pratoDescricao}</Text>
            <Text>R$ {item.pratoValorUnit.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}


