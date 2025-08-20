import { getSongData } from './data-retriever.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import './songs.css'

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
                <li><a onClick={() => filterByCategory('Vajan')}>Vajan</a></li>
                <li><a onClick={() => filterByCategory('Norrlands')}>Norrlands</a></li>
                <li><a onClick={() => filterByCategory('Klassiker')}>Klassiker</a></li>
                <li><a onClick={() => filterByCategory('Vänner')}>Vänner</a></li>
            </ul>

            <input type='text' id='search-songs' onChange={filterSongs} placeholder='Sök efter sång'></input>
            <div id="song-container">
                {songs.map((song) => (
                    <div key={song.id} className='song-div'>

                        <div className='songtitle-container'>
                            <h2>{song.title}</h2>

                            {song.melody && (
                                <p style={{fontStyle: 'italic'}}>Mel: {song.melody}</p>
                            )}

                            {song.author && (
                                <p style={{fontStyle: 'italic'}}>Text: {song.author}</p>
                            )}
                        </div>

                        <p style={{ whiteSpace: "pre-line" }}>{song.text}</p>
                    </div> 
                ))}
            </div>
            
        </div>
    )
}

export default Songs