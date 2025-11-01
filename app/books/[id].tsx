import StarRating from "@/components/StarRating";
import { Books } from "@/models/Books";
import { Notes } from "@/models/Notes";
import { getDeleteBook, getDetailBook, updateBooks } from "@/services/BookServices";
import { addNote, getNotesByBook } from "@/services/NoteServices";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function BookDetails() {
  const [book, setBook] = useState<Books>();
  const [notes, setNotes] = useState<Notes[]>([]);
  const [contentNote, onChangeContentNote] = useState("");
  const [isActive, setIsActvie] = useState(false);
  const { id } = useLocalSearchParams();
const router = useRouter();

useFocusEffect(
  React.useCallback(() => {
    // récupération du livre en envoyent l'id dans getDetailBook
    getDetailBook(Number(id)).then((data) => setBook(data));
    getNotesByBook(Number(id)).then(data => setNotes(data));

  }, [id])
)

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

 return book && (
    <ScrollView style={styles.page}>
      <View style={styles.containerImage}>
      <Image
        source={book.cover ?{uri: book.cover} : {uri: "https://cdn-icons-png.flaticon.com/512/29/29302.png"}}
        style={styles.cover}
        resizeMode="cover"
      />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <View style={styles.ratingContainer}>
          <StarRating
            rating={book.rating}
            onRatingChange={handleRatingChange}
            editable={true}
            size={32}
          />
          <Text style={styles.ratingText}>{book.rating}/5</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>📖 Éditeur : {book.editor}</Text>
          <Text style={styles.infoText}>📅 Année : {Number(book.year)}</Text>
          <Text style={styles.infoText}>🎨 Thème : {book.theme}</Text>
          <Text style={styles.infoText}>
            {book.read ? "✅ Livre lu" : "📘 Non lu"}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleRead}
          >
            <Text style={styles.buttonText}>
              {book.read ? "Marquer comme non lu" : "Marquer comme lu"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push(`/books/update-book/${book.id}`)}
          >
            <Text style={styles.secondaryButtonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDeleteBook(book.id)}
          >
            <Text style={styles.deleteButtonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.notesSection}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>📝 Notes</Text>
            <Button
              title={isActive ? "Annuler" : "Nouvelle note"}
              onPress={() => setIsActvie(!isActive)}
            />
          </View>

          {isActive && (
            <View style={styles.noteInputCard}>
              <TextInput
                style={styles.textInput}
                value={contentNote}
                onChangeText={onChangeContentNote}
                placeholder="Écrire une note..."
              />
              <Button
                title="Créer la note"
                onPress={() => handleNewNote(book.id)}
              />
            </View>
          )}

          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <Text style={styles.noteContent}>{note.content}</Text>
                <Text style={styles.noteDate}>
                  📅 Le{" "}
                  {new Date(note.dateISO).getDate()}/
                  {new Date(note.dateISO).getMonth() + 1}/
                  {new Date(note.dateISO).getFullYear()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noNotes}>Aucune note pour ce livre.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fdfdfd",
    padding: 8,
  },
  cover: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerImage: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },
  actions: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#4b6cb7",
  },
  secondaryButton: {
    backgroundColor: "#e0e0e0",
  },
  deleteButton: {
    backgroundColor: "#e63946",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  notesSection: {
    marginBottom: 30,
  },
  notesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  noteInputCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  noteContent: {
    color: "#333",
    fontSize: 14,
  },
  noteDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  noNotes: {
    color: "#777",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },
});