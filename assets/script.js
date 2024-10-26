const profileForm = document.getElementById('profile-form');
const profileList = document.getElementById('profile-list');
let editingProfileId = null; // To keep track of the profile being edited

// Load profiles on page load
loadProfiles();

async function loadProfiles() {
    try {
        const response = await fetch('http://localhost:5000/api/profiles');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const profiles = await response.json();
        profiles.forEach(profile => addProfileToDOM(profile));
    } catch (error) {
        console.error('Error loading profiles:', error);
        alert("Failed to load profiles.");
    }
}

function addProfileToDOM(profile) {
    const profileElement = document.createElement('div');
    profileElement.classList.add('profile');
    profileElement.innerHTML = `
        <h3>${profile.gamerTag} (${profile.platform})</h3>
        <p>Games: ${profile.games.join(', ')}</p>
        <button onclick="editProfile('${profile._id}', '${profile.gamerTag}', '${profile.platform}', '${profile.games.join(', ')}')">Edit</button>
        <button onclick="deleteProfile('${profile._id}')">Delete</button>
    `;
    profileList.appendChild(profileElement);
}

profileForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const gamerTag = document.getElementById('gamer-tag').value;
    const platform = document.getElementById('platform').value;
    const games = document.getElementById('games').value.split(',').map(game => game.trim());

    const newProfile = { gamerTag, platform, games };

    try {
        if (editingProfileId) {
            // Update existing profile
            const response = await fetch(`http://localhost:5000/api/profiles/${editingProfileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            alert('Profile updated successfully!');
        } else {
            // Create new profile
            const response = await fetch('http://localhost:5000/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to create profile');
            }
            alert('Profile created successfully!');
        }

        // Reload profiles
        profileList.innerHTML = '';
        loadProfiles();
        profileForm.reset(); // Clear the form
        editingProfileId = null; // Reset editing ID
    } catch (error) {
        console.error('Error saving profile:', error);
        alert("Failed to save profile.");
    }
});

// Set up the edit form with existing data
function editProfile(id, gamerTag, platform, games) {
    editingProfileId = id; // Set the ID of the profile being edited
    document.getElementById('gamer-tag').value = gamerTag;
    document.getElementById('platform').value = platform;
    document.getElementById('games').value = games;
}

async function deleteProfile(id) {
    const confirmDelete = confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:5000/api/profiles/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete profile');
        }

        // Reload profiles
        profileList.innerHTML = '';
        loadProfiles();
    } catch (error) {
        console.error('Error deleting profile:', error);
        alert("Failed to delete profile.");
    }
}
