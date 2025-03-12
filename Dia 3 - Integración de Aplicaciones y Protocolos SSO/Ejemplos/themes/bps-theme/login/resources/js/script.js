// Función para mostrar/ocultar contraseña
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('toggle-password');
    
    if (togglePassword) {
      togglePassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          this.classList.add('show-password');
          this.setAttribute('aria-label', 'Ocultar contraseña');
        } else {
          passwordInput.type = 'password';
          this.classList.remove('show-password');
          this.setAttribute('aria-label', 'Mostrar contraseña');
        }
      });
    }
  });
  
  // Validación de formulario
  function validateForm() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let isValid = true;
    
    if (!username.value.trim()) {
      markInvalid(username, 'Por favor, ingrese su nombre de usuario');
      isValid = false;
    } else {
      markValid(username);
    }
    
    if (!password.value.trim()) {
      markInvalid(password, 'Por favor, ingrese su contraseña');
      isValid = false;
    } else {
      markValid(password);
    }
    
    return isValid;
  }
  
  // Funciones auxiliares para la validación
  function markInvalid(element, message) {
    element.classList.add('is-invalid');
    
    // Buscar o crear mensaje de error
    let errorMessage = element.parentNode.querySelector('.error-message');
    
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      element.parentNode.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
  }
  
  function markValid(element) {
    element.classList.remove('is-invalid');
    
    // Eliminar mensaje de error si existe
    const errorMessage = element.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
  
  // Animaciones y efectos visuales
  document.addEventListener('DOMContentLoaded', function() {
    // Añadir clase para animación de entrada
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
      setTimeout(function() {
        loginContainer.classList.add('fade-in');
      }, 100);
    }
    
    // Focus en el primer campo vacío
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (usernameInput && !usernameInput.value) {
      usernameInput.focus();
    } else if (passwordInput) {
      passwordInput.focus();
    }
    
    // Mejorar accesibilidad para los mensajes de error
    const alertMessages = document.querySelectorAll('.alert');
    alertMessages.forEach(function(alert) {
      if (alert.classList.contains('alert-error')) {
        const messageContent = alert.textContent;
        // Para lectores de pantalla
        const srOnly = document.createElement('span');
        srOnly.className = 'sr-only';
        srOnly.textContent = 'Error: ';
        alert.prepend(srOnly);
      }
    });
  });
  
  // Detectar inactividad y mostrar advertencia
  let inactivityTimeout;
  const inactivityWarningTime = 240000; // 4 minutos
  const inactivityLogoutTime = 300000; // 5 minutos
  
  function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(function() {
      showInactivityWarning();
    }, inactivityWarningTime);
  }
  
  function showInactivityWarning() {
    // Implementar si se requiere mostrar una advertencia antes del cierre de sesión
    console.log("Advertencia de inactividad mostrada");
    
    // Temporizador para cerrar sesión después de la advertencia
    setTimeout(function() {
      // Redirigir a página de timeout si existe
      if (window.location.href.indexOf('?') > -1) {
        window.location.href = window.location.href + '&session_timeout=true';
      } else {
        window.location.href = window.location.href + '?session_timeout=true';
      }
    }, inactivityLogoutTime - inactivityWarningTime);
  }
  
  // Reiniciar temporizador en eventos de usuario
  ['mousedown', 'keypress', 'scroll', 'touchstart'].forEach(function(event) {
    document.addEventListener(event, resetInactivityTimer);
  });
  
  // Iniciar temporizador cuando la página carga
  document.addEventListener('DOMContentLoaded', resetInactivityTimer);