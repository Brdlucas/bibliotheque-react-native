import { Books } from "@/models/Books";

// penser a changer l'url coté api avec 192.168.0.32 ou localhost
const urlBack = "localhost"
// const urlBack = "192.168.0.32"

async function getBooks(search: string, value: string): Promise<Books[]> {


  // récupération des books a partir de l'api et suivant le filtre de recherche
  const fetchbooks = async () => {
      let response;
      if(!search){
        response = await fetch(`http://${urlBack}:3000/books`);
      }else{
        response = await fetch(`http://${urlBack}:3000/books?${search}=${value}`);
      }
    const data = response.json();
    return data;
  }

  const data = await fetchbooks();

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
  const response = await fetch(`http://${urlBack}:3000/books/${id}`);
  const data = await response.json();

  return data;
}

async function postNewBook(name: string, author: string, editor: string, year: number){

  try {
    // création  d'un book a partir des informations fournies
    // const response = await fetch(`https://api.books.tristan-renard.com/books/${id}`);
    const response = await fetch(`http://${urlBack}:3000/books/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({name, author, editor, year})
    });
    const status = response.status;
    const data = response.ok ? await response.json() : null;

    return { status, data };

  } catch (error) {
    console.error(error);
  }

}

async function updateBooks(id: number, bookData: Partial<Books>){

  try {
    // création  d'un book a partir des informations fournies
    // const response = await fetch(`https://api.books.tristan-renard.com/books/${id}`);
    const response = await fetch(`http://${urlBack}:3000/books/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(bookData)
    });


   const status = response.status;
    const data = response.ok ? await response.json() : null;

    return { status, data };
  } catch (error) {
    console.error(error);
  }

}


async function getDeleteBook(id: number){

  try {
    // récupération d'un seul book a partir de l'id
    const response = await fetch(`http://${urlBack}:3000/books/${id}`, {
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

