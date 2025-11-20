console.log("JavaScript file loaded!");

// Initial text
document.getElementById("message").innerText = "JavaScript is running correctly.";

// Update the SAME text on button click
document.getElementById("btn").addEventListener("click", function () {
    document.getElementById("message").innerText = "You clicked the button! The message has changed!";
});
