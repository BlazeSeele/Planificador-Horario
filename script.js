// Variables globales
let selectedCourses = {};
let coursesData = [];

const timeSlots = [
    "08:00 - 09:20", "09:30 - 10:50", "11:00 - 12:20", 
    "12:30 - 13:50", "14:30 - 15:50", "16:00 - 17:20",
    "17:30 - 18:50", "19:00 - 20:20"
];
const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];

// Función para procesar datos de cursos
function processCourseData(data) {
    const coursesMap = {};
    
    data.forEach(item => {
        const courseName = item.nombre_curso.trim();
        const type = item.tipo.trim();
        
        // Crear una clave única para el curso (nombre + tipo)
        const courseKey = `${courseName}||${type}`;
        
        if (!coursesMap[courseKey]) {
            coursesMap[courseKey] = {
                id: courseKey.toLowerCase().replace(/\s+/g, '-'),
                name: courseName,
                type: type,
                nrcOptions: []
            };
        }
        
        // Buscar si ya existe este NRC
        const nrcOption = coursesMap[courseKey].nrcOptions.find(opt => opt.nrc === item.nrc);
        
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
            coursesMap[courseKey].nrcOptions.push({
                nrc: item.nrc,
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
const horariosData = [
    
    {
        "nrc": 18597,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Victoria Miranda",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 3516,
        "nombre_curso": "Bioestadística",
        "dia": "JUEVES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Gonzalo Curihuentro",
        "tipo": "Teoría"
    },
    {
        "nrc": 3519,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Victoria Miranda",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 3517,
        "nombre_curso": "Bioestadística",
        "dia": "LUNES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Victoria Miranda",
        "tipo": "Teoría"
    },
    {
        "nrc": 3518,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Javier Olivares",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 3522,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Victoria Miranda",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 16092,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Javier Olivas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 3521,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Juan Curihuentro",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 3516,
        "nombre_curso": "Bioestadística",
        "dia": "LUNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Juan Curihuentro",
        "tipo": "Teoría"
    },
    {
        "nrc": 3517,
        "nombre_curso": "Bioestadística",
        "dia": "LUNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Victoria Miranda",
        "tipo": "Teoría"
    },
    {
        "nrc": 6270,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Javier Olivas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 3520,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Juan Curihuentro",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 16139,
        "nombre_curso": "Bioestadística",
        "dia": "LUNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Javier Olivas",
        "tipo": "Teoría"
    },
    {
        "nrc": 16096,
        "nombre_curso": "Bioestadística",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Victorina Miranda",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 16139,
        "nombre_curso": "Bioestadística",
        "dia": "LUNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Javier Olivas",
        "tipo": "Teoría"
    },
    {
        "nrc": 3509,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Esteban Flores",
        "tipo": "Teoría"
    },
    {
        "nrc": 3512,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Esteban Flores",
        "tipo": "Taller"
    },
    {
        "nrc": 3509,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Esteban Flores",
        "tipo": "Teoría"
    },
    {
        "nrc": 3508,
        "nombre_curso": "Calculo diferencial",
        "dia": "VIERNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "María Moran",
        "tipo": "Teoría"
    },
    {
        "nrc": 3510,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Victoria Miranda",
        "tipo": "Teoría"
    },
    {
        "nrc": 3515,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Esteban Flores",
        "tipo": "Taller"
    },
    {
        "nrc": 3513,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "María Moran",
        "tipo": "Taller"
    },
    {
        "nrc": 3514,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Esteban Flores",
        "tipo": "Taller"
    },
    {
        "nrc": 3510,
        "nombre_curso": "Calculo diferencial",
        "dia": "MARTES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Victoria Miranda",
        "tipo": "Teoría"
    },
    {
        "nrc": 3511,
        "nombre_curso": "Calculo diferencial",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "María Moran",
        "tipo": "Taller"
    },
    {
        "nrc": 3508,
        "nombre_curso": "Calculo diferencial",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "María Moran",
        "tipo": "Teoría"
    },
    {
        "nrc": 6255,
        "nombre_curso": "Calculo diferencial",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Victoria Miranda",
        "tipo": "Taller"
    },
    {
        "nrc": 8003,
        "nombre_curso": "ÉTICA",
        "dia": "VIERNES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Rodrigo Illarraga",
        "tipo": "Teoría"
    },
    {
        "nrc": 8003,
        "nombre_curso": "ÉTICA",
        "dia": "MIÉRCOLES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Rodrigo Illarraga",
        "tipo": "Teoría"
    },
    {
        "nrc": 8005,
        "nombre_curso": "ÉTICA",
        "dia": "VIERNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Pablo Follegati",
        "tipo": "Teoría"
    },
    {
        "nrc": 8004,
        "nombre_curso": "ÉTICA",
        "dia": "VIERNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Miguel Cid",
        "tipo": "Teoría"
    },
    {
        "nrc": 8004,
        "nombre_curso": "ÉTICA",
        "dia": "VIERNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Miguel Cid",
        "tipo": "Teoría"
    },
    {
        "nrc": 8005,
        "nombre_curso": "ÉTICA",
        "dia": "VIERNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Pablo Follegati",
        "tipo": "Teoría"
    },
    {
        "nrc": 3524,
        "nombre_curso": "Física",
        "dia": "LUNES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Javier Silva",
        "tipo": "Teoría"
    },
    {
        "nrc": 3523,
        "nombre_curso": "Física",
        "dia": "MARTES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Marcelo Galvez",
        "tipo": "Teoría"
    },
    {
        "nrc": 3524,
        "nombre_curso": "Física",
        "dia": "VIERNES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Javier Silva",
        "tipo": "Teoría"
    },
    {
        "nrc": 3528,
        "nombre_curso": "Física",
        "dia": "MARTES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Marcelo Galvez",
        "tipo": "Taller"
    },
    {
        "nrc": 3529,
        "nombre_curso": "Física",
        "dia": "JUEVES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Javier Silva",
        "tipo": "Taller"
    },
    {
        "nrc": 3527,
        "nombre_curso": "Física",
        "dia": "MARTES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Javier Silva",
        "tipo": "Taller"
    },
    {
        "nrc": 3525,
        "nombre_curso": "Física",
        "dia": "VIERNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Marcelo Galvez",
        "tipo": "Teoría"
    },
    {
        "nrc": 3526,
        "nombre_curso": "Física",
        "dia": "MARTES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Marcelo Galvez",
        "tipo": "Taller"
    },
    {
        "nrc": 3525,
        "nombre_curso": "Física",
        "dia": "LUNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Marcelo Galvez",
        "tipo": "Teoría"
    },
    {
        "nrc": 3530,
        "nombre_curso": "Física",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Marcelo Galvez",
        "tipo": "Taller"
    },
    {
        "nrc": 3523,
        "nombre_curso": "Física",
        "dia": "LUNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Marcelo Galvez",
        "tipo": "Teoría"
    },
    {
        "nrc": 4173,
        "nombre_curso": "Física",
        "dia": "MARTES",
        "hora_inicio": "17:30:00",
        "hora_fin": "18:50:00",
        "profesor": "Javier Silva",
        "tipo": "Taller"
    },
    {
        "nrc": 7994,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8638,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "VIERNES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15630,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 7995,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8639,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15631,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "VIERNES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8604,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "MARTES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8640,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15632,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "VIERNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8975,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Fabian Capdeville",
        "tipo": "Taller"
    },
    {
        "nrc": 8631,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8978,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "VIERNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Daniel Rojas",
        "tipo": "Taller"
    },
    {
        "nrc": 8641,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15676,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Juan Andrades",
        "tipo": "Taller"
    },
    {
        "nrc": 15633,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "VIERNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8976,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Fabian Capdeville",
        "tipo": "Taller"
    },
    {
        "nrc": 8634,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15635,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Marcela Pezanni",
        "tipo": "Taller"
    },
    {
        "nrc": 8642,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15674,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8977,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Fabian Capdeville",
        "tipo": "Taller"
    },
    {
        "nrc": 8635,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15627,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8636,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "17:30:00",
        "hora_fin": "18:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15628,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "JUEVES",
        "hora_inicio": "17:30:00",
        "hora_fin": "18:50:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 8637,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "LUNES",
        "hora_inicio": "19:00:00",
        "hora_fin": "20:20:00",
        "profesor": "A definir",
        "tipo": "Simulación"
    },
    {
        "nrc": 15629,
        "nombre_curso": "FUNDAMENTOS DEL QUEHACER FARMACÉUTICO",
        "dia": "MARTES",
        "hora_inicio": "19:00:00",
        "hora_fin": "20:20:00",
        "profesor": "A definir",
        "tipo": "Simulación "
    },
    {
        "nrc": 6971,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Christian Onfray",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6951,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Silvana Salinas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6948,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Raúl Moscoso",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 18571,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MIÉRCOLES",
        "hora_inicio": "8:00:00",
        "hora_fin": "9:20:00",
        "profesor": "Silvana Salinas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6971,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Christian Onfray",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6938,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "VIERNES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Paulina Godoy",
        "tipo": "Teoría"
    },
    {
        "nrc": 6951,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Silvana Salinas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6948,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Raúl Moscoso",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 18571,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MIÉRCOLES",
        "hora_inicio": "9:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Silvana Salinas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 17784,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "LUNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Silvana Salinas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6949,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 17784,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Silvana Salinas",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 17776,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Silvana Salinas",
        "tipo": "Teoría"
    },
    {
        "nrc": 6949,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6941,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Patricia Perez",
        "tipo": "Taller"
    },
    {
        "nrc": 6937,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Juan Carlos Santos",
        "tipo": "Teoría"
    },
    {
        "nrc": 6950,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Betzabé Acevedo",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 6937,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "LUNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Juan Carlos Santos",
        "tipo": "Teoría"
    },
    {
        "nrc": 6938,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Paulina Godoy",
        "tipo": "Teoría"
    },
    {
        "nrc": 17776,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Silvana Salinas",
        "tipo": "Teoría"
    },
    {
        "nrc": 6942,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Eduardo Chamorro",
        "tipo": "Taller"
    },
    {
        "nrc": 6943,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Patricia Perez",
        "tipo": "Taller"
    },
    {
        "nrc": 6944,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Valeria Gazzano",
        "tipo": "Taller"
    },
    {
        "nrc": 6950,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "MARTES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Betzabé Acevedo",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 17780,
        "nombre_curso": "QUÍMICA GENERAL II",
        "dia": "LUNES",
        "hora_inicio": "17:30:00",
        "hora_fin": "18:50:00",
        "profesor": "Patricia Perez",
        "tipo": "Taller"
    }
];
// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Procesar datos
        coursesData = processCourseData(horariosData);
        
        // Generar interfaz
        generateScheduleGrid();
        renderCourses();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('courses-container').innerHTML = `
            <div class="error">
                <strong>Error al procesar los datos:</strong><br>
                ${error.message}
            </div>
        `;
    }
});

// Generar la cuadrícula del horario
function generateScheduleGrid() {
    const grid = document.getElementById('schedule-grid');
    grid.innerHTML = '';
    
    // Celda vacía en la esquina superior izquierda
    grid.appendChild(createElement('div', 'time-slot', ''));
    
    // Encabezados de días
    days.forEach(day => {
        const dayHeader = createElement('div', 'day-header');
        dayHeader.textContent = day;
        grid.appendChild(dayHeader);
    });
    
    // Filas de horas
    timeSlots.forEach((slot, index) => {
        // Columna de hora
        const timeSlot = createElement('div', 'time-slot');
        timeSlot.textContent = slot;
        grid.appendChild(timeSlot);
        
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
    
    if (coursesData.length === 0) {
        container.innerHTML = '<div class="error">No se encontraron cursos disponibles</div>';
        return;
    }
    
    coursesData.forEach(course => {
        const card = createElement('div', 'course-card');
        card.innerHTML = `
            <h3>${course.name} <span class="course-type">(${course.type})</span></h3>
            <div class="nrc-options"></div>
        `;
        
        const nrcContainer = card.querySelector('.nrc-options');
        
        if (course.nrcOptions.length === 0) {
            nrcContainer.innerHTML = '<div>No hay secciones disponibles</div>';
        } else {
            course.nrcOptions.forEach(nrcOption => {
                const nrcEl = createElement('div', 'nrc-option');
                nrcEl.innerHTML = `
                    <input type="checkbox" id="${course.id}-${nrcOption.nrc}">
                    <label for="${course.id}-${nrcOption.nrc}">NRC ${nrcOption.nrc}</label>
                `;
                
                const checkbox = nrcEl.querySelector('input');
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        selectNrc(course, nrcOption);
                    } else {
                        deselectNrc(course.id, nrcOption.nrc);
                    }
                });
                
                nrcContainer.appendChild(nrcEl);
            });
        }
        
        container.appendChild(card);
    });
}

// Seleccionar un NRC específico
function selectNrc(course, nrcOption) {
    const selectionKey = `${course.id}-${nrcOption.nrc}`;
    
    // Solo agregar si no está ya seleccionado
    if (!selectedCourses[selectionKey]) {
        selectedCourses[selectionKey] = {
            courseId: course.id,
            name: course.name,
            type: course.type,
            nrc: nrcOption.nrc,
            schedule: [...nrcOption.schedule]
        };
        
        // Actualizar UI
        updateCourseSelectionUI();
        updateScheduleGrid();
        checkConflicts();
        
        // Marcar como seleccionado
        const option = document.querySelector(`.nrc-option input[id="${course.id}-${nrcOption.nrc}"]`);
        if (option) {
            option.parentElement.classList.add('selected');
        }
    }
}

// Deseleccionar un NRC
function deselectNrc(courseId, nrc) {
    const selectionKey = `${courseId}-${nrc}`;
    
    if (selectedCourses[selectionKey]) {
        delete selectedCourses[selectionKey];
        
        // Actualizar UI
        updateCourseSelectionUI();
        updateScheduleGrid();
        checkConflicts();
        
        // Desmarcar selección
        const option = document.querySelector(`.nrc-option input[id="${courseId}-${nrc}"]`);
        if (option) {
            option.parentElement.classList.remove('selected');
        }
    }
}

// Actualizar la UI de selección de cursos
function updateCourseSelectionUI() {
    const container = document.getElementById('selected-courses');
    container.innerHTML = '';
    
    // Agrupar por curso
    const groupedCourses = {};
    Object.values(selectedCourses).forEach(course => {
        if (!groupedCourses[course.name]) {
            groupedCourses[course.name] = [];
        }
        groupedCourses[course.name].push(course);
    });
    
    // Mostrar cursos agrupados
    Object.keys(groupedCourses).forEach(courseName => {
        const group = groupedCourses[courseName];
        const groupEl = createElement('div', 'course-group');
        groupEl.innerHTML = `<h3>${courseName}</h3>`;
        
        group.forEach(course => {
            const courseEl = createElement('div', 'selected-course');
            courseEl.innerHTML = `
                <button class="remove-btn" data-course-id="${course.courseId}" data-nrc="${course.nrc}">×</button>
                <div class="course-info">
                    <strong>NRC: ${course.nrc} (${course.type})</strong><br>
                    ${course.schedule.map(s => `${s.day}: ${s.start}-${s.end} (${s.classroom})`).join('<br>')}
                </div>
            `;
            groupEl.appendChild(courseEl);
        });
        
        container.appendChild(groupEl);
    });
    
    // Agregar eventos para eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const courseId = btn.dataset.courseId;
            const nrc = btn.dataset.nrc;
            deselectNrc(courseId, nrc);
        });
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
                    
                    // Crear contenido para el bloque
                    const content = createElement('div', 'block-content');
                    content.innerHTML = `
                        <div class="course-name">${course.name}</div>
                        <div class="details">${startTime}-${endTime}</div>
                        <div class="details">${course.nrc} (${course.type})</div>
                        <div class="details">${session.classroom}</div>
                    `;
                    
                    classBlock.appendChild(content);
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
    conflictWarning.classList.remove('active');
    
    const timeMap = {};
    let conflicts = [];
    
    // Recorrer todos los cursos seleccionados
    Object.values(selectedCourses).forEach(course => {
        course.schedule.forEach(session => {
            const key = `${session.day}-${session.start}-${session.end}`;
            
            if (!timeMap[key]) {
                timeMap[key] = [];
            }
            
            timeMap[key].push(`${course.name} (${course.nrc})`);
        });
    });
    
    // Verificar conflictos
    Object.keys(timeMap).forEach(key => {
        if (timeMap[key].length > 1) {
            const [day, start] = key.split('-');
            conflicts.push({
                day: day,
                time: start,
                courses: timeMap[key]
            });
            
            // Resaltar bloques en conflicto
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
    
    if (conflicts.length > 0) {
        conflictWarning.classList.add('active');
        conflictWarning.innerHTML = '<strong>Conflictos de horario detectados:</strong><br>';
        
        conflicts.forEach(conflict => {
            conflictWarning.innerHTML += `- ${conflict.day} ${conflict.time}: ${conflict.courses.join(' / ')}<br>`;
        });
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
    const typeLower = type.toLowerCase();
    if (typeLower.includes('teoría') || typeLower.includes('teo')) return 'teoria';
    if (typeLower.includes('laboratorio') || typeLower.includes('lab')) return 'laboratorio';
    if (typeLower.includes('taller') || typeLower.includes('tal')) return 'taller';
    if (typeLower.includes('simulación') || typeLower.includes('sim')) return 'simulacion';
    return 'teoria';
}
