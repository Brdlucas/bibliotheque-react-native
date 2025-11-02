import FormCard from "@/components/FormCard";
import { postNewBook } from "@/services/BookServices";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

function newBook() {

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [editor, setEditor] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [cover, setCover] = useState("");
  const [theme, setTheme] = useState("");

  const router = useRouter();

  const handleNewBook = async () => {

    setMessage("");

    postNewBook(name, author, editor, Number(year), cover, theme).then((data) => {
      if (data && data.status === 201) {
        setTimeout(() => {
          router.push(`/books/${data.data.id}`);
        }, 800);
        setMessage("création du livre efféctué - redirection");
      } else {
        setMessage("erreur lors de la création du livre");
      }
    });
  };

  return (
    <ScrollView style={styles.Container}>
      <FormCard
        name={name}
        author={author}
        editor={editor}
        year={year}
        cover={cover}
        theme={theme}
        message={message}
        setName={setName}
        setAuthor={setAuthor}
        setEditor={setEditor}
        setYear={setYear}
        setCover={setCover}
        setTheme={setTheme}
        handleStatusBook={handleNewBook}
        method={"post"}
      />
    </ScrollView>
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
