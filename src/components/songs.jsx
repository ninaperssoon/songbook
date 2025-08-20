import { getSongData } from './data-retriever.jsx'
import { useEffect } from 'react'
import { useState } from 'react'

function Songs() {
    const [songs, setSongs] = useState([])
    const [allSongs, setAllSongs] = useState([])

    useEffect(() => {
      async function fetchSongs() {
        const data = await getSongData()
        setSongs(data)
        setAllSongs(data)
      }
  
      fetchSongs()
    }, [])

    const filterSongs = (e) => {
        const target = e.target.value.toLowerCase()
      
        if (target.length === 0) {
          setSongs(allSongs)
          return
        }
      
        const filteredSongs = allSongs.filter(song =>
          song.title.toLowerCase().includes(target)
        )
      
        setSongs(filteredSongs)
      }

    return (
        <div>
            <input type='text' id='search-songs' onChange={filterSongs} placeholder='Sök efter sång'></input>

            {songs.map((song) => (
                <div key={song.id}>
                    <h2>{song.title}</h2>
                    <p>{song.author}</p>
                    <p>{song.melody}</p>
                    <p>{song.text}</p>
                </div> 
            ))}
        </div>
        
    )
}

export default Songs