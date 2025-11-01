import FormCard from "@/components/FormCard";
import { getDetailBook, updateBooks } from "@/services/BookServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function updateBook() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [editor, setEditor] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [cover, setCover] = useState("");

  const router = useRouter();

  useEffect(() => {
    // récupération du livre en envoyent l'id dans getDetailBook
    getDetailBook(Number(id)).then((data) => {
      setName(data.name);
      setAuthor(data.author);
      setEditor(data.editor);
      setYear(String(data.year));
    });
  }, [id]);

  const handleUpdateBook = async () => {
    setMessage("");

    updateBooks(Number(id), {
      name: name,
      author: author,
      editor: editor,
      year: Number(year),
    }).then((data) => {
      if (data && data.status === 200) {
        setTimeout(() => {
          router.push(`/books/${id}`);
        }, 800);
        setMessage("mise a jour efféctué - redirection");
      } else {
        setMessage("erreur lors de la mise a jour du livre");
      }
    });
  };

  return (
    <View>
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
        handleStatusBook={handleUpdateBook}
        method="put"
      />
    </View>
  );
}
