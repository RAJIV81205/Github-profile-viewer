const submit = document.querySelector('#submit');

submit.addEventListener("click", (event) => {
  event.preventDefault();
  fetchData();
  document.querySelector("#username").value = "";
})



async function fetchData() {
  const userName = document.querySelector("#username").value;
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const data = await response.json();
    if (response.ok) {
      displayData(data)
      await saveData(data)

    }

    return;


  } catch (error) {
    console.error(error)

  }
}

function displayData(data) {
  document.querySelector("#avatar").src = data.avatar_url;
  document.querySelector("#name").innerHTML = data.name;
  document.querySelector("#user").innerHTML = data.login;
  document.querySelector("#followers").innerHTML = data.followers;
  document.querySelector("#following").innerHTML = data.following;
  document.querySelector("#repos").innerHTML = data.public_repos;
}

async function saveData(data) {

  const userdata = {
    avatar: data.avatar_url,
    name: data.name,
    userName: data.login,
    followers: data.followers,
    following: data.following,
    repos: data.public_repos,

  }
  try {
    const response = await fetch("https://github-profile-viewer-jbh7.onrender.com/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userdata }) 
    });
    
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      alert(data.message)
    }

    return;
  } catch (error) {
    console.error(error)

  }

}
