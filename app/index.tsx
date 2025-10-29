import BookCard from "@/components/BookCard";
import { Books } from "@/models/Books";
import { getBooks } from "@/services/BookServices";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const [books, setBooks] = useState<Books[]>([]);
  const router = useRouter();

  useEffect(() => {
    getBooks().then(data => setBooks(data));
  }, []);

  return (
      <ScrollView>
        <View style={styles.container}>
      { books.map((value, idx) => (
        <Pressable  key={value.id}  onPress={() => router.push(`/books/${value.id.toString()}`)}>
          <BookCard {...value} />
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
