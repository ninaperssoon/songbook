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

    function filterByCategory(category) {

        if (category === 'All') {
            setSongs(allSongs)
            return
        }
        const targetCategory = category.toLowerCase()

        const filteredSongs = allSongs.filter(song =>
            song.category.toLowerCase().includes(targetCategory)
        )

        setSongs(filteredSongs)
    }

    return (
        <div>
            <ul>
                <li><a onClick={() => filterByCategory('All')}>Alla sånger</a></li>
                <li><a onClick={() => filterByCategory('Kat 1')}>Kat 1</a></li>
                <li><a onClick={() => filterByCategory('Kat 2')}>Kat 2</a></li>
            </ul>

            <input type='text' id='search-songs' onChange={filterSongs} placeholder='Sök efter sång'></input>

            {songs.map((song) => (
                <div key={song.id}>
                    <h2>{song.title}</h2>
                    <p>Mel: {song.melody}</p>
                    <p>Text: {song.author}</p>
                    <p>{song.text}</p>
                </div> 
            ))}
        </div>
        
    )
}

export default Songs