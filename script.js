// Variables globales
let selectedCourses = {};
let coursesData = [];

const timeSlots = [
    "08:00 - 09:20", "09:30 - 10:50", "11:00 - 12:20", 
    "12:30 - 13:50", "14:30 - 15:50", "16:00 - 17:20",
    "17:30 - 18:50", "19:00 - 20:20"
];
const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos desde el archivo JSON
    fetch('horarios.json')
        .then(response => response.json())
        .then(data => {
            coursesData = processCourseData(data);
            generateScheduleGrid();
            renderCourses();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

// Procesar los datos del JSON para agrupar por curso y NRC
function processCourseData(data) {
    const coursesMap = {};
    
    data.forEach(item => {
        // Crear una clave única para el curso (nombre)
        if (!coursesMap[item.nombre_curso]) {
            coursesMap[item.nombre_curso] = {
                id: item.nombre_curso.toLowerCase().replace(/\s+/g, '-'),
                name: item.nombre_curso,
                nrcOptions: []
            };
        }
        
        // Buscar si ya existe este NRC
        const nrcOption = coursesMap[item.nombre_curso].nrcOptions.find(opt => opt.nrc === item.nrc);
        
        if (nrcOption) {
            // Agregar esta sesión al NRC existente
            nrcOption.schedule.push({
                day: item.dia,
                start: item.hora_inicio,
                end: item.hora_fin,
                classroom: item.sala || 'A definir',
                professor: item.profesor
            });
        } else {
            // Crear nuevo NRC
            coursesMap[item.nombre_curso].nrcOptions.push({
                nrc: item.nrc,
                type: item.tipo,
                schedule: [{
                    day: item.dia,
                    start: item.hora_inicio,
                    end: item.hora_fin,
                    classroom: item.sala || 'A definir',
                    professor: item.profesor
                }]
            });
        }
    });
    
    return Object.values(coursesMap);
}

// Generar la cuadrícula del horario
function generateScheduleGrid() {
    const grid = document.getElementById('schedule-grid');
    grid.innerHTML = '';
    
    // Celda vacía en la esquina superior izquierda
    grid.appendChild(createElement('div', 'time-slot', ''));
    
    // Encabezados de días
    days.forEach(day => {
        grid.appendChild(createElement('div', 'day-header', day));
    });
    
    // Filas de horas
    timeSlots.forEach((slot, index) => {
        // Columna de hora
        grid.appendChild(createElement('div', 'time-slot', slot));
        
        // Celdas para cada día
        days.forEach(day => {
            const hourCell = createElement('div', 'hour-slot');
            hourCell.dataset.day = day;
            hourCell.dataset.timeIndex = index;
            grid.appendChild(hourCell);
        });
    });
}

// Renderizar cursos disponibles
function renderCourses() {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';
    
    coursesData.forEach(course => {
        const card = createElement('div', 'course-card');
        card.innerHTML = `
            <h3>${course.name}</h3>
            <div class="nrc-options"></div>
        `;
        
        const nrcContainer = card.querySelector('.nrc-options');
        course.nrcOptions.forEach(nrcOption => {
            const nrcEl = createElement('div', 'nrc-option', `NRC ${nrcOption.nrc} (${nrcOption.type})`);
            nrcEl.dataset.courseId = course.id;
            nrcEl.dataset.nrc = nrcOption.nrc;
            nrcEl.onclick = () => selectNrc(course.id, nrcOption.nrc);
            nrcContainer.appendChild(nrcEl);
        });
        
        container.appendChild(card);
    });
}

// Seleccionar un NRC específico
function selectNrc(courseId, nrc) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    const nrcOption = course.nrcOptions.find(opt => opt.nrc === nrc);
    if (!nrcOption) return;
    
    // Actualizar selección
    selectedCourses[courseId] = {
        name: course.name,
        nrc: nrc,
        type: nrcOption.type,
        schedule: [...nrcOption.schedule]
    };
    
    // Actualizar UI
    updateCourseSelectionUI();
    updateScheduleGrid();
    checkConflicts();
}

// Actualizar la UI de selección de cursos
function updateCourseSelectionUI() {
    const container = document.getElementById('selected-courses');
    container.innerHTML = '';
    
    // Actualizar tarjetas de cursos
    Object.keys(selectedCourses).forEach(courseId => {
        const course = selectedCourses[courseId];
        const courseEl = createElement('div', 'selected-course');
        
        courseEl.innerHTML = `
            <button class="remove-btn" data-course-id="${courseId}">×</button>
            <div>
                <strong>${course.name}</strong><br>
                NRC: ${course.nrc} (${course.type})<br>
                ${course.schedule.map(s => `${s.day}: ${s.start}-${s.end} (${s.classroom})`).join('<br>')}
            </div>
        `;
        
        container.appendChild(courseEl);
    });
    
    // Agregar eventos para eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = () => {
            delete selectedCourses[btn.dataset.courseId];
            updateCourseSelectionUI();
            updateScheduleGrid();
            checkConflicts();
        };
    });
}

// Actualizar la cuadrícula del horario con las clases seleccionadas
function updateScheduleGrid() {
    // Limpiar horario
    document.querySelectorAll('.hour-slot').forEach(slot => {
        slot.innerHTML = '';
    });
    
    // Agregar bloques de clase
    Object.values(selectedCourses).forEach(course => {
        course.schedule.forEach(session => {
            const day = session.day;
            const startTime = session.start;
            const endTime = session.end;
            
            // Encontrar el slot correcto
            const timeIndex = timeSlots.findIndex(slot => {
                const [slotStart] = slot.split(' - ');
                return slotStart === startTime;
            });
            
            if (timeIndex !== -1) {
                const slot = document.querySelector(`.hour-slot[data-day="${day}"][data-time-index="${timeIndex}"]`);
                if (slot) {
                    const classBlock = createElement('div', 'class-block');
                    classBlock.classList.add(getTypeClass(course.type));
                    classBlock.innerHTML = `
                        <strong>${course.name}</strong><br>
                        ${startTime}-${endTime}<br>
                        ${session.classroom}<br>
                        ${course.nrc} (${course.type})
                    `;
                    
                    slot.appendChild(classBlock);
                }
            }
        });
    });
}

// Verificar conflictos de horario
function checkConflicts() {
    const conflictWarning = document.getElementById('conflict-warning');
    conflictWarning.textContent = '';
    
    const timeMap = {};
    let hasConflict = false;
    
    // Recorrer todos los cursos seleccionados
    Object.values(selectedCourses).forEach(course => {
        course.schedule.forEach(session => {
            const key = `${session.day}-${session.start}-${session.end}`;
            
            if (!timeMap[key]) {
                timeMap[key] = [];
            }
            
            timeMap[key].push(course.name);
        });
    });
    
    // Verificar conflictos
    Object.keys(timeMap).forEach(key => {
        if (timeMap[key].length > 1) {
            hasConflict = true;
            conflictWarning.textContent += `Conflicto de horario: ${timeMap[key].join(' y ')} en ${key.replace('-', ' ')}\n`;
            
            // Resaltar bloques en conflicto
            const [day, start] = key.split('-');
            const timeIndex = timeSlots.findIndex(slot => slot.split(' - ')[0] === start);
            
            if (timeIndex !== -1) {
                const slot = document.querySelector(`.hour-slot[data-day="${day}"][data-time-index="${timeIndex}"]`);
                if (slot) {
                    slot.querySelectorAll('.class-block').forEach(block => {
                        block.classList.add('conflict');
                    });
                }
            }
        }
    });
    
    if (!hasConflict) {
        conflictWarning.textContent = 'No hay conflictos de horario';
        conflictWarning.style.color = 'green';
    } else {
        conflictWarning.style.color = 'red';
    }
}

// Función auxiliar para crear elementos
function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}

// Obtener clase CSS según el tipo de curso
function getTypeClass(type) {
    switch(type.toLowerCase()) {
        case 'teoría': return 'teoria';
        case 'laboratorio': return 'laboratorio';
        case 'taller': return 'taller';
        case 'simulación': return 'simulacion';
        default: return 'teoria';
    }
}