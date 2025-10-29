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

async function postNewBook(name: string, author: string, editor: string, year: number){

  try {
    // création  d'un book a partir des informations fournies
    // const response = await fetch(`https://api.books.tristan-renard.com/books/${id}`);
    const response = await fetch(`http://localhost:3000/books/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({name, author, editor, year})
    });
  
    if(response.status === 201){
      return response.status;
    }else {
      console.error('Erreur lors de la création du livre');
      return response.status;
    }

  } catch (error) {
    console.error(error);
  }

}

async function updateBooks(id: number, name: string, author: string, editor: string, year: number){

  try {
    // création  d'un book a partir des informations fournies
    // const response = await fetch(`https://api.books.tristan-renard.com/books/${id}`);
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({name, author, editor, year})
    });

    console.log(response.status);

    if(response.status === 200){
      return response.status;
    }else {
      console.error('Erreur lors de la mise a jour du livre');
      return response.status;
    }

  } catch (error) {
    console.error(error);
  }

}


async function getDeleteBook(id: number){

  try {
    // récupération d'un seul book a partir de l'id
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE"
    });
    
    if(response.status === 200){
      return response.status;
    }
    
  } catch (error) {
    console.error(error)
  }
  
  
}
export { getBooks, getDeleteBook, getDetailBook, postNewBook, updateBooks };

