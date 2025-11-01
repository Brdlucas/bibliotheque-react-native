import BookCard from "@/components/BookCard";
import { Books } from "@/models/Books";
import { getBooks } from "@/services/BookServices";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState, } from "react";
import { Button, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";

export default function Index() {
  const [books, setBooks] = useState<Books[]>([]);
  const router = useRouter();
  const [searchParams, setSearchParams] = useState("");
  const [valueSearchParams, setValueSearchParams] = useState("");
const [activeFilter, setActiveFilter] = useState<string | null>(null);

//  utilisation du useFocusEffect au lieu du useEffect pour rappeler getBooks a chaque affichage de la page
useFocusEffect(
  React.useCallback(() => {
    getBooks(searchParams, valueSearchParams).then(data => setBooks(data));
  }, [searchParams, valueSearchParams])
)


    const handleBookUpdate = (updatedBook: Books) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  };

  const handleShowFilter = async (search: string, valueSearch: string) => {

    if(activeFilter === search + valueSearch){
      setActiveFilter(null);
      setSearchParams("");
      setValueSearchParams("");
    }else {
      setActiveFilter(search + valueSearch);
      setSearchParams(search);
      setValueSearchParams(valueSearch);
    }

  }

  return (
      <ScrollView>
        <View>
          <TextInput style={styles.search} placeholder="rechercher un livre..." onChange={(e) => handleShowFilter("q", e.nativeEvent.text)}  />
          <Button title="favoris" onPress={() => handleShowFilter("favorite", "true")} />
          <Button title="lu" onPress={() => handleShowFilter("read", "true")} />
          <Button title="non lu" onPress={() => handleShowFilter("read", "false")} />
        </View>
        <Button  title="ajouter" onPress={() => router.push('/books/new-book')}/>
        <View style={styles.container}>
      { books.map((value, idx) => (
        <Pressable  key={value.id}  onPress={() => router.push(`/books/${value.id.toString()}`)}>
          <BookCard {...value} onUpdate={handleBookUpdate} />
        </Pressable>
          ))
      }
        </View>
      </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 12,
  },

  search: {
    padding: 12
  }
})
