import FormCard from "@/components/FormCard";
import { postNewBook } from "@/services/BookServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

function newBook() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [editor, setEditor] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [cover, setCover] = useState("");

  const router = useRouter();

  const handleNewBook = async () => {
    setMessage("");

    postNewBook(name, author, editor, Number(year)).then((data) => {
      if (data && data.status === 201) {
        console.log(data)
        setTimeout(() => {
          router.push(`/books/${data.data.id}`);
        }, 800);
        setMessage("mise a jour efféctué - redirection");
      } else {
        setMessage("erreur lors de la création du livre");
      }
    });
  };

  return (
    <View style={styles.Container}>
      <FormCard
        name={name}
        author={author}
        editor={editor}
        year={year}
        cover={cover}
        message={message}
        setName={setName}
        setAuthor={setAuthor}
        setEditor={setEditor}
        setYear={setYear}
        setCover={setCover}
        handleStatusBook={handleNewBook}
        method={"post"}
      />
    </View>
  );
}

export default newBook;

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 12,
  },

  Text: {
    padding: 12,
    backgroundColor: "lightgray",
  },
});
