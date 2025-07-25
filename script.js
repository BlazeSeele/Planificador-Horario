// Reemplaza el fetch original con este código mejorado
fetch('horarios.json')
    .then(response => {
        if (!response.ok) throw new Error('HTTP error ' + response.status);
        return response.text(); // Primero obtenemos como texto
    })
    .then(text => {
        // Intenta parsear como array directo
        try {
            const data = JSON.parse(text);
            if (Array.isArray(data)) {
                coursesData = processCourseData(data);
            } 
            // Si es un objeto con propiedad "horarios"
            else if (data.horarios && Array.isArray(data.horarios)) {
                coursesData = processCourseData(data.horarios);
            }
            // Si es un objeto con otra propiedad de array
            else {
                const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
                if (arrayKey) {
                    coursesData = processCourseData(data[arrayKey]);
                } else {
                    throw new Error('Formato JSON no reconocido');
                }
            }
            
            generateScheduleGrid();
            renderCourses();
        } catch (e) {
            throw new Error('Error parsing JSON: ' + e.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('courses-container').innerHTML = `
            <div class="error">
                <strong>Error al cargar los datos:</strong><br>
                ${error.message}<br>
                Verifica la estructura del archivo horarios.json
            </div>
        `;
    });
