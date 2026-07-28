const header = document.querySelector('header')
const nav = document.querySelector('nav')
const brainSchema = document.querySelector('#remember .schema')
const swirlSchema = document.querySelector('#consequences .schema')

const reviews = document.querySelector('.reviews-scroll')
const prevReview = document.querySelector('.previous-reviews')
const nextReview = document.querySelector('.next-reviews')
let currentReview = 0

const mainObserver = new IntersectionObserver(mainObserverWork, {root: null, threshold: 0.2})
const arrowObserver = new IntersectionObserver(arrowObserverWork, {root: null, threshold: 1})

window.scrollTo(0, 0)
// skipAnimation()

header.addEventListener('click', skipAnimation)
window.addEventListener('resize', updateScales)
updateScales()
checkLinks()

reviews.scrollLeft = 0
prevReview.classList.add('disabled')
prevReview.addEventListener('click', evt => scrollReviews(evt, 'back'))
nextReview.addEventListener('click', evt => scrollReviews(evt, 'next'))
reviews.addEventListener('touchmove', e => e.touches[0].clientX = 0, { passive: false });

document.querySelectorAll('section').forEach(element => mainObserver.observe(element))
document.querySelectorAll('.arrows svg').forEach(element => arrowObserver.observe(element))
document.querySelectorAll('.question').forEach(element => element.addEventListener('click', expandQuestion))

document.querySelector('.burger-menu').addEventListener('click', toggleBurgerMenu)
document.querySelectorAll('.links a').forEach(element => element.addEventListener('click', toggleBurgerMenu))

function skipAnimation() {
    document.querySelector('body').classList.add('skip-animation')
    document.querySelector('nav').classList.add('skip-animation')
    document.querySelector('.icon').classList.add('skip-animation')
    document.querySelector('.title-container').classList.add('skip-animation')
}

function expandQuestion(event) {
    let parent = event.currentTarget
    let target = parent.querySelector('span')

    if (!parent.classList.contains('question-open')) 
        target.style.height = target.scrollHeight + 12.5 + 'px'
    else 
        target.style.height = 0
    parent.classList.toggle('question-open')
}

function toggleBurgerMenu(evt) {
    nav.classList.toggle('burger-open')
}

function mainObserverWork(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('cool-appear-animation')
            mainObserver.unobserve(entry.target)
        }
    })
}

function arrowObserverWork(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('draw-animation')
            arrowObserver.unobserve(entry.target)
        }
    })
}

function updateScales() {
    let newScale = Math.min(1, window.innerWidth / 870)
    swirlSchema.style.zoom = newScale
    brainSchema.style.zoom = newScale
}

function scrollReviews(evt, direction) {
    if (direction == 'next')
        currentReview += 1
    else if (direction == 'back')
        currentReview -= 1

    let newScroll = (reviews.parentElement.offsetWidth - 25) * currentReview

    reviews.scrollLeft = newScroll
    prevReview.classList.toggle('disabled', currentReview == 0)
    nextReview.classList.toggle('disabled', newScroll >= reviews.scrollWidth - reviews.parentElement.offsetWidth + 50)
}

function checkLinks() {
    if (navigator.userAgentData.mobile) {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.setAttribute('target', '_self');
        })
    }
}