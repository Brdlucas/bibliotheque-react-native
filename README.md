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
  - Définit le type `Books`, décrivant la structure des objets livres.
- **Notes.ts**
  - Définit le type `Notes`, décrivant la structure des objets notes.

### ⚙️ services
- **BookServices.ts**
  - Contient les fonctions nécessaires aux appels API (`GET`, `POST`, `PUT`, `DELETE`).
  - Exporte plusieurs fonctions suivant les besoins.
- **NoteServices.ts**
  - Contient les fonctions nécessaires aux appels API (`GET`, `POST`).
  - Exporte plusieurs fonctions suivant les besoins.

### 🧱 components
- **BookCard.tsx**
  - Composant réutilisable appelé dans `index.tsx`.
  - Sert à afficher le rendu d’un livre dans la boucle `books.map()`.

---

## 🔄 Changements récents

### **index.tsx**
- Appel de la fonction `getBooks()` pour récupérer la liste des livres depuis l’API.
- Affichage des livres via un `.map()` qui appelle le composant `BookCard` pour chaque entrée.

### **BookServices.tsx**
- Appel de l’API avec la méthode `GET` afin d’obtenir tous les livres disponibles.
- Création d’une constante `books` qui effectue un `.map()` sur `data` pour filtrer et formater les valeurs nécessaires.
- Appel de l'API avec la méthode `GET` afin de récupérer un seul livre a partir de l'`id`.
- Appel de l'API avec la méthode `DELETE` afin de supprimer le livre spécifié.
   Appel de l'API avec la méthode `POST` afin de créer  un nouveau livre a partir des informations données **(name, author, editor, year)**.
-  Appel de l'API avec la méthode `PUT` afin de mettre a jour le livre spécifié et retourne le status.
### **[id].tsx**
- Récupération de l'`id` a partir de l'url (avec `useLocalSearchParams()`) pour l'ajouter dans la function `getDetailBook()` pour ensuite récupérer seulement le livre correspondant a ce dernier.
- Affichage des informations dans le return récupéré depuis `getDetailBook()`
- Ajout d'un bouton pour supprimer le livre et création d'une fonction `handleDeleteBook` qui récupère l'`id` pour supprimer le livre. 
- Redirection vers la page d'acceuil après succès.
- Ajout d'un bouton de redirection vers la page de modification.
- Appel de la fonction `getNotesByBook()` pour récupérer les notes en relation avec le livre.
- Création d'un bouton qui permet d'afficher ou non le 'formulaire' pour ajouter une nouvelle note.
- Création d'une fonction `handleNewNote()` qui récupère l'id pour l'envoyer dans `addNote()` (avec le contenu) afin de créer une nouvelle note en rapport avec le livre, puis mise a jour du tableau `notes` pour un affichage dynamique.

### **new-book.tsx**
- Création de plusieurs champs pour rentrer les informations minimum a la création d'un livre **(name, author, editor, year)**.
- Au clique du bouton de création, on envoies les informations des variables cités ci-dessus a la fonction `postNewBook()` puis si lors du return, on recoit un status `201` on renvoie l'utilisateur sur la page d'acceuil.
### **update-book/[id].tsx**
- récupération des informations du livre que l'on veut modifier a partir de l'id (a l'aide de `useLocalSearchParams()`).
- Création des variables qui vont contenir les valeurs récupérés depuis `getDetailBook()` mais aussi ceux modifié a partir du `TextInput`.
- Création d'une fonction nommée `handleUpdateBook()` asynchrone qui appele la fonction `updateBooks()`  permettent pour mettre a jour les informations du "formulaire".
- Redirection vers la page d'acceuil après que la mise a jour sois valide.

### **NoteServices.tsx**
- Appel de l’API avec la méthode `GET` afin d’obtenir toutes les notes en rapport avec livre.
- Appel de l’API avec la méthode `POST` afin de créer une nouvelle note affilié au livre.
---