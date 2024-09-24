document.getElementById('pokemonForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Evita que el formulario se recargue
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const resultDiv = document.getElementById('pokemonResult');

    // Limpia el resultado anterior
    resultDiv.innerHTML = '';

    if (pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                const pokemonHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p><strong>Altura:</strong> ${data.height / 10} m</p>
                    <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                    <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
                `;
                resultDiv.innerHTML = pokemonHTML;
            })
            .catch(error => {
                resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
            });
    } else {
        resultDiv.innerHTML = '<p style="color:red;">Por favor, ingresa un nombre de Pokémon.</p>';
    }
});
