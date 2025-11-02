import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

interface SelectCardProps {
  theme?: string;
  setTheme: (v: string) => void;
}

export default function SelectCard({ theme, setTheme}: SelectCardProps) {
  const themes = [

    "Science-fiction",
    "Fantastique",
    "Fantasy",
    "Romance",
    "Policier",
    "Thriller",
    "Horreur",
    "Aventure",
    "Historique",
    "Drame",
    "Comédie",
    "Philosophique",
    "Poésie",
    "Biographie",
    "Autobiographie",
    "Développement personnel",
    "Documentaire",
    "Psychologique",
  ];

  return (
    <Picker
      style={styles.input}
      selectedValue={theme}
      onValueChange={(itemValue, itemIndex) => setTheme(itemValue)}
    >
      {themes.map((value, idx) => (
        <Picker.Item key={idx} label={value} value={value} />
      ))}
    </Picker>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
});
