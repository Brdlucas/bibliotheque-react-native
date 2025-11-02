import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface FilterPickerProps {
  searchParams?: string;
  setSearchParams: (v: string) => void;
  setValueSearchParams: (v: string) => void;
  setActiveFilter: (v: string | null) => void;
  setSortParams: (v: string) => void;
}

export default function FilterPicker({
  searchParams,
  setSearchParams,
  setValueSearchParams,
  setActiveFilter,
  setSortParams
}: FilterPickerProps) {
  const [activeFilter, setLocalActiveFilter] = useState<string | null>(null);

  const handleShowFilter = (search: string, valueSearch: string, sortParams: string) => {
    const filterKey = search + valueSearch + (sortParams || "");

    if (activeFilter === filterKey) {
      setLocalActiveFilter(null);
      setSearchParams("");
      setValueSearchParams("");
      setActiveFilter(null);
    } else {
      setLocalActiveFilter(filterKey);
      setSearchParams(search);
      setValueSearchParams(valueSearch);
      setSortParams(sortParams);
      setActiveFilter(filterKey);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={activeFilter || ""}
        style={styles.filterButton}
        onValueChange={(itemValue) => {
          switch (itemValue) {
            case "read-true":
              handleShowFilter("read", "true", "");
              break;
            case "read-false":
              handleShowFilter("read", "false", "");
              break;
            case "author-asc":
              handleShowFilter("sort", "author", "asc");
              break;
            case "author-desc":
              handleShowFilter("sort", "author", "desc");
              break;
            case "rating-desc":
              handleShowFilter("sort", "rating", "desc");
              break;
            case "rating-asc":
              handleShowFilter("sort", "rating", "asc");
              break;
            default:
              handleShowFilter("", "", "");
          }
        }}
      >
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Filtrer"
          value=""
        />
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Aucun"
          value=""
        />
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Livre lu"
          value="read-true"
        />
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Livre non lu"
          value="read-false"
        />
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Auteur (A-Z)"
          value="author-asc"
        />
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Auteur (Z-A)"
          value="author-desc"
        />
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Note (meilleur)"
          value="rating-desc"
        />
        <Picker.Item
          style={[styles.filterText, activeFilter && styles.filterTextActive]}
          label="Note (moins bonne)"
          value="rating-asc"
        />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  filterButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  filterTextActive: {
    fontWeight: "bold",
    color: "#007AFF",
  },
});
