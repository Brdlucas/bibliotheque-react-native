import BookCard from "@/components/BookCard";
import { Books } from "@/models/Books";
import { getBooks } from "@/services/BookServices";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const [books, setBooks] = useState<Books[]>([]);
  const router = useRouter();
  const [searchParams, setSearchParams] = useState("");
  const [valueSearchParams, setValueSearchParams] = useState("");
const [activeFilter, setActiveFilter] = useState<string | null>(null);


  useEffect(() => {
    getBooks(searchParams, valueSearchParams).then(data => setBooks(data));
  }, [searchParams, valueSearchParams]);


    const handleBookUpdate = (updatedBook: Books) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  };

  const handleShowFavorite = async (search: string, valueSearch: string) => {

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
          <Button title="favoris" onPress={() => handleShowFavorite("favorite", "true")} />
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
  }
})
