document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const asuntoInput = document.getElementById('asunto');
    const mensajeTextarea = document.getElementById('mensaje');

    const nombreError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const asuntoError = document.getElementById('asunto-error');
    const mensajeError = document.getElementById('mensaje-error');

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        const inputElement = element.previousElementSibling;
        if (inputElement) {
            inputElement.classList.add('invalid');
        }
    }

    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
        const inputElement = element.previousElementSibling;
        if (inputElement) {
            inputElement.classList.remove('invalid');
        }
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateForm() {
        let isValid = true;

        if (nombreInput.value.trim() === '') {
            showError(nombreError, 'El nombre es obligatorio.');
            isValid = false;
        } else {
            hideError(nombreError);
        }

        if (emailInput.value.trim() === '') {
            showError(emailError, 'El email es obligatorio.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Por favor, introduce un email válido.');
            isValid = false;
        } else {
            hideError(emailError);
        }

        if (asuntoInput.value.trim() === '') {
            showError(asuntoError, 'El asunto es obligatorio.');
            isValid = false;
        } else {
            hideError(asuntoError);
        }

        if (mensajeTextarea.value.trim() === '') {
            showError(mensajeError, 'El mensaje es obligatorio.');
            isValid = false;
        } else {
            hideError(mensajeError);
        }

        return isValid;
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        if (validateForm()) {
            alert('¡Formulario enviado con éxito!');
            contactForm.reset();
        } else {
            alert('Por favor, corrige los errores en el formulario.');
        }
    });

    nombreInput.addEventListener('input', () => {
        if (nombreInput.value.trim() !== '') { hideError(nombreError); }
    });
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) { hideError(emailError); }
    });
    asuntoInput.addEventListener('input', () => {
        if (asuntoInput.value.trim() !== '') { hideError(asuntoError); }
    });
    mensajeTextarea.addEventListener('input', () => {
        if (mensajeTextarea.value.trim() !== '') { hideError(mensajeError); }
    });
});