const submit = document.querySelector('#submit');

submit.addEventListener("click", (event) => {
  event.preventDefault();
  fetchData();
  document.querySelector("#username").value = "";
})

function fetchData(){
    const userName = document.querySelector("#username").value;
    let backendUrl = "https://github-profile-viewer-backend.onrender.com";
    console.log("Username:", userName);
    console.log("Backend URL:", backendUrl);

    fetch(backendUrl, {
      method: "POST", // Ensure this is a POST request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        displayData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        document.querySelector(
          "#result"
        ).innerHTML = `<p style="color: red; font-size:2em">Enter proper github username</p>`;
      });
}

function displayData(data){
  document.querySelector("#avatar").src = data.avatar;
  document.querySelector("#name").innerHTML = data.name;
  document.querySelector("#user").innerHTML = data.userName;
  document.querySelector("#followers").innerHTML = data.followers;
  document.querySelector("#following").innerHTML = data.following;
  document.querySelector("#repos").innerHTML = data.repos;
}
