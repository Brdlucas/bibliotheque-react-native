

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
    editable: boolean;
    size: number;
}

export default function StarRating({rating, onRatingChange, editable = true,size = 30 }: StarRatingProps) {

    const handlePress = async (selectRating: number) => {
        if(editable && onRatingChange){
            onRatingChange(selectRating);
        }
    }
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handlePress(star)}
          disabled={!editable}
          activeOpacity={0.7}
        >
          <View style={[styles.star, { width: size, height: size}]}>
            <Star filled={star <= rating} size={size} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}


function Star({ filled, size }: { filled: boolean; size: number }) {
  return (
    <View style={[styles.starShape, { 
      width: size, 
      height: size,
        }]}>
      <View style={styles.starText}>
        {filled ?<Ionicons name="star-sharp" size={24} color={"#FFD700"} /> :  <Ionicons name="star-outline" size={24} color="black" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 8
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starShape: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});