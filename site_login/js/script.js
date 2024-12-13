function togglePassword(id, icon) {
  const passwordInput = document.getElementById(id);
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // мменяем цвет глаза иконки
  if (type === 'password') {
    icon.classList.remove('icon-active');
    icon.classList.add('icon-default');
  } else {
    icon.classList.remove('icon-default');
    icon.classList.add('icon-active');
  }

}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registration-form');
  const button = document.getElementById('form-button');


  function validateFirstName() {
    const firstName = document.getElementById('first-name');
    const error = document.getElementById('first-name-error');
    const namePattern = /^[а-яА-ЯёЁ\-\s]{2,50}$/; // для валидации имени по русским символам от 2 до 50 символов
    if (!namePattern.test(firstName.value.trim())) {
        firstName.classList.add('invalid');
        firstName.classList.remove('valid');
        error.textContent = "Имя должно содержать только русские буквы, дефисы или пробелы и быть от 2 до 50 символов.";
        return false;
    } else {
        firstName.classList.remove('invalid');
        firstName.classList.add('valid');
        error.textContent = "";
        return true;
    }
  }

  function validateLastName() {
    const lastName = document.getElementById('last-name');
    const error = document.getElementById('last-name-error');
    const lastNamePattern = /^[а-яА-ЯёЁ\-\s]{2,50}$/; // для валидации по русским символам от 2 до 50 символов
    if (!lastNamePattern.test(lastName.value.trim())) {
        lastName.classList.add('invalid');
        lastName.classList.remove('valid');
        error.textContent = "Фамилия должна содержать только русские буквы, дефисы или пробелы и быть от 2 до 50 символов.";
        return false;
    } else {
        lastName.classList.remove('invalid');
        lastName.classList.add('valid');
        error.textContent = "";
        return true;
    }
  }

  function validateEmail() {
      const email = document.getElementById('email');
      const error = document.getElementById('email-error');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
          email.classList.add('invalid');
          email.classList.remove('valid');
          error.textContent = "Введите корректный email.";
          return false;
      }
      else {
          email.classList.remove('invalid');
          email.classList.add('valid');
          error.textContent = "";
          return true;
      }
  }

  function validatePassword() {
    const password = document.getElementById('password');
    const error = document.getElementById('password-error');
    const passwordValue = password.value;
    //выражения для проверки условий
    const hasUpperCase = /[A-Z]/.test(passwordValue);
    const hasLowerCase = /[a-z]/.test(passwordValue);
    const hasDigit = /\d/.test(passwordValue);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
    if (passwordValue.length < 8) {
        password.classList.add('invalid');
        password.classList.remove('valid');
        error.textContent = "Пароль должен быть не менее 8 символов.";
        return false;
    }
    if (!hasUpperCase) {
        password.classList.add('invalid');
        password.classList.remove('valid');
        error.textContent = "Пароль должен содержать хотя бы одну заглавную букву.";
        return false;
    }
    if (!hasLowerCase) {
        password.classList.add('invalid');
        password.classList.remove('valid');
        error.textContent = "Пароль должен содержать хотя бы одну строчную букву.";
        return false;
    }
    if (!hasDigit) {
        password.classList.add('invalid');
        password.classList.remove('valid');
        error.textContent = "Пароль должен содержать хотя бы одну цифру.";
        return false;
    }
    if (!hasSpecialChar) {
        password.classList.add('invalid');
        password.classList.remove('valid');
        error.textContent = "Пароль должен содержать хотя бы один специальный символ.";
        return false;
    }
    password.classList.remove('invalid');
    password.classList.add('valid');
    error.textContent = "";
    return true;
  }

  function validatePasswordConfirm() {
      const password = document.getElementById('password');
      const passwordConfirm = document.getElementById('password-confirm');
      const error = document.getElementById('password-confirm-error');
      if (passwordConfirm.value !== password.value) {
          passwordConfirm.classList.add('invalid');
          passwordConfirm.classList.remove('valid');
          error.textContent = "Пароли не совпадают.";
          return false;
      }
      else {
          passwordConfirm.classList.remove('invalid');
          passwordConfirm.classList.add('valid');
          error.textContent = "";
          return true;
      }
  }

  function validateBirthDay() {
    const birthDay = document.getElementById('birth-day');
    const error = document.getElementById('birth-day-error');
    if (!birthDay.value) {
        birthDay.classList.add('invalid');
        birthDay.classList.remove('valid');
        error.textContent = "Укажите дату рождения.";
        return false;

    }
    const birthDate = new Date(birthDay.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    // достиг ли пользователь 18 лет
    if (age < 18 || (age === 18 && monthDifference < 0) || (age === 18 && monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        birthDay.classList.add('invalid');
        birthDay.classList.remove('valid');
        error.textContent = "Вы должны быть не моложе 18 лет.";
        return false;
    } else {
        birthDay.classList.remove('invalid');
        birthDay.classList.add('valid');
        error.textContent = "";
        return true;
    }
  }

  function validateForm() {
      return validateFirstName() && validateLastName() && validateEmail() && validatePassword() && validatePasswordConfirm() && validateBirthDay();
  }

  function toggleButtonState() {
      button.disabled = !validateForm();
  }

  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
      input.addEventListener('input', () => {
          switch (input.id) {
              case 'first-name':
                  validateFirstName();
                  break;
              case 'last-name':
                  validateLastName();
                  break;
              case 'email':
                  validateEmail();
                  break;
              case 'password':
                  validatePassword();
                  break;
              case 'password-confirm':
                  validatePasswordConfirm();
                  break;
              case 'birth-day':
                  validateBirthDay();
                  break;
          }
          toggleButtonState();
      });
  });

  form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateForm()) {
          const formData = {
              firstName: document.getElementById('first-name').value,
              lastName: document.getElementById('last-name').value,
              email: document.getElementById('email').value,
              password: document.getElementById('password').value,
              birthDay: document.getElementById('birth-day').value
          };
          console.log('Данные формы:', formData);
      }
  });
});
