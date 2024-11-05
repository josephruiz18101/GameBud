// game-directory-script.js
const games = [
    { id: '1', name: 'Minecraft', image: 'path/to/minecraft.jpg', description: 'A sandbox game where you can build and explore worlds.' },
    { id: '2', name: 'Fortnite', image: 'path/to/fortnite.jpg', description: 'A battle royale game where you compete against others.' },
    // Add more games as needed
];

function displayGameDirectory() {
    const gameDirectory = document.getElementById('game-directory');
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.image}" alt="${game.name}">
            <p>${game.description}</p>
            <button onclick="location.href='game.html?id=${game.id}'">View Game</button>
        `;
        gameDirectory.appendChild(gameCard);
    });
}

// Call the function to display the games
displayGameDirectory();
