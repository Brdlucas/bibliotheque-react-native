import { Notes } from "@/models/Notes";

// penser a changer l'url coté api avec 192.168.0.32 ou localhost
// const urlBack = "localhost"
const urlBack = "192.168.0.32"

async function getNotesByBook(id: number): Promise<Notes[]>{

    const response = await fetch(`http://${urlBack}:3000/books/${id}/notes`);
    const data = await response.json();

   const notes = data.map(
    ({
      id,
      bookId,
      content,
      dateISO
    }: {
      id: Number;
      bookId: Number;
      content: String;
      dateISO: Date;
    }) => ({
      id,
      bookId,
      content,
      dateISO
    })
);
    return notes;
}


async function addNote(idBook: number, content: string) {
    const response = await fetch(`http://${urlBack}:3000/books/${idBook}/notes`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content})
    });

    
    const data = await response.json();
    
    console.log("data add = ", data);

    return data;
}


export {
  addNote, getNotesByBook
};

