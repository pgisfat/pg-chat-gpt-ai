function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    var chatContainer = document.getElementById("chat-container");
    var userMessage = document.createElement("p");
    userMessage.innerText = "You: " + userInput;
    chatContainer.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: userInput
        })
    })
    .then(response => response.json())
    .then(data => {
        var chatResponse = document.createElement("p");
        chatResponse.innerText = "ChatGPT: " + data.response;
        chatContainer.appendChild(chatResponse);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch(error => console.error("Error:", error));
}
