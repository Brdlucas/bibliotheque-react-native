# 📚 Lucas Bourdon – React Native

---

## 🚀 Lancer le projet avec Expo

1. **Installer les dépendances**

   ```
   npm install
   ```

2. **Démarrer le projet**

   ```
   npx expo start
   ```

---

## 🧩 Structure du projet

### 📂 models
- **Books.ts**
  - Définit le type `Books`, décrivant la structure des objets livre.

### ⚙️ services
- **BookService.ts**
  - Contient les fonctions nécessaires aux appels API (`GET`, `POST`, `PUT`).
  - Exporte plusieurs fonctions suivant le besoin.

### 🧱 components
- **BookCard.tsx**
  - Composant réutilisable appelé dans `index.tsx`.
  - Sert à afficher le rendu d’un livre dans la boucle `books.map()`.

---

## 🔄 Changements récents

### **index.tsx**
- Appel de la fonction `getBooks()` pour récupérer la liste des livres depuis l’API.
- Affichage des livres via un `.map()` qui appelle le composant `BookCard` pour chaque entrée.

### **BookService.tsx**
- Appel de l’API avec la méthode `GET` afin d’obtenir tous les livres disponibles.
- Création d’une constante `books` qui effectue un `.map()` sur `data` pour filtrer et formater les valeurs nécessaires.
- Appel de l'API avec la méthode `GET` afin de récupérer un seul livre a partir de l'`id`.
- Appel de l'API avec la méthode `DELETE` afin de supprimer le livre spécifié.

### **[id].tsx**
- Récupération de l'`id` a partir de l'url (avec `useLocalSearchParams()`) pour l'ajouter dans la function `getDetailBook()` pour ensuite récupérer seulement le livre correspondant a ce dernier.
- Affichage des informations dans le return récupéré depuis `getDetailBook()`
- Ajout d'un bouton pour supprimer le livre et création d'une fonction `handleDeleteBook` qui récupère l'`id` pour supprimer le livre. 
- Redirection vers la page d'acceuil après succès.
---