const formEl = document.getElementById('modal-form');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  $(formEl).hide();
  $('#modal-success').show();
  formEl.reset();
  $('#modal-title').text('Заявка успешно отправлена!');
  setTimeout(() => {
        $.fancybox.close();
        setTimeout(() => {
          $('#modal-title').text('Оставьте заявку');
        $('#modal-form').show();
        $('#modal-success').hide();
        }, 1000)
    }, 2000);
})

const carCards = document.querySelectorAll(".car-card");

carCards.forEach((card) => {
  const swiperElement = card.querySelector(".swiper");
  const colorSwatches = card.querySelectorAll(".color-swatch");

  if (!swiperElement) return;

  const originalSlides = Array.from(swiperElement.querySelectorAll(".swiper-slide"));

  const cardSwiper = new Swiper(swiperElement, {
    simulateTouch: false,
    spaceBetween: 50,
    rewind: true,
    autoplay: {
      delay: 5000,
    },
    speed: 800,
  });

  function updateActiveSwatch() {
    const currentSlide = originalSlides[cardSwiper.realIndex];

    if (!currentSlide) return;

    const currentImageSrc = new URL(
      currentSlide.getAttribute("href"),
      window.location.href
    ).href;

    colorSwatches.forEach((swatch) => {
      const swatchImageSrc = new URL(
        swatch.dataset.image,
        window.location.href
      ).href;

      if (swatchImageSrc === currentImageSrc) {
        swatch.classList.add("is-active");
      } else {
        swatch.classList.remove("is-active");
      }
    });
  }

  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const newImage = swatch.dataset.image;

      if (!newImage) return;

      const targetImageUrl = new URL(newImage, window.location.href).href;

      const targetSlideIndex = originalSlides.findIndex((slide) => {
        const slideImageUrl = new URL(
          slide.getAttribute("href"),
          window.location.href
        ).href;

        return slideImageUrl === targetImageUrl;
      });

      if (targetSlideIndex !== -1) {
        cardSwiper.slideToLoop(targetSlideIndex);
      }
    });
  });

  cardSwiper.on("slideChange", updateActiveSwatch);

  updateActiveSwatch();
});

$('[data-fancybox]').fancybox({
    dragToClose: false,
});