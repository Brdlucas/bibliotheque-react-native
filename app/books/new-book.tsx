import { postNewBook } from "@/services/BookServices";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function newBook() {
    const [name, onChangeName] = useState("");
    const [author, onChangeAuthor] = useState("");
    const [editor, onChangeEditor] = useState("");
    const [year, onChangeYear] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleNewBook = async () => {
        setMessage("");

        postNewBook(name, author, editor, Number(year)).then(data => {
            if(data === 201){
                 setTimeout(() => {
              router.push('/')
            }, 800)
            setMessage("mise a jour efféctué - redirection")
        }else {
            setMessage("erreur lors de la création du livre")
            }
        });
    };

    
  return (
    <View style={styles.Container}>
      <Text>nouveaux livre</Text>
      <TextInput style={styles.Text} value={name} onChangeText={onChangeName} />
      <TextInput style={styles.Text} value={author} onChangeText={onChangeAuthor}/>
      <TextInput style={styles.Text} value={editor} onChangeText={onChangeEditor}/>
      <TextInput style={styles.Text} value={year} onChangeText={onChangeYear}/>
      <Text>{message && message}</Text>
      <Button title="créer un nouveau livre"  onPress={() => handleNewBook()}/>
    </View>
  )
}

export default newBook


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