const audio = new Audio();
const fileInput = document.getElementById('file-input');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const volumeSlider = document.getElementById('volume-slider');
const pitchSlider = document.getElementById('pitch-slider');
const frequencySlider = document.getElementById('frequency-slider');
const songTitle = document.getElementById('song-title');
const lyrics = document.getElementById('lyrics');
const shareBtn = document.getElementById('share-btn');

let currentSong = '';

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        currentSong = URL.createObjectURL(file);
        audio.src = currentSong;
        songTitle.innerText = file.name;
        // Display lyrics placeholder
        lyrics.innerText = "Lyrics will be displayed here...";
    }
});

playBtn.addEventListener('click', () => {
    if (currentSong) {
        audio.play();
    }
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100; // Adjust volume
});

pitchSlider.addEventListener('input', () => {
    const pitchValue = pitchSlider.value;
    // You can implement pitch shifting using libraries like PitchShift.js
    console.log(`Adjust pitch by ${pitchValue} semitones`); // Placeholder for pitch functionality
});

frequencySlider.addEventListener('input', () => {
    const frequencyValue = frequencySlider.value;
    // You can implement frequency adjustments using Web Audio API
    console.log(`Set frequency to ${frequencyValue} Hz`); // Placeholder for frequency functionality
});

shareBtn.addEventListener('click', async () => {
    if (currentSong) {
        try {
            const file = fileInput.files[0];

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'Listen to this song',
                    text: `Check out this song: ${file.name}`,
                    files: [file], // Share as a file
                });
                alert("Shared successfully!");
            } else {
                alert("Sharing not supported on this browser.");
            }
        } catch (error) {
            console.error("Error sharing file:", error);
            alert("An error occurred while sharing.");
        }
    } else {
        alert("Please select a song to share.");
    }
});

});
