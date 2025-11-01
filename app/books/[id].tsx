import StarRating from "@/components/StarRating";
import { Books } from "@/models/Books";
import { Notes } from "@/models/Notes";
import { getDeleteBook, getDetailBook, updateBooks } from "@/services/BookServices";
import { addNote, getNotesByBook } from "@/services/NoteServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function BookDetails() {
  const [book, setBook] = useState<Books>();
  const [notes, setNotes] = useState<Notes[]>([]);
  const [contentNote, onChangeContentNote] = useState("");
  const [isActive, setIsActvie] = useState(false);
  const { id } = useLocalSearchParams();
const router = useRouter();

  useEffect(() => {
    // récupération du livre en envoyent l'id dans getDetailBook
    getDetailBook(Number(id)).then((data) => setBook(data));
    getNotesByBook(Number(id)).then(data => setNotes(data));
  }, [id]);


  const handleDeleteBook = async (id: number) => {
    // redirection sur la page home après redirection
    getDeleteBook(id).then(() => router.navigate('/'));
  };


  const handleNewNote = async (id: number) => {
    addNote(Number(id), contentNote).then((data) => {
      setNotes([...notes, data])
      onChangeContentNote("");
      setIsActvie(!isActive);
      });
  }

  const handleRead = async () => {
      updateBooks(Number(id), {name: book?.name, author: book?.author, editor: book?.editor, year:Number(book?.year), read: !book?.read}).then((data) => {
        if(data && data.status === 200){
          setBook(data.data)
        }
      });
  }

  const handleRatingChange = async (newRating: number) => {
      updateBooks(Number(id), {name: book?.name, author: book?.author, editor: book?.editor, year: Number(book?.year), rating: newRating}).then(data => {
        if(data && data.status === 200){
          setBook(data.data)
        }
      })
}

  return (
    <ScrollView>
      {book && (
        <View>
          <View style={styles.Container}>
          <Button title={book.read ? "lu" : "non lu"} onPress={() => handleRead()} />
          <Button title="modifier" onPress={() => router.push(`/books/update-book/${book.id.toString()}`)} />
          <Button title="supprimer" onPress={() => handleDeleteBook(book.id)} />
            <StarRating rating={book.rating} onRatingChange={handleRatingChange} editable={true} size={32} />
          <Text style={styles.Text}>auteur: {book.author}</Text>
          <Text style={styles.Text}>editeur: {book.editor}</Text>
          <Text style={styles.Text}>nom: {book.name}</Text>
          <Text style={styles.Text}>année: {Number(book.year)}</Text>
          <Text style={styles.Text}>note: {Number(book.rating)}/5</Text>
          <Text style={styles.Text}>theme: {book.theme}</Text>
          <Button title="nouvelle note" onPress={() => setIsActvie(!isActive) } />
          {
            isActive && (
          <View style={styles.ContainerCard}>
          <TextInput style={styles.TextCard} value={contentNote} onChangeText={onChangeContentNote}/>
          <Button title="créer la note" onPress={() => handleNewNote(book.id)} />
          </View>
            )
          }
          {
            notes && notes.map(value => (
              <View key={value.id}>
                <Text>{value.content}</Text>
                <Text>le {new Date(value.dateISO).getDate()}/{new Date(value.dateISO).getMonth()}/{new Date(value.dateISO).getFullYear()}</Text>
              </View>
            ))
          }
          </View>
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  Container:{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 12
  },

  ContainerCard: {
  backgroundColor: 'gray',
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 16,
  padding: 12,
  },

  TextCard: {
  backgroundColor: 'lightgray',
  padding: 6

  },

  Text: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray'
  }
})