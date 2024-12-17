document.getElementById('generateBtn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value.trim();
  const style = document.getElementById('style').value;
  const number = parseInt(document.getElementById('number').value, 10);

  // Validering av inmatning
  if (!prompt) {
    alert('Vänligen fyll i en beskrivning av designen.');
    return;
  }
  if (isNaN(number) || number < 1 || number > 5) {
    alert('Antalet bilder måste vara mellan 1 och 5.');
    return;
  }

  const apiKey = 'TZ9sqYYcmuIdRKbm9A0lZs3O61LBe0DWEwalqoyVy4OB1dnaMwY2COZNvAXRzXKW';

  try {
    // Visa laddningsmeddelande
    const output = document.getElementById('output');
    output.innerHTML = '<p>Genererar bilder, vänligen vänta...</p>';

    // Skicka API-anrop
    const response = await fetch('https://api.recraft.ai/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, style, number }),
    });

    // Hantera API-svar
    if (!response.ok) {
      throw new Error(`API-anrop misslyckades: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.images && result.images.length > 0) {
      output.innerHTML = result.images
        .map(img => `<img src="${img.url}" alt="Genererad Bild" style="max-width: 100%; margin: 10px 0;">`)
        .join('');
    } else {
      output.innerHTML = '<p>Inga bilder kunde genereras. Försök med en annan beskrivning.</p>';
    }
  } catch (error) {
    console.error('Fel vid generering av bilder:', error);
    alert('Ett fel uppstod vid generering. Kontrollera din anslutning eller API-nyckel och försök igen.');
  }
});
