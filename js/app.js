//
const swiper = new Swiper('.carousel-event_gallery', {
    // Optional parameters
    slidesPerView: 2,
    spaceBetween: 28,
    watchOverflow: true,
    loop: true,
  
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 4,
            spaceBetween: 36
        },
        // when window width is >= 640px
        1200: {
            slidesPerView: 5,
        }
    }
});
//

//
const crypto = document.querySelector('#crypto').children.length;
const cryptoURL = 'https://api.coinlore.net/api/tickers/';
const cryptoID = [ ['BTC', 0], ['ETH', 1], ['XRP', 6], ['LTC', 11], ['BCH',23] ];
const cryptoID2 = [ 'BTC', 'ETH', 'XRP', 'LTC', 'BCH' ];

fetch(cryptoURL)
    .then(res => res.json())
    .then(res => {
        // console.log(res.data);
        for (let i = 0; i <= cryptoID2.length-1; i++) {
            for (let j = 0; j <= res.data.length-1; j++) {
                // console.log(i, j, cryptoID2[i], '=', res.data[j].symbol)
                if (cryptoID2[i] === res.data[j].symbol) {
                    // console.log(res.data[j].price_usd)
                    const price = Number(res.data[j].price_usd).toLocaleString('en');
                    let percent = Number(res.data[j].percent_change_24h).toLocaleString('en');
                    document.querySelector('#'+cryptoID[i][0]).querySelector('.price').innerHTML = '$' + price;
                    document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').classList.remove('up', 'down');
                    if (percent > 0) {
                document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').classList.add('up');
                percent = '<i class="fa-solid fa-circle-chevron-up fa-xs me-1"></i> ' + percent;
            } else if (percent < 0) {
                document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').classList.add('down');
                percent = '<i class="fa-solid fa-circle-chevron-down fa-xs me-1"></i> ' + percent;
            } else {
                percent = '<i class="fa-solid fa-circle-minus fa-xs me-1"></i> ' + percent;
            }
            document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').innerHTML = percent;
                    break;
                }
            }
        }
    })
    .catch(error => {
        console.log('API failure. ' + error);
    });

//
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const button = document.querySelector('#formSubmit');

function emailValidation() {
    if (inputEmail.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        inputEmail.classList.remove('is-invalid');
        inputEmail.classList.add('is-valid');
    } else {
        inputEmail.classList.remove('is-valid');
        inputEmail.classList.add('is-invalid');
    }

    submitValidation()
}
function passwordValidation() {

    let validMinMax = document.querySelector('#validMinMax');
    if (inputPassword.value.length >= 8 && inputPassword.value.length <=15) { 
        validMinMax.classList.remove('invalid-feedback');
        validMinMax.classList.add('valid-feedback');
        validMinMax = 1;
    } else {
        validMinMax.classList.remove('valid-feedback');
        validMinMax.classList.add('invalid-feedback');
        validMinMax = 0;
    }

    let validNumber = document.querySelector('#validNumber');
    if (inputPassword.value.match(/[0-9]/)) {
        validNumber.classList.remove('invalid-feedback');
        validNumber.classList.add('valid-feedback');
        validNumber = 1;
    } else {
        validNumber.classList.remove('valid-feedback');
        validNumber.classList.add('invalid-feedback');
        validNumber = 0;
    }

    let validLower = document.querySelector('#validLower');
    if (inputPassword.value.match(/[a-z]/)) {
        validLower.classList.remove('invalid-feedback');
        validLower.classList.add('valid-feedback');
        validLower = 1;
    } else {
        validLower.classList.remove('valid-feedback');
        validLower.classList.add('invalid-feedback');
        validLower = 0;
    }

    let validUpper = document.querySelector('#validUpper');
    if (inputPassword.value.match(/[A-Z]/)) {
        validUpper.classList.remove('invalid-feedback');
        validUpper.classList.add('valid-feedback');
        validUpper = 1;
    } else {
        validUpper.classList.remove('valid-feedback');
        validUpper.classList.add('invalid-feedback');
        validUpper = 0;
    }

    let validSpecial = document.querySelector('#validSpecial');
    if (inputPassword.value.match(/[ #[\]()@$&*!?|,.^/\\+_\- ]/)) {
        validSpecial.classList.remove('invalid-feedback');
        validSpecial.classList.add('valid-feedback');
        validSpecial = 1;
    } else {
        validSpecial.classList.remove('valid-feedback');
        validSpecial.classList.add('invalid-feedback');
        validSpecial = 0;
    }

    if ( (validMinMax + validNumber + validLower + validUpper + validSpecial) == 5) {
        inputPassword.classList.remove('is-invalid');
        inputPassword.classList.add('is-valid');
    }else {
        inputPassword.classList.remove('is-valid');
        inputPassword.classList.add('is-invalid');
    }

    submitValidation()
}

function submitValidation() {
    // asAS./12
    if (inputEmail.classList.contains('is-valid') && inputPassword.classList.contains('is-valid')) {
        button.classList.remove('disabled');
    } else if (inputEmail.classList.contains('is-invalid') || inputPassword.classList.contains('is-invalid')) {
        button.classList.add('disabled');
    }
}

function formSubmit(e) {
    e.preventDefault();
    document.querySelector('#formInfo').classList.remove('m-0');
    document.querySelector('#formInfo').classList.add('mt-8');
    document.querySelector('#formInfo').innerHTML = `
        <div class="p-8 text-secondary border border-secondary" style="background: #F3FEF4;">
            <div class="d-flex align-items-center">
                <i class="fa-solid fa-circle-check fa-4x me-3"></i>
                <div class="fs-3">Registration Successful</div>
            </div>
            <div class="mt-6">
                <p>Thank you for registering for our event with XM. You will receive an email shortly with confirmation of your registration.</p>
            </div>
        </div>`;
}

inputEmail.addEventListener('keyup', emailValidation);
inputPassword.addEventListener('keyup', passwordValidation);
button.addEventListener('click', formSubmit);
//