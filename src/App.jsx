import React, { useState, useEffect, useMemo} from 'react'
import './App.css'

//creo un componente per creare le card usando react.memo per evitare il renderind delle card ogni volta che ricarico
const PoliticianCard = React.memo(({name, image, position, biography})=> {
  return  <div className='card' >
            <h2>Nome: {name}</h2>
            <img src={image} alt={name}></img>
            <h2>Carica: {position}</h2>
            <p>Breve Biografia: {biography}</p>
          </div>
})

function App() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch]= useState('')

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err))
  }, [])

  //creo la barra di ricerca filtrata con usememo() , hook di react, che memorizza i valori e ricalcola solo quando le dipndenze cambiano
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
         <PoliticianCard key={politician.id} {...politician}></PoliticianCard>
        ))}

      </div>
    </>
  )
}

export default App


// # 📌 Milestone 3: Ottimizzare il rendering delle card con React.memo
// - Attualmente, ogni volta che l’utente digita nella barra di ricerca,
//  tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
// - Usa React.memo() per evitare il ri-render delle card quando le loro props non 
// cambiano.
// - Aggiungi un console.log() dentro il componente Card per verificare che venga 
// renderizzato solo quando necessario.

// - Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere 
// renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.