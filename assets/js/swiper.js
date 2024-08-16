document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        on: {
            slideChange: function (swiper) {
                const activeIndex = swiper.realIndex;
                const setIndex = Math.floor(activeIndex / 5);

                // Tüm indicator-set'leri al
                const allSets = document.querySelectorAll('.indicator-set');

                // setIndex kontrolü ekle
                if (setIndex >= allSets.length) return;

                // Ekran boyutuna göre display değeri ayarlama
                const displayStyle = window.innerWidth <= 768 ? 'flex' : 'block';

                // Tüm indicator-set'leri gizle veya göster
                allSets.forEach((set, i) => {
                    set.style.display = (i === setIndex) ? displayStyle : 'none';
                });

                const activeSet = allSets[setIndex];
                if (!activeSet) return; // Eğer activeSet yoksa, işlemi durdur

                const lines = activeSet.querySelectorAll('.indicator-line');

                // Mevcut setin tüm indicator-line'larını sıfırla
                lines.forEach(line => {
                    line.classList.remove('active');
                });

                // Aktif olanı aktif yap
                const activeLineIndex = activeIndex % 5;
                if (lines[activeLineIndex]) {
                    lines[activeLineIndex].classList.add('active');
                }

                // Aktif indicator'u ve dot'u güncelle
                const indicators = activeSet.querySelectorAll('.indicator');
                const dots = activeSet.querySelectorAll('.dot');
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === activeLineIndex);
                    dots[i].classList.toggle('active', i === activeLineIndex);
                });
            },
        },
    });

    const slideCount = document.querySelectorAll('.mySwiper .swiper-slide').length; // Slayt sayısını alın
    const setCount = Math.ceil(slideCount / 5);

    const indicatorContainer = document.querySelector('.indicator-container');

    // Indicator container'ı dinamik olarak doldurun
    for (let i = 0; i < setCount; i++) {
        const indicatorSet = document.createElement('div');
        indicatorSet.classList.add('indicator-set');
        if (i === 0) {
            indicatorSet.classList.add('active');
        }

        for (let j = 0; j < 5; j++) {
            const slideIndex = i * 5 + j;
            if (slideIndex >= slideCount) break;

            const indicatorLine = document.createElement('div');
            indicatorLine.classList.add('indicator-line');
            if (slideIndex === 0) {
                indicatorLine.classList.add('active');
            }

            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            indicator.textContent = String(slideIndex + 1).padStart(2, '0'); // Numara ekleme
            indicatorLine.appendChild(indicator);

            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (slideIndex === 0) {
                dot.classList.add('active');
            }
            indicatorLine.appendChild(dot);

            indicatorSet.appendChild(indicatorLine);

            // Tıklama olayını ayarla - slideToLoop kullanımı
            indicatorLine.addEventListener('click', function () {
                swiper.slideToLoop(slideIndex);
            });
        }

        indicatorContainer.appendChild(indicatorSet);
    }

    // İlk slide için varsayılan durumu ayarla
    swiper.emit('slideChange', swiper);
});

var eventSwiper = new Swiper(".eventSlider", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2.5,
            spaceBetween: 10,
        },
        1124: {
            slidesPerView: 2.5,
            spaceBetween: 10,
        },
        1125: {
            slidesPerView: 2.8,
            spaceBetween: 10,
        },
        1922: {
            slidesPerView: 4.8,
            spaceBetween: 10,
        },
    },
});
