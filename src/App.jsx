import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [politicians, setPoliticians] = useState([])

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err))
  }, [])

  console.log(politicians)
  return (
    <>
      <h1>Lista Politici:</h1>
      <div className='politicians-container'>
        {politicians.map(politician => (
          <div className='card' key={politician.id}>
            <h2>Nome: {politician.name}</h2>
            <img src={politician.image}></img>
            <h2>Carica: {politician.position}</h2>
            <p>Breve Biografia: {politician.biography}</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default App


