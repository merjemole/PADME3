// När användaren klickar på knappen för att generera en design
document.getElementById('generate-button').addEventListener('click', async function() {
    const description = document.getElementById('description').value; // Hämta användarens beskrivning
    const imageStyle = document.getElementById('image-style').value; // Hämta stilvalet

    // Kontrollera att beskrivning inte är tom
    if (!description) {
        alert("Please enter a design description.");
        return;
    }

    // Skicka förfrågan till din AI-backend för att generera designen
    const response = await fetch('https://your-ai-api-endpoint.com/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, imageStyle })
    });

    const data = await response.json();

    if (data.success) {
        // Visa den genererade designen
        document.getElementById('design-preview').src = data.imageUrl;
    } else {
        alert("Failed to generate design. Try again!");
    }
});
