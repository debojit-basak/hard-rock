const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')

// API URL
const apiURL = 'https://api.lyrics.ovh';

// event listener
form.addEventListener('submit', e=> {
    e.preventDefault();
    searchValue = search.value.trim()

    if(!searchValue){
        alert("There is nothing to search")
    }
    else{ 
        searchSong(searchValue)
    }
})

//search
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();
    showData(data)
}

function showData(data){
    
  
    result.innerHTML = `
    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div>
                    ${song.title}  <strong>Album by- ${song.artist.name}</strong>  
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                    </li>`
        )
        .join('')}
    </ul>
  `;
}

//lyric button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        getLyrics(artist, songTitle)
    }
})

// Getting lyric
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><br><br>
    <p>${lyrics}</p>`;  
  }