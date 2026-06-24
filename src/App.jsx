import { useState, useEffect, useMemo} from 'react'
import './App.css'

function App() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch]= useState('')

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err))
  }, [])

 const filterResults= useMemo(()=>{
  return politicians.filter(politician => {
    const searchName= politician.name.toLowerCase().includes(search.toLocaleLowerCase())
    const searchBio= politician.biography.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    return searchName || searchBio
  })
 },[politicians,search])
  return (
    <>
      <h1>Lista Politici:</h1>
      <input type='text' 
      placeholder='Cerca per nome o biografia' 
      value={search}
        onChange={e =>setSearch(e.target.value)}
      ></input>
      <div className='politicians-container'>
        {filterResults.map(politician => (
          <div className='card' key={politician.id}>
            <h2>Nome: {politician.name}</h2>
            <img src={politician.image} alt={politician.name}></img>
            <h2>Carica: {politician.position}</h2>
            <p>Breve Biografia: {politician.biography}</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default App


// # 📌 Milestone 2: Implementare la ricerca ottimizzata
// - Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
// - Permetti all’utente di filtrare i risultati in base a nome o biografia 
// (se il testo cercato è incluso). 
// Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando
//  cambia la lista di politici o il valore della ricerca.
// - ❌ Non usare useEffect per aggiornare l’array filtrato.

// - Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.