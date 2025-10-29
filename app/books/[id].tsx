import { Books } from "@/models/Books";
import { getDeleteBook, getDetailBook } from "@/services/BookServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function BookDetails() {
  const [book, setBook] = useState<Books>();
  const { id } = useLocalSearchParams();
const router = useRouter();

  useEffect(() => {
    // récupération du livre en envoyent l'id dans getDetailBook
    getDetailBook(Number(id)).then((data) => setBook(data));
  }, [id]);


  const handleDeleteBook = async (id: number) => {
    // redirection sur la page home après redirection
    getDeleteBook(id).then(() => router.navigate('/'));
  };

  return (
    <View>
      {book && (
        <View>
          <Button title="supprimer" onPress={() => handleDeleteBook(book.id)} />
          <View style={styles.Container}>
          <Text style={styles.Text}>auteur: {book.author}</Text>
          <Text style={styles.Text}>editeur: {book.editor}</Text>
          <Text style={styles.Text}>nom: {book.name}</Text>
          <Text style={styles.Text}>année: {Number(book.year)}</Text>
          <Text style={styles.Text}>note: {Number(book.rating)}/5</Text>
          <Text style={styles.Text}>theme: {book.theme}</Text>
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  Container:{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 12
  },

  Text: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray'
  }
})