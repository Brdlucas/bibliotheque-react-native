import { Books } from "@/models/Books";

async function getBooks(): Promise<Books[]> {

  // récupération des books a partir de l'api
  // const response = await fetch("https://api.books.tristan-renard.com/books");
  const response = await fetch("http://localhost:3000/books");
  const data = await response.json();

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


async function getDetailBook(id: number): Promise<Books>{

  // récupération d'un seul book a partir de l'id
  // const response = await fetch(`https://api.books.tristan-renard.com/books/${id}`);
  const response = await fetch(`http://localhost:3000/books/${id}`);
  const data = await response.json();

  return data;
}


async function getDeleteBook(id: number){

  try {
    // récupération d'un seul book a partir de l'id
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE"
    });
  
    const data = await response.json();
  
    if(response.status === 200){
      console.log(data)
      return data;
    }
    
  } catch (error) {
    console.error(error)
  }
  
  
}
export { getBooks, getDeleteBook, getDetailBook };

