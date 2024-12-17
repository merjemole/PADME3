document.getElementById('generateBtn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  const style = document.getElementById('style').value;
  const number = document.getElementById('number').value;

  const apiKey = 'TZ9sqYYcmuIdRKbm9A0lZs3O61LBe0DWEwalqoyVy4OB1dnaMwY2COZNvAXRzXKW'; // Ersätt med din Recraft AI-nyckel

  try {
    // Skicka API-anrop
    const response = await fetch('https://api.recraft.ai/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, style, number }),
    });

    const result = await response.json();

    // Visa bilder i gränssnittet
    const output = document.getElementById('output');
    output.innerHTML = result.images
      .map(img => `<img src="${img.url}" alt="Genererad Bild">`)
      .join('');

  } catch (error) {
    console.error('Error generating images:', error);
    alert('Något gick fel. Försök igen.');
  }
});
