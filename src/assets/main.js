const API = 'https://spotify23.p.rapidapi.com/playlist_tracks/?id=4rlWp7px5qg4X8KPJV0Iaj&offset=0&limit=100';
const content = null || document.querySelector('#musicContent');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2c77aa7073msh0c5e4553810d56cp1a0f4bjsn1cd896dd0ab5',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

function pauseAudio() {
    let audioTags = document.getElementsByClassName("track-controls");

    for (let i=0; i < audioTags.length; i++) {
        audioTags[i].pause();
    }
}

(async () => {
    try {
        const songs = await fetchData(API);
        let view = `${songs.items.map(song => `
            <li class="item containerAudio">
                <div>
                    <div class="track-img">
                        <img src="${song.track.album.images[0].url}" alt="${song.track.album.name}">
                    </div>
                    <span class="track-name">${song.track.name}</span>
                    <audio controls class="track-controls" src="${song.track.preview_url}"></audio>
                </div>
            </li>
        `).slice(0,9).join('')}
        `;
        content.innerHTML = view;

        $(document).ready(function() {
            $(".containerAudio").on("click", function(){
                pauseAudio();
                audioElement = $(this).find('.track-controls');
                audioElement[0].play();
            });
        });

    } catch (error) {
        let errorMessage = `
            <li>
                <span>Por el momento no es posible desplegar la lista de canciones</span>
            </li>
        `;
        content.innerHTML = errorMessage;
    }
})();