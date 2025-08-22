import { getSongData } from './data-retriever.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import './songs.css'

function Songs() {
    const [songs, setSongs] = useState([])
    const [allSongs, setAllSongs] = useState([])
    const overlay = document.getElementById('overlay')
    const [currentSongId, setCurrentSongId] = useState(null);


    useEffect(() => {
        async function fetchSongs() {
            const data = await getSongData()
            setSongs(data)
            setAllSongs(data)
            
        }
        fetchSongs()

        const all = document.getElementById('All')
        all.classList.add('active')

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

        const element = document.getElementById(category)
        element.classList.add('active')

        const all = document.getElementById('All')
        const vajan = document.getElementById('Vajan')
        const norrlands = document.getElementById('Norrlands')
        const classics = document.getElementById('Klassiker')
        const friends = document.getElementById('Vänner')
        
        const categories = [all, vajan, norrlands, classics, friends]

        for (const item of categories) {
            if (item !== element) {
                item.classList.remove('active')
            }
        }

        if (category === 'All') {
            setSongs(allSongs)
            scrollToTop()
            return
        }
        const targetCategory = category.toLowerCase()

        const filteredSongs = allSongs.filter(song =>
            song.category.toLowerCase().includes(targetCategory)
        )

        setSongs(filteredSongs)
        scrollToTop()
        
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function openRegister() {
        overlay.style.display = 'grid'
        document.body.style.overflow ='hidden'
    }

    function findSong(id) {
        closeOverlay()

        setSongs(allSongs)
        filterByCategory('All')

        setCurrentSongId(id)
    }

    function closeOverlay() {
        overlay.style.display = 'none'
        document.body.style.overflow ='auto'
    }

    useEffect(() => {
        if (currentSongId) {
            const navHeight = document.getElementById('nav').offsetHeight;
            const el = document.getElementById(currentSongId);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          setCurrentSongId(null)
        }
    }, [songs, currentSongId]); 

    return (
        <div>
            <div id='nav'>
                <ul>
                    <li><a id='All' onClick={() => filterByCategory('All')}>Alla sånger</a></li>
                    <li><a id='Vajan' onClick={() => filterByCategory('Vajan')}>Vajan</a></li>
                    <li><a id='Norrlands' onClick={() => filterByCategory('Norrlands')}>Norrlands</a></li>
                    <li><a id='Klassiker' onClick={() => filterByCategory('Klassiker')}>Klassiker</a></li>
                    <li><a id='Vänner' onClick={() => filterByCategory('Vänner')}>Vänner</a></li>
                </ul>

                <input type='text' id='search-songs' onChange={filterSongs} placeholder='Sök efter sång'></input>

                <div id='register'>Eller bläddra bland alla sånger i <a onClick={openRegister}>Registret</a></div>
                
            </div>

            <div id="song-container">

                <div id='overlay'>
                    <button onClick={closeOverlay}><p>x</p></button>
                    <div id='overlay-content'>
                        {allSongs.map((song) => (
                            <a key={song.title} onClick={() => findSong(song.id)}>{song.title}</a>
                        ))}
                    </div>
                </div>

                {songs.map((song) => (
                    <div key={song.id} id={song.id} className='song-div'>

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