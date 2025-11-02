import { Books } from "@/models/Books";
import { updateBooks } from "@/services/BookServices";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BookCardProps extends Books {
  onUpdate: (updatedBook: Books) => void;
}

export default function BookCard(props: BookCardProps) {
  const { onUpdate, ...book } = props;

  const handleUpdateFavorite = async () => {
    const updatedBook = { ...book, favorite: !book.favorite };
    onUpdate(updatedBook);

    updateBooks(Number(book.id), {
      name: book.name,
      author: book.author,
      editor: book.editor,
      year: Number(book.year),
      favorite: !book.favorite,
    }).then((data) => {
      if (data && data.status !== 200) {
        onUpdate(book);
        console.error("Erreur lors de la mise à jour");
      }
    });
  };

  const defaultCover =
    "https://cdn-icons-png.flaticon.com/512/29/29302.png";
  const coverUri = book.cover ? book.cover : defaultCover;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={handleUpdateFavorite}
      >
        <Ionicons
          name={book.favorite ? "heart" : "heart-outline"}
          size={22}
          color={book.favorite ? "#e63946" : "#999"}
        />
      </TouchableOpacity>
      <View style={styles.row}>
        <Image
          source={{ uri: coverUri }}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>{book.name}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{book.year}</Text>
            <Text style={styles.infoText}>⭐ {book.rating}/5</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              book.read ? styles.readBadge : styles.unreadBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                book.read ? styles.readText : styles.unreadText,
              ]}
            >
              {book.read ? "Lu" : "Non lu"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: "relative",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
    backgroundColor: 'red',
    maxWidth: '90%',
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    color: "#555",
    fontSize: 13,
  },
  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  readBadge: {
    backgroundColor: "#4b6cb7",
  },
  unreadBadge: {
    backgroundColor: "#ccc",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  readText: {
    color: "#fff",
  },
  unreadText: {
    color: "#333",
  },
});