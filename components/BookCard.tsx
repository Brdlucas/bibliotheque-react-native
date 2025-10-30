import { Books } from '@/models/Books';
import { updateBooks } from '@/services/BookServices';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BookCardProps extends Books {
  onUpdate: (updatedBook: Books) => void;
} 

function BookCard(props: BookCardProps) {
 const {onUpdate, ...book} = props


  const handleUpdateFavorite = async () => {
    const updateBook = {
      ...book,
      favorite: !book.favorite
    }

    onUpdate(updateBook);

    updateBooks(Number(book.id), {
      name: book.name, 
      author: book.author, 
      editor: book.editor, 
      year: Number(book.year), 
      favorite: !book.favorite
    }).then(data => {
      if (data !== 200) {
        onUpdate(book);
        console.error("Erreur lors de la mise à jour");
      }
    });

  }

  return (
    <View style={styles.container}>
      <Ionicons name={!book.favorite ? "heart-outline" : "heart-sharp" } size={24} color={book.favorite ? "red" : "black"} onPress={handleUpdateFavorite} />
        <Text>{book.name}</Text>
        <Text>{book.author}</Text>
        <Text>{Number(book.year)}</Text>
        <Text>{Number(book.rating)}/5</Text>
        <Text>{Number(book.favorite)}</Text>
    </View>
  )
}

export default BookCard


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'lightgray',
        borderRadius: 16,
        padding: 4,
        height: 200,
        shadowColor:"#000000",
        shadowOffset: {
   width: 0,
   height: 0,
},
shadowOpacity: 1,
shadowRadius: 12,
elevation: 0
},
})