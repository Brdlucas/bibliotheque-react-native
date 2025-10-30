import { getDetailBook, updateBooks } from "@/services/BookServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function updateBook() {
    const { id } = useLocalSearchParams();

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [editor, setEditor] = useState("");
    const [year, setYear] = useState("");
    const [message, setMessage] = useState("");

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

      updateBooks(Number(id), {name: name, author: author, editor: author, year: Number(year)}).then(data => {
          if(data === 200){
            setTimeout(() => {
              router.push('/')
            }, 800)
            setMessage("mise a jour efféctué - redirection")
          }else {
            setMessage("erreur lors de la mise a jour du livre")
          }
        });
    };

    
  return (
    <View style={styles.Container}> 
      <Text>mettre a jour un livre</Text>
      <TextInput style={styles.Text} value={name} onChangeText={setName} />
      <TextInput style={styles.Text} value={author} onChangeText={setAuthor}/>
      <TextInput style={styles.Text} value={editor} onChangeText={setEditor}/>
      <TextInput style={styles.Text} value={year} onChangeText={setYear}/>
      <Text>{message && message}</Text>
      <Button title="mettre a jour"  onPress={() => handleUpdateBook()}/>
    </View>
  )
}

export default updateBook


const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 12
    },

    Text: {
        padding: 12,
        backgroundColor: 'lightgray'
    }
})