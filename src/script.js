const solutionBlocks = document.querySelectorAll('.solution')
const showSolutionButtons = document.querySelectorAll('.show-solution')
const showAdditionalQuestions = document.querySelectorAll('.show-additional-questions')
const additionalQuestions = document.querySelectorAll('.additional-questions')
const titles = document.querySelectorAll('.title')

// Счетчик
const counter = count => () => ++count
let counterPlus = counter(0)

// Автоматическая нумерация вопросов
counterPlus = counter(0)
titles.forEach(item => {
	const old = item.textContent
	item.textContent = ''
	item.textContent += `${counterPlus()}. ${old}`
})

// Добавление класса active(подчеркивание пункта меню)
const page = window.location.pathname.split('/').pop()
document.querySelector(`a[href$='${page}']`).classList.add('active')

//  Добавляем на каждый элемент solutionBlocks и showSolutionButtons data атрибут
const setAttribute = (domElements, Attribute) => {
	counterPlus = counter(0)
	domElements.forEach(item => item.setAttribute(`${Attribute}`, `${counterPlus()}`))
}
setAttribute(solutionBlocks, 'data-solution')
setAttribute(showSolutionButtons, 'data-question')
setAttribute(additionalQuestions, 'data-additional-question')
setAttribute(showAdditionalQuestions, 'data-additional-question-solution')

// Функция для показа блоков
function showBlock(obj) {
	obj.domElement.forEach(item =>
		item.addEventListener('click', e => {
			const data = e.target.getAttribute(obj.getAttribute)
			const elem = document.querySelector(obj.setAttribute(data))
			if (elem.style.display == 'block') {
				elem.style.display = 'none'
				item.textContent = obj.textShow
			} else {
				elem.style.display = 'block'
				item.textContent = obj.textHide
			}
		})
	)
}

// Объект для показа блоков с Решениями
const solutionsBlocks = {
	domElement: showSolutionButtons,
	getAttribute: 'data-question',
	setAttribute: function (data) {
		return `div[data-solution='${data}']`
	},
	textShow: 'Показать решение',
	textHide: 'Скрыть решение'
}
// Объект для показа блока с дополнительными вопросами
const additionalQuestionsBlocks = {
	domElement: showAdditionalQuestions,
	getAttribute: 'data-additional-question-solution',
	setAttribute: function (data) {
		return `div[data-additional-question='${data}']`
	},
	textShow: 'Дополнительные вопросы',
	textHide: 'Скрыть дополнительные вопросы'
}

showBlock(solutionsBlocks)
showBlock(additionalQuestionsBlocks)

// Музыка
const songs = document.querySelectorAll('.audio p')
const audio = document.querySelector('audio')

songs.forEach(item => {
	item.addEventListener('click', e => {
		const src = `../src/audio/${e.target.getAttribute('data-src')}.mp3`
		audio.setAttribute('src', src)
	})
})
