// Display current year on footer
const yearEl = document.querySelector('.year');

const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Mobile Navigation
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
	headerEl.classList.toggle('nav-open');
});

// smooth scrolling
const linksContainers = [
	document.querySelector('.header'),
	document.querySelector('.hero-text-box'),
	document.querySelector('.footer'),
];

linksContainers.forEach(container => {
	container.addEventListener('click', function (e) {
		const link = e.target.closest('.nav-link');
		if (!link) return;
		e.preventDefault();

		const sectionId = link.getAttribute('href');
		if (sectionId === '#') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			const section = document.querySelector(sectionId);
			section.scrollIntoView({ behavior: 'smooth' });

			if (link.classList.contains('main-nav-link')) {
				headerEl.classList.remove('nav-open');
			}
		}
	});
});

// sticky navigation
const sectionHeroEl = document.querySelector('.section-hero');
const observer = new IntersectionObserver(
	function (entries) {
		const entry = entries[0];
		if (!entry.isIntersecting) {
			document.body.classList.add('sticky');
		} else {
			document.body.classList.remove('sticky');
		}
	},
	{
		root: null,
		threshold: 0,
		rootMargin: '-80px',
	}
);
observer.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
	var flex = document.createElement('div');
	flex.style.display = 'flex';
	flex.style.flexDirection = 'column';
	flex.style.rowGap = '1px';

	flex.appendChild(document.createElement('div'));
	flex.appendChild(document.createElement('div'));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;
	flex.parentNode.removeChild(flex);
	console.log(isSupported);

	if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
