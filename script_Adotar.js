import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm';

// Inicialização do Supabase
const supabaseUrl = 'https://bdoqwnspxmqyhhwimotk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkb3F3bnNweG1xeWhod2ltb3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwMjkyNDcsImV4cCI6MjAzOTYwNTI0N30.dofciQlQsEp5xnBzVxWh0w6HV5grJK-ao4T0u8MlA3s';
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para carregar e exibir os dados
async function loadPets() {
    const { data, error } = await supabase
        .from('pets')
        .select('*');

    if (error) {
        console.error('Erro ao carregar dados:', error);
        return;
    }

    const container = document.getElementById('petsContainer');
    container.innerHTML = data.map(pet => `
        <div class="pet-card">
            <img src="${pet.image_url}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <p>${pet.description}</p>
        </div>
    `).join('');
}

// Carregar os dados quando a página for carregada
document.addEventListener('DOMContentLoaded', loadPets);
