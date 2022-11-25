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
            document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').classList.remove('up', 'down')
            if (percent > 0) {
                document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').classList.add('up')
                percent = '<i class="fa-solid fa-circle-chevron-up fa-xs me-1"></i> ' + percent;
            } else if (percent < 0) {
                document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').classList.add('down')
                percent = '<i class="fa-solid fa-circle-chevron-down fa-xs me-1"></i> ' + percent;
            } else {
                percent = '<i class="fa-solid fa-circle-minus fa-xs me-1"></i> ' + percent;
            }
            document.querySelector('#'+cryptoID[i][0]).querySelector('.percent').innerHTML = percent;
        }
    })