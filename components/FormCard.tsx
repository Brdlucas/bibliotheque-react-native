import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface FormCardProps {
  name: string;
  author: string;
  editor: string;
  year: string;
  cover?: string;
  message?: string;
  image?: string;
  setName: (v: string) => void;
  setAuthor: (v: string) => void;
  setEditor: (v: string) => void;
  setYear: (v: string) => void;
  setCover: (v: string) => void;
  handleStatusBook: () => void;
  method: string;
}

export default function FormCard({
  name,
  author,
  editor,
  year,
  cover,
  message,
  setName,
  setAuthor,
  setEditor,
  setYear,
  setCover,
  handleStatusBook,
  method,
}: FormCardProps) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setCover(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.headerTitle}>
        📖 {method == "put" ? "Mettre à jour un livre" : "Créer un livre"}
      </Text>
      <View style={styles.form}>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="image-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>

        <View style={styles.previewContainer}>
          {cover ? (
            <>
              <Image source={{ uri: cover }} style={styles.imagePreview} />
              <Text style={styles.previewText}>Aperçu de la couverture</Text>
            </>
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="book-outline" size={50} color="#999" />
              <Text style={styles.placeholderText}>
                Aucune image sélectionnée
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.label}>Nom du livre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Le Petit Prince"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Auteur</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder="Ex: Antoine de Saint-Exupéry"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Éditeur</Text>
        <TextInput
          style={styles.input}
          value={editor}
          onChangeText={setEditor}
          placeholder="Ex: Gallimard"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Année</Text>
        <TextInput
          style={styles.input}
          value={year}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, "").slice(0, 4);
            setYear(numericText);
          }}
          keyboardType="numeric"
          placeholder="Ex: 1943"
          placeholderTextColor="#aaa"
        />
        {message ? (
          <Text
            style={[
              styles.message,
              message.toLowerCase().includes("erreur")
                ? styles.errorMessage
                : styles.successMessage,
            ]}
          >
            {message}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => (year !== "" ? handleStatusBook() : null)}
        >
          <Text style={styles.updateButtonText}>
            {method == "put" ? "💾 Mettre à jour un livre" : "Créer le livre"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: "#fdfdfd",
    padding: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  coverContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  cover: {
    width: 150,
    height: 220,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  form: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },

  message: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },

  successMessage: {
    color: "#2a9d8f",
  },

  errorMessage: {
    color: "#e63946",
  },

  updateButton: {
    marginTop: 20,
    backgroundColor: "#4b6cb7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  container: {
    marginTop: 16,
    marginBottom: 20,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b6cb7",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },

  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  imagePreview: {
    width: 150,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },

  previewText: {
    color: "#555",
    fontSize: 13,
  },

  placeholder: {
    width: 150,
    height: 200,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  placeholderText: {
    color: "#999",
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center'
  },
});
