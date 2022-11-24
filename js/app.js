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