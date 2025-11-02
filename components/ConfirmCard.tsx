import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ConfirmCardProps {
  id: number;
  name: string;
  setIsDeleteActive: (v: boolean) => void;
  handleDeleteBook: (v: number) => void;
}

export default function ConfirmCard({
  id,
  name,
  setIsDeleteActive,
  handleDeleteBook,
}: ConfirmCardProps) {
  return (
    <View style={styles.deleteCard}>
      <Text style={styles.Text}>Voulez-vous vraiment supprimer le livre {name} ?</Text>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.buttonSharp}
          onPress={() => handleDeleteBook(id)}
        >
          <Text style={styles.buttonTextSharp}>OUI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsDeleteActive(false)}
        >
          <Text style={styles.buttonText}>NON</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteCard: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -100 }],
    width: 300,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    gap: 16
},

    buttonSharp: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#4b6cb7",
    color: "#fff",
    maxWidth: 100,
    width: '100%'
}
,
    button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4b6cb7",
    maxWidth: 100,
    width: '100%'
},

ButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
},

Text: {
    textAlign: 'center',
  },

  buttonTextSharp: {
    color: "#fff",
    fontWeight: "600",
  },

  buttonText: {
    color: "#4b6cb7",
    fontWeight: "600",
  },
});
