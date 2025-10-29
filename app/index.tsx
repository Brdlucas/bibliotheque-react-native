import BookCard from "@/components/BookCard";
import { Books } from "@/models/Books";
import { getBooks } from "@/services/BookServices";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const [books, setBooks] = useState<Books[]>([]);

  useEffect(() => {
    getBooks().then(data => setBooks(data));
  }, []);

  return (
      <ScrollView>
        <View style={styles.container}>
      { books.map((value, idx) => (
        <Pressable onPress={() => console.log('id =', value.id)}>
          <BookCard key={idx} {...value} />
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
