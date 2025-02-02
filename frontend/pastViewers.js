// Fetch all users from the backend
async function fetchAllUsers() {
  try {
    const response = await fetch("https://github-profile-viewer-jbh7.onrender.com/user");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Display all users in the card format
function displayUsers(users) {
  const resultDiv = document.querySelector("#result");

  // Clear any existing content
  resultDiv.innerHTML = "";

  // Loop through each user and create a card
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}" class="avatar">
            <div class="details">
                <h2>${user.name}</h2>
            </div>
            <div class="details">
                <h3>Username: ${user.userName}</h3>
            </div>
            <div class="details">
                <h3>Followers: ${user.followers}</h3>
            </div>
            <div class="details">
                <h3>Following: ${user.following}</h3>
            </div>
            <div class="details">
                <h3>Repositories: ${user.repos}</h3>
            </div>
        `;

    resultDiv.appendChild(card);
  });
}

// Fetch and display users when the page loads
window.onload = fetchAllUsers;
