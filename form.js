const TOKEN = '6197157348:AAEZa6TtaUPM8HMUsypIRcigltO5jtrnAi4';
const CHAT_ID = '-1001979411422';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);

    let message = `<b>Заявка з сайту\n</b>`;
    message += `<b>Name: </b> ${this.name.value}\n`;
    message += `<b>Phone: </b> ${this.phone.value}\n`;
    this.message.value === ''
      ? message
      : (message += `<b>Message: </b> ${this.message.value}\n`);

    if (error === 0) {
      form.classList.add('_sending');

      axios
        .post(URI_API, {
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'html',
          disable_notification: false,
        })
        .then((res) => {
          form.reset();
          form.classList.remove('_sending');
        })
        .catch((err) => {
          alert(`Похибка відправки даних форми!\n ${err.message}`);
          form.classList.remove('_sending');
        });
    } else {
      alert("Заповніть обов'язкові поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('_phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute('type') === 'checkbox' &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  // function for test phone
  function phoneTest(input) {
    return !/^((\+?3)?8)?0\d{9}$/.test(input.value);
  }
});
