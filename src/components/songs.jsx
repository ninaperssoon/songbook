import { getSongData } from './data-retriever.jsx'
import { useEffect } from 'react'
import { useState } from 'react'

function Songs() {
    const [songs, setSongs] = useState([])

    useEffect(() => {
      async function fetchSongs() {
        const data = await getSongData()
        setSongs(data)
      }
  
      fetchSongs()
    }, [])

    console.log(songs)

    return (
        <div>
            {songs.map((song) => (
                <div key={song.id}>
                    <h2>{song.title}</h2>
                    <p>{song.author}</p>
                </div> 

            ))}
        </div>
        
    )
}

export default Songs