// game-script.js
const games = [
    { id: '1', name: 'Minecraft', image: 'path/to/minecraft.jpg', description: 'A sandbox game where you can build and explore worlds.' },
    { id: '2', name: 'Fortnite', image: 'path/to/fortnite.jpg', description: 'A battle royale game where you compete against others.' },
    // Add more games as needed
];

function getGameDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const game = games.find(g => g.id === gameId);

    if (game) {
        document.getElementById('game-title').innerText = game.name;
        document.getElementById('game-image').src = game.image;
        document.getElementById('game-description').innerText = game.description;
    } else {
        document.body.innerHTML = '<h2>Game not found!</h2>';
    }
}

document.getElementById('post-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const postContent = document.getElementById('post-content').value;
    // Logic to save post to the backend goes here
    alert(`Post created: ${postContent}`);
});

// Call to display game details
getGameDetails();
