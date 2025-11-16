console.log("JavaScript file loaded!");

document.getElementById("message").innerText = "JavaScript is running correctly.";

document.getElementById("btn").addEventListener("click", function () {
    document.getElementById("output").innerText = "Button clicked — JS working!";
});
