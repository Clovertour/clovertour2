window.addEventListener("load", function () {
    const videoOverlay = document.getElementById("pageLoader");

    setTimeout(() => {
        videoOverlay.style.transition = "opacity 1s ease";
        videoOverlay.style.opacity = "0";

        setTimeout(() => {
            videoOverlay.style.display = "none";
            document.body.style.overflowY = "auto";
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowX = "hidden";
            document.documentElement.style.overflowX = "hidden";

            document.body.classList.add("loaded");
        }, 1000);
    }, 3000);
});

//FADE SCROLL
const items = document.querySelectorAll('.fade-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});
items.forEach(item => observer.observe(item));

window.onload = function () {
    window.scrollTo(0, 0);
};

function openCityPage(url) {
    window.location.href = url;
}

//BACKGROUND
document.addEventListener("DOMContentLoaded", function () {
    const background = document.querySelector('.websitebackground');

    const images = [
        '/img/backgrounds/mainBg1.webp',
        '/img/backgrounds/mainBg2.webp',
        '/img/backgrounds/mainBg3.webp',
        '/img/backgrounds/mainBg4.webp',
        '/img/backgrounds/mainBg5.webp',
    ];

    let index = 0;

    // Предзагрузка всех изображений
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    function changeBackground() {
        background.style.backgroundImage = `url('${images[index]}')`;
        index = (index + 1) % images.length;
    }

    changeBackground();
    setInterval(changeBackground, 20000);
});


//FOCUS REMOVE ON LINKS
document.querySelectorAll('.sh-menu a').forEach(link => {
    link.addEventListener('click', () => {
        link.blur();
    });
});

//BURGER
const burger = document.querySelector('.burger');
const menu = document.querySelector('.sh-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});

//TRANSLATE
const toggle = document.getElementById('lang-toggle');

const translations = {
    en: {
        cont1_title: 'YOUR JOURNEY BEGINS HERE',
        cont1_subtitle: 'Where the wind sings ancient songs,\nand the land holds the breath of ages',
        cont1_btn: 'Explore more',
        cont2_title: 'DISCOVER YOUR NEXT ADVENTURE ON THE MAP',
        menu_tours: 'Tours',
        menu_about: 'About',
        menu_gallery: 'Gallery',
        menu_contact: 'Contact',
        modal_title1: 'Contact Us',
        submit: 'Send',
        modal_title2: 'You can find us here',
        thank_you_message: 'Thank you for contacting us!',
    },
    ru: {
        cont1_title: 'ЗДЕСЬ НАЧИНАЕТСЯ ТВОЕ ПУТЕШЕСТВИЕ',
        cont1_subtitle: 'Там, где ветер поёт древние песни,\na земля хранит дыхание веков',
        cont1_btn: 'Узнать больше',
        cont2_title: 'ПУТЕШЕСТВУЙТЕ ЛЕГКО - С НАШЕЙ КАРТОЙ',
        menu_tours: 'Туры',
        menu_about: 'О нас',
        menu_gallery: 'Галерея',
        menu_contact: 'Контакты',
        modal_title1: 'Связаться с нами',
        submit: 'Отправить',
        modal_title2: 'Вы можете найти нас здесь',
        thank_you_message: 'Спасибо за ваш запрос!'
    }
};

function setLanguage(lang) {
    localStorage.setItem('site-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    toggle.textContent = lang.toUpperCase();
}

toggle.addEventListener('click', () => {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    setLanguage(newLang);
});

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site-lang') || 'en';
    setLanguage(savedLang);
});

//CONTACTS MODAL WINDOW
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("contact-modal");
    const openBtn = document.getElementById("contact-btn");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("contact-form");
    const thankYouMessage = document.getElementById("thank-you");

    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "flex";
        form.style.display = "flex";
        thankYouMessage.style.display = "none";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mzzgjlll", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) throw new Error("Network response was not ok");

            form.style.display = "none";
            thankYouMessage.style.display = "block";

            form.reset();

            setTimeout(() => {
                modal.style.display = "none";
                form.style.display = "flex";
                thankYouMessage.style.display = "none";
            }, 3000);

        } catch (error) {
            alert("There was a problem submitting your form. Please try again later.");
        }
    });
});

//MAP
document.querySelectorAll('.region-image').forEach(img => {
    img.addEventListener('click', () => {
        const modalId = img.dataset.modal;
        document.getElementById(modalId).style.display = "block";
    });
});

document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = "none";
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = "none";
    }
});

const regions = document.querySelectorAll('.region-image');

regions.forEach(region => {
    region.addEventListener('mouseenter', () => {
        regions.forEach(r => {
            if (r !== region) r.classList.add('dimmed');
        });
    });

    region.addEventListener('mouseleave', () => {
        regions.forEach(r => r.classList.remove('dimmed'));
    });
});

//SCROLL TO CONT3
document.getElementById('exploreBtn').addEventListener('click', () => {
    document.getElementById('cont3Tours').scrollIntoView({ behavior: 'smooth' });
});

//CONTAINER 3
document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.getElementById('mainTourCard');
    const mainImage = document.getElementById('mainImage');
    const mainTitle = document.getElementById('mainTitle');
    const mainPrice = document.getElementById('mainPrice');
    const mainDesc = document.getElementById('mainDesc');
    const mainDetails = document.getElementById('mainDetails');

    const smallCards = document.querySelectorAll('.side-cards .tour-card');

    let mainData = {
        title: mainTitle.textContent,
        price: mainPrice.textContent,
        desc: mainDesc.textContent,
        details: mainDetails.textContent,
        img: mainImage.src
    };

    let smallCardsData = Array.from(smallCards).map(card => ({
        title: card.dataset.title,
        price: card.dataset.price,
        desc: card.dataset.desc,
        details: card.dataset.details,
        img: card.dataset.img
    }));

    let currentIndex = 0;

    function updateMainCard() {
        mainTitle.textContent = mainData.title;
        mainPrice.textContent = mainData.price;
        mainDesc.textContent = mainData.desc;
        mainDetails.textContent = mainData.details;
        mainImage.src = mainData.img;
    }

    function updateSmallCards() {
        smallCards.forEach((card, i) => {
            const data = smallCardsData[i];
            card.querySelector('h3').textContent = data.title;
            card.querySelector('p').textContent = `1-day tour • ${data.price}`;
            card.querySelector('img').src = data.img;
        });
    }

    function switchTo(newIndex) {
        if (newIndex === currentIndex) return;

        const total = smallCards.length + 1;

        const smallCardToAnimate = newIndex === 0 ? null : smallCards[newIndex - 1];

        mainCard.style.transition = 'opacity 0.3s ease';
        mainCard.style.opacity = '0';
        if (smallCardToAnimate) {
            smallCardToAnimate.style.transition = 'opacity 0.3s ease';
            smallCardToAnimate.style.opacity = '0';
        }

        setTimeout(() => {
            if (newIndex !== 0) {
                const temp = { ...mainData };
                mainData = { ...smallCardsData[newIndex - 1] };
                smallCardsData[newIndex - 1] = temp;
            }

            updateMainCard();
            updateSmallCards();

            mainCard.style.opacity = '1';
            if (smallCardToAnimate) {
                smallCardToAnimate.style.opacity = '1';
            }

            currentIndex = newIndex;
            updateIndexDisplay();
        }, 300);
    }

    const cardIndexDisplay = document.getElementById('cardIndex');
    function updateIndexDisplay() {
        cardIndexDisplay.textContent = `${currentIndex + 1} / ${smallCards.length + 1}`;
    }

    smallCards.forEach((card, i) => {
        card.addEventListener('click', () => {
            switchTo(i + 1);
        });
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        const total = smallCards.length + 1;
        const newIndex = (currentIndex - 1 + total) % total;
        switchTo(newIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const total = smallCards.length + 1;
        const newIndex = (currentIndex + 1) % total;
        switchTo(newIndex);
    });

    updateIndexDisplay();
});
