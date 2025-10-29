import { Books } from '@/models/Books'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function BookCard(book: Books) {
  return (
    <View style={styles.container}>
        <Text>{book.name}</Text>
        <Text>{book.author}</Text>
        <Text>{Number(book.year)}</Text>
        <Text>{Number(book.rating)}/5</Text>
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