import { Books } from "@/models/Books";

async function getBooks(): Promise<Books[]> {

  // récupération des books a partir de l'api
  const response = await fetch("https://api.books.tristan-renard.com/books");
  const data = await response.json();
  console.log("data", data);

//   mise en forme de la variable books en récupérent les éléments pertinents
  const books = data.map(
    ({
      id,
      name,
      author,
      editor,
      year,
      read,
      favorite,
      rating,
      cover,
      theme,
    }: {
      id: Number;
      name: String;
      author: String;
      editor: String;
      year: Number;
      read: Boolean;
      favorite: Boolean;
      rating: Number;
      cover: String;
      theme: String;
    }) => ({
      id,
      name,
      author,
      editor,
      year,
      read,
      favorite,
      rating,
      cover,
      theme,
    })
  );

  return books;
}

export { getBooks };

