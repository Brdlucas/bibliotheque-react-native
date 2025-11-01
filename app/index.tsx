import BookCard from "@/components/BookCard";
import { Books } from "@/models/Books";
import { getBooks } from "@/services/BookServices";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [books, setBooks] = useState<Books[]>([]);
  const router = useRouter();
  const [searchParams, setSearchParams] = useState("");
  const [valueSearchParams, setValueSearchParams] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  //  utilisation du useFocusEffect au lieu du useEffect pour rappeler getBooks a chaque affichage de la page
  useFocusEffect(
    React.useCallback(() => {
      getBooks(searchParams, valueSearchParams).then((data) => setBooks(data));
    }, [searchParams, valueSearchParams])
  );

  const handleBookUpdate = (updatedBook: Books) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleShowFilter = async (search: string, valueSearch: string) => {
    if (activeFilter === search + valueSearch) {
      setActiveFilter(null);
      setSearchParams("");
      setValueSearchParams("");
    } else {
      setActiveFilter(search + valueSearch);
      setSearchParams(search);
      setValueSearchParams(valueSearch);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Ma Bibliothèque</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Rechercher un livre..."
          placeholderTextColor="#aaa"
          onChange={(e) => handleShowFilter("q", e.nativeEvent.text)}
        />
      </View>
      <View style={styles.filters}>
        <FilterButton
          label="Favoris"
          active={activeFilter === "favoritetrue"}
          onPress={() => handleShowFilter("favorite", "true")}
        />
        <FilterButton
          label="Lu"
          active={activeFilter === "readtrue"}
          onPress={() => handleShowFilter("read", "true")}
        />
        <FilterButton
          label="Non lu"
          active={activeFilter === "readfalse"}
          onPress={() => handleShowFilter("read", "false")}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/books/new-book")}
      >
        <Text style={styles.addButtonText}>+ Ajouter un livre</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {books.map((book) => (
          <Pressable
            key={book.id}
            onPress={() => router.push(`/books/${book.id}`)}
          >
            <BookCard {...book} onUpdate={handleBookUpdate} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
function FilterButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  filterButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: "#4b6cb7",
  },
  filterText: {
    color: "#333",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
  },
  addButton: {
    marginHorizontal: 16,
    backgroundColor: "#4b6cb7",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 12,
    paddingBottom: 100,
    gap: 16,
  },
});
