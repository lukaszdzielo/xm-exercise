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

fetch(cryptoURL)
    .then(res => res.json())
    .then(res => {
        for (let i = 0; i <= cryptoID.length-1; i++) {
            const price = Number(res.data[cryptoID[i][1]].price_usd).toLocaleString('en');
            let percent = Number(res.data[cryptoID[i][1]].percent_change_24h).toLocaleString('en');
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
        }
    })
    .catch(error => {
        console.log('API failure. ' + error);
    });
//

//
const password = document.querySelector('#inputPassword');
function passwordCheck() {
    
    const validMinMax = document.querySelector('#validMinMax');
    if (password.value.length >= 8 && password.value.length <=15) { 
        validMinMax.classList.remove('text-danger');
        validMinMax.classList.add('text-success');
    } else {
        validMinMax.classList.remove('text-success');
        validMinMax.classList.add('text-danger');
    }

    const validNumber = document.querySelector('#validNumber');
    if (password.value.match(/[0-9]/)) {
        validNumber.classList.remove('text-danger');
        validNumber.classList.add('text-success');
    } else {
        validNumber.classList.remove('text-success');
        validNumber.classList.add('text-danger');
    }

    const validLower = document.querySelector('#validLower');
    if (password.value.match(/[a-z]/)) {
        validLower.classList.remove('text-danger');
        validLower.classList.add('text-success');
    } else {
        validLower.classList.remove('text-success');
        validLower.classList.add('text-danger');
    }

    const validUpper = document.querySelector('#validUpper');
    if (password.value.match(/[A-Z]/)) {
        validUpper.classList.remove('text-danger');
        validUpper.classList.add('text-success');
    } else {
        validUpper.classList.remove('text-success');
        validUpper.classList.add('text-danger');
    }

    const validSpecial = document.querySelector('#validSpecial');
    if (password.value.match(/[ #[\]()@$&*!?|,.^/\\+_\- ]/)) {
        validSpecial.classList.remove('text-danger');
        validSpecial.classList.add('text-success');
    } else {
        validSpecial.classList.remove('text-success');
        validSpecial.classList.add('text-danger');
    }

}

password.addEventListener('keyup', passwordCheck);

//