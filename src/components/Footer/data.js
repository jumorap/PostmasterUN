function createData(id, titulo, subtitulo, url, items){
    return {
        id, titulo, subtitulo, url, items
    }
}

const data = [
    createData(1,"Bienestar de Sede", null, "http://bienestar.bogota.unal.edu.co/index.php", ["Agenda semanal", "Convocatorias (Selecciones deportivas, becas, apoyo alimentario, etc.)"]),
    createData(2,"Calendario Académico", null, "https://bogota.unal.edu.co/calendario-academico/", ["Fechas importantes"]),
    createData(3,"Circular Semanal Sede Bogotá", null, "https://bogota.unal.edu.co/circular-un-bogota/", ["Eventos semanales"]),
    createData(4,"SINSU | Salud Universitaria", null, "http://www.sinsu.unal.edu.co/MIHIMS/Account/Login.aspx", ["Citas médicas"]),
    createData(5,"SIBU | Bienestar de sede", null, "http://www.sibu.unal.edu.co/home.jsf", ["Aplicación a apoyos de bienestar de sede", "Participación en torneos de cultura y deporte", "Aplicación a corresponsabilidad"]),
    createData(6,"SINAB | Bibliotecas UNAL", null, "http://168.176.5.96/F/4LR39VNFBVNTPVBQXA4TUPVGR6V3AQKEE9GKB24RNKT6JK3H7H-38598?func=BOR-INFO", ["Búsqueda de libros", "Renovación de préstamos"]),
    createData(7,"Repositorio Institucional", null, "https://repositorio.unal.edu.co/", ["Acceso público a la base de datos de trabajos de grado, tesis y articulos de la universidad"]),
    createData(8,"Curso Gratis de Retorno Seguro al Campus", null, "https://educacioncontinuavirtual.unal.edu.co/login/index.php", ["Curso de bioseguridad"]),
    createData(9,"Software Gratuitos por Ser Estudiantes de la UNAL", null, "https://www.pasaralaunacional.com/2017/02/software-beneficios-gratis-convenios-unal.html", ["Beneficios en distintas plataformas por ser parte de la comunidad universitaria"]),
]

export{data};