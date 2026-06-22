// ==========================================================================
// VALIDACIÓN Y ENVÍO DEL FORMULARIO (ESTRATEGIA APTO)
// ==========================================================================
const form = document.querySelector('.cyber-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página parpadee o se recargue
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Efecto visual de carga Clean & Profesional
        btn.innerHTML = 'ENVIANDO CONSULTA... <i class="fas fa-spinner fa-spin"></i>';
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
        
        // Enviar datos reales a la API de Formspree
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                // Éxito - Mensaje adaptado a la identidad de APTO
                alert('¡CONSULTA ENVIADA CON ÉXITO!\n\nRecibimos tus datos correctamente en el sistema de APTO Centro de Entrenamiento. Un asesor se va a comunicar con vos por WhatsApp a la brevedad para enviarte la grilla de tarifas vigentes y coordinar tu visita guiada.');
                form.reset(); // Limpia los campos del formulario
            } else {
                // Error del servidor
                alert('Hubo un problema temporal con el servidor de registros. Por favor, intentalo de nuevo en unos minutos o hacé tu consulta directamente por el botón flotante de WhatsApp.');
            }
        } catch (error) {
            // Error de conexión a internet
            alert('Error de red. Verificá tu conexión a internet e intentalo de nuevo.');
        } finally {
            // Reestablecer el botón a su estado original premium
            btn.innerHTML = originalText;
            btn.style.pointerEvents = 'auto';
            btn.style.opacity = '1';
        }
    });
}

// ==========================================================================
// CONTROL DEL MENÚ HAMBURGUESA EN MOBILE (MOBILE FIRST)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (navToggle && navMenu) {
        // Al tocar el botón hamburguesa, abre o cierra el menú deslizable
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-visible');
            
            // Cambia el ícono de las tres rayitas por una "X" cuando está abierto
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('nav-visible')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Si el usuario toca cualquier opción del menú, este se cierra solo para navegar limpio
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-visible');
                navToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
});