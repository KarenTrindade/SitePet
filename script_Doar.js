import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm';

// Inicialize o cliente Supabase
const supabaseUrl = 'https://bdoqwnspxmqyhhwimotk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkb3F3bnNweG1xeWhod2ltb3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwMjkyNDcsImV4cCI6MjAzOTYwNTI0N30.dofciQlQsEp5xnBzVxWh0w6HV5grJK-ao4T0u8MlA3s';
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log('Formulário enviado'); // Log para verificar se o envio do formulário está funcionando

    const nomePet = document.getElementById('NomePet').value;
    const sobrePet = document.getElementById('sobrePet').value;
    const imageFile = document.getElementById('PetImage').files[0];

    console.log('Nome do Pet:', nomePet); // Verificar se o nome está sendo capturado
    console.log('Sobre o Pet:', sobrePet); // Verificar se a descrição está sendo capturada

    if (imageFile) {
        console.log('Arquivo de imagem selecionado:', imageFile.name); // Verificar se a imagem está sendo capturada

        const { data: imageData, error: imageError } = await supabase.storage
            .from('pet-images')
            .upload(`public/${imageFile.name}`, imageFile);

        if (imageError) {
            console.error('Erro ao enviar a imagem:', imageError); // Log de erro ao enviar a imagem
            return;
        }

        const imageUrl = `${supabaseUrl}/storage/v1/object/public/pet-images/${imageFile.name}`;
        console.log('URL da imagem:', imageUrl); // Verificar se a URL da imagem foi gerada corretamente

        const { data, error } = await supabase
            .from('pets')
            .insert([{ name: nomePet, description: sobrePet, image_url: imageUrl }]);

        if (error) {
            console.error('Erro ao inserir dados:', error); // Log de erro ao inserir dados na tabela
        } else {
            console.log('Dados inseridos com sucesso:', data); // Log de sucesso
            alert('Pet doado com sucesso!');
            document.getElementById('formulario').reset();
        }
    } else {
        console.error('Nenhuma imagem foi selecionada'); // Log de erro se a imagem não foi selecionada
    }
});


// Código para pré-visualização da imagem
document.getElementById('PetImage').addEventListener('change', function(event) {
const file = event.target.files[0];
if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('previewImage').src = e.target.result;
    }

    reader.readAsDataURL(file);
}
});