const submit = document.querySelector('#submit');

submit.addEventListener("click", () => {
  event.preventDefault();
    fetchData();
    document.querySelector("#username").value = "";
})

function fetchData(){
    const username = document.querySelector("#username").value;
    let gitUrl = `https://api.github.com/users/${username}`;
    console.log("Username:", username);
    console.log("GitHub URL:", gitUrl);

    fetch(gitUrl)
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        var user = data;
        displayData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
}

function displayData(data){
  document.querySelector("#avatar").src = data.avatar_url;
  document.querySelector("#name").innerHTML = data.name;
  document.querySelector("#user").innerHTML = data.login;
  document.querySelector("#followers").innerHTML = data.followers;
  document.querySelector("#following").innerHTML = data.following;
  document.querySelector("#repos").innerHTML = data.public_repos;
}

export { user };
