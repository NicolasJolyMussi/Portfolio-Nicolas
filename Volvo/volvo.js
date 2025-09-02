let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let items = container.querySelectorAll('.item');
let indicators = document.querySelector('.indicators');
let dots = indicators.querySelectorAll('ul li');
let list = container.querySelector('.list');

let active = 0;
let firstPosition = 0;
let lastPosition = items.length - 1

function updateIndicator() {

    let itemOld = container.querySelector('.list .item.active')
    itemOld.classList.remove('active')

    let dotsOld = indicators.querySelector('ul li.active');
    dotsOld.classList.remove('active');

    items[active].classList.add('active')
    dots[active].classList.add('active');

    indicators.querySelector('.number').innerHTML = '0' + (active + 1);
}

nextButton.onclick = () => {
    list.style.setProperty('--calculation', 1)
    active = (active + 1) % (lastPosition + 1)
    updateIndicator();
}

prevButton.onclick = () => {
    list.style.setProperty('--calculation', -1)
    active = active - 1 < firstPosition ? lastPosition : active - 1
    updateIndicator();
}