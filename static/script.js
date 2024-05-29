const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const captionText = document.getElementById("captionText");
const timeTaken = document.getElementById("timeTaken");
const themeToggle = document.getElementById("themeToggle");
const generateCap = document.getElementById("generateCap");
const newVideo = document.getElementById("newVideo");
const videoContainer = document.querySelector(".video-container");
const dropBox = document.getElementById("dropBox");

// Toggle dark mode
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector("h2").classList.toggle("dark-mode-heading");
  document.querySelector(".Navbar").classList.toggle("dark-mode-nav");
  document.querySelector(".sidebar").classList.toggle("dark-mode-container");
  document.querySelector(".main-bar").classList.toggle("dark-mode-container");
  document.querySelector(".caption-container").classList.toggle("dark-mode-sb");
  document.querySelector(".time-taken").classList.toggle("dark-mode-sb");
  generateCap.classList.toggle("dark-mode-button");
  newVideo.classList.toggle("dark-mode-button");
  dropBox.classList.toggle("dark-mode-db");
});

// Handle video upload
videoInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    var formData = new FormData();
    formData.append("file", file);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        videoPlayer.src = objectURL;
        videoContainer.style.display = "block";
        captionText.textContent = "Caption will appear here.";
        // Play the video
        videoPlayer.play();
        dropBox.style.display = "none";
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle error
      });
  }
});

// Handle drag and drop for file upload
dropBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropBox.style.border = "2px dashed #666";
});

dropBox.addEventListener("dragleave", () => {
  dropBox.style.border = "2px dashed #ccc";
});

dropBox.addEventListener("drop", (e) => {
  e.preventDefault();
  dropBox.style.border = "2px dashed #ccc";
  const file = e.dataTransfer.files[0];
  if (file) {
    var formData = new FormData();
    formData.append("file", file);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        videoPlayer.src = objectURL;
        videoContainer.style.display = "block";
        captionText.textContent = "Caption will appear here.";
        // Play the video
        videoPlayer.play();
        dropBox.style.display = "none";
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle error
      });
  }
});

dropBox.addEventListener("click", () => {
  videoInput.click(); // Trigger the file input click event
});

generateCap.addEventListener("click", function () {
  captionText.textContent = "Extracting video features...";
  document.getElementById("loadingIndicator").style.display = "flex";

  setTimeout(() => {
    document.getElementById("loadingIndicator").style.display = "none";
  }, 5000);
  getCaptionFromServer();
});

function getCaptionFromServer() {
  fetch("/generateCap")
    .then((response) => {
      captionText.textContent = "Generating caption...";
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      captionText.textContent = data.caption.toUpperCase();
      timeTaken.textContent = data.time;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      captionText.textContent = "Failed to fetch caption";
    });
}

newVideo.addEventListener("click", function () {
  if (document.body.classList.value == "dark-mode") {
    location.reload();
    document.body.classList.toggle("dark-mode");
    document.querySelector("h2").classList.toggle("dark-mode-heading");
    document.querySelector(".Navbar").classList.toggle("dark-mode-nav");
    document.querySelector(".sidebar").classList.toggle("dark-mode-container");
    document.querySelector(".main-bar").classList.toggle("dark-mode-container");
    generateCap.classList.toggle("dark-mode-button");
    newVideo.classList.toggle("dark-mode-button");
    dropBox.classList.toggle("dark-mode-db");
  } else location.reload();
});
