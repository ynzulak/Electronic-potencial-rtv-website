'use strict'
import { products } from './products.js'

let addToBasketEvent = false
let basket = []
let basketPrice = []

const container = document.querySelector('.container')
const headerDiv = document.querySelector('.header-sticky')
const categoriesDiv = document.querySelector('.categories')
const contentDiv = document.querySelector('.content')
const productsDiv = document.querySelector('.products')
const footerDiv = document.querySelector('.footer')
const productsSection = document.querySelector('.products-list')
const searchBar = document.querySelector('.search-bar')
const categoryBtn = document.querySelectorAll('.btn')
const categoryItem = document.querySelectorAll('.cat-item')
const modelItem = document.querySelectorAll('.model-item')
const categoriesItems = document.querySelector('.categories-container')
const modelsList = document.querySelector('.list')
const recomendedBtn = document.querySelector('.recomended-btn')
const searchBarInput = document.querySelector('.input-inner')
const searchBtn = document.querySelector('.search-btn')
const emptyState = document.querySelector('.empty-state')
const shoppingCart = document.querySelector('.shopping-cart')
const basketList = document.querySelector('.products-list-basket')
const basketContainer = document.querySelector('.basket-container')
const logo = document.querySelector('.logo')
const checkout = document.querySelector('.checkout-btn')
const checkoutModal = document.querySelector('.checkout-modal')
const check = document.querySelector('.check')
const checkoutClose = document.querySelector('.checkout-close')
const burgerMenuBars = document.querySelector('.fa-bars')
const burgerMenu = document.querySelector('.burger-menu-categories')
const burgerMenuX = document.querySelector('.burger-close')
const btnBurgerCategory = document.querySelectorAll('.btn-burger')
const burgerModelsMenu = document.querySelectorAll('.aside')
// const burgerModelsMenu = document.querySelectorAll('.models-menu')

// Rendering products
const renderProducts = function (products) {
	productsSection.innerHTML = ''
	products.forEach(products => {
		const newProduct = document.createElement('div')
		newProduct.className = `product ${products.sale ? '' : 'not-on-sale'}  ${
			products.installment ? '' : 'no-installment'
		}`
		newProduct.innerHTML = `
        <div class="product-header">
		<h2>${products.name}</h2>
		</div>
		<div class="product-img"><img src="${products.image}"></div>
		<div class="price-box">
		<div class="full-price">
		<div class="prices">
		<div class="price-with-cents-and-currency"><span class="price">${products.price}</span>
		<span class="cents-with-currency">
		<span class="cents">${products.cents}</span>
		<span class="'currency">zł</span></span>
		</div>
		<div class="price-discount">
		<div class="old-price">
		<span class="whole">${products.price + products.saleAmount}</span>
		<span class="spearator">,</span>
		<span class="cents">${products.cents}</span>
		</div>
		
		</div>
		</div>
		</div>
		<div class="installment"><span>${products.installment} zł x 20 rat 0%</span></div>
		<div class="add-to-cart"><button data-id="${products.id}" class="add-to-cart-button"><span>DO
		KOSZYKA</span></button></div>
		</div>
		`
		productsSection.appendChild(newProduct)
	})

	const addToBasketButton = document.querySelectorAll('.add-to-cart-button')
	addToBasketButton.forEach(btn => btn.addEventListener('click', addToBasket))
}
const addToBasket = e => {
	const itemAmount = document.querySelector('.item-amount')
	let itemAmountNumber = parseInt(itemAmount.innerHTML)
	itemAmountNumber += 1
	itemAmount.innerHTML = itemAmountNumber

	const selectedId = parseInt(e.target.dataset.id)
	const key = products.findIndex(product => product.id === selectedId)
	const shortenedName = products.at(selectedId).name.slice(0, 28) + '...'

	const basketProduct = `
	<div class="basket-product">
	<div class="product-img">
	
	<img class="product-pic" src="${products.at(key).image}" alt="">
	</div>
	<div class="product-name">
	<p>${shortenedName}</p>
	</div>
	<div class="product-price">
	<p>${products.at(key).price + '.' + products.at(key).cents} zł</p>
	<i class="fa-solid fa-xmark"></i>
	</div>
	</div>
	`

	basketContainer.insertAdjacentHTML('afterbegin', basketProduct)

	basket.unshift(products.at(key))
	basketPrice.unshift(products.at(key).price)

	let totalBasketPrice = basketPrice.reduce((sum, product) => {
		return (sum += product)
	}, 0)

	const totalBasketAmount = document.querySelector('.total-amount')
	totalBasketAmount.innerHTML = totalBasketPrice + '.00 zł'
	addToBasketEvent = true

	const xMark = document.querySelector('.fa-xmark')
	xMark.addEventListener('click', function (e) {
		for (let i = basketPrice.length - 1; i >= 0; i--) {
			if (e) {
				basketPrice.splice(i, 1)
				totalBasketPrice = basketPrice.reduce((sum, product) => {
					return (sum += product)
				}, 0)
				totalBasketAmount.innerHTML = totalBasketPrice + '.00 zł'
				itemAmountNumber -= 1
				itemAmount.innerHTML = itemAmountNumber
				const basketProductDiv = xMark.closest('.basket-product')
				basketProductDiv.remove()
				console.log(basketPrice)
				if (totalBasketPrice === 0) {
					totalBasketAmount.innerHTML = ``
					basketList.classList.add('basket-animation-out')
					setTimeout(() => {
						basketList.classList.add('hidden')
						addToBasketEvent = false
					}, 200)
				}
				break
			}
		}
	})
}

// Rendering model items with event
const renderModels = function (products) {
	let uniqueModels = [...new Set(products.map(item => item.model))]
	uniqueModels = ['Wszystkie', ...uniqueModels]
	modelsList.innerHTML = ''
	uniqueModels.forEach(models => {
		const newModel = document.createElement('div')
		newModel.className = `item model-item`
		newModel.innerHTML = `
		<button class="btn" data-category="${models}"><span style="pointer-events:none">${models}</span><i class="fa-solid fa-chevron-right"></i></button>
		`
		modelsList.appendChild(newModel)
	})
	const modelItem = document.querySelectorAll('.model-item')
	modelItem.forEach(btn => {
		btn.addEventListener('click', e => {
			burgerMenu.classList.add('hidden')
			burgerModelsMenu.forEach(btn => {
				btn.classList.add('hidden')
			})
			const headerHeight = document.querySelector('.header-sticky').offsetHeight
			const elementPosition = productsDiv.getBoundingClientRect().top + window.pageYOffset
			const targetY = elementPosition - headerHeight
			window.scrollTo({
				behavior: 'smooth',
				top: targetY,
			})
		})
	})
	modelItem.forEach((btn, index) => {
		if (index == 0) {
			btn.classList.add('active')
		}
		btn.addEventListener('click', function (e) {
			const model = e.target.dataset.category
			let productsArr = products
			if (model === 'Wszystkie') {
				productsArr = products
			} else {
				productsArr = productsArr.filter(item => {
					if (item.model === model) return item
				})
			}

			renderProducts(productsArr)

			modelItem.forEach(item => item.classList.remove('active'))
			this.classList.add('active')
		})
	})
}

// Category items buttons
categoryItem.forEach((btn, index) => {
	if (index !== 0) {
		btn.addEventListener('click', function (e) {
			const category = e.target.dataset.category
			const selectedCategoryProducts = products.filter(item => {
				if (item.category === category) return item
			})
			renderProducts(selectedCategoryProducts)
			renderModels(selectedCategoryProducts)

			categoryItem.forEach(item => item.classList.remove('active'))
			this.classList.add('active')
		})
	}
})

// Recomended products
const recomendedProducts = products.filter(item => {
	if (item.recomended === true) return item
})

recomendedBtn.addEventListener('click', function (e) {
	categoryItem.forEach(item => item.classList.remove('active'))
	this.classList.add('active')

	renderProducts(recomendedProducts)
	renderModels(recomendedProducts)
})

// Search Bar
searchBarInput.addEventListener('input', e => {
	const search = e.target.value
	const foundProducts = products.filter(product => {
		if (product.name.toLowerCase().includes(search.toLowerCase())) return product
		categoryItem.forEach(item => item.classList.remove('active'))
		renderProducts(recomendedProducts)
	})

	foundProducts.length === 0
		? emptyState.classList.add('active-empty-state')
		: emptyState.classList.remove('active-empty-state')

	renderProducts(foundProducts)
	if (search === '') {
		renderProducts(recomendedProducts)
		recomendedBtn.classList.add('active')
	}
})
const basketHover = function () {
	shoppingCart.addEventListener('mouseenter', e => {
		if (addToBasketEvent) {
			basketList.classList.remove('hidden')
			basketList.classList.remove('basket-animation-out')
			basketList.classList.add('basket-animation-in')
		}
	})

	basketContainer.addEventListener('mouseleave', e => {
		if (addToBasketEvent) {
			basketList.classList.remove('basket-animation-in')
			basketList.classList.add('basket-animation-out')
		}
	})

	headerDiv.addEventListener('mouseleave', e => {
		if (addToBasketEvent) {
			basketList.classList.remove('basket-animation-in')
			basketList.classList.add('basket-animation-out')
		}
	})
}

const basketCheckout = function () {
	checkout.addEventListener('click', e => {
		checkoutModal.classList.remove('hidden')
		headerDiv.classList.add('blur', 'no-hover')
		categoriesDiv.classList.add('blur', 'no-hover')
		contentDiv.classList.add('blur', 'no-hover')
		productsDiv.classList.add('blur', 'no-hover')
		footerDiv.classList.add('blur', 'no-hover')
	})

	check.addEventListener('click', e => {
		location.reload()
	})

	checkoutClose.addEventListener('click', e => {
		location.reload()
	})
}

const searchBarHide = function () {
	window.addEventListener('scroll', function () {
		if (window.scrollY > 29) {
			searchBar.style.display = 'none'
		} else {
			searchBar.style.display = 'block'
		}
		if (window.scrollY > 35) {
			headerDiv.style.height = 70 + 'px'
		} else {
			headerDiv.style.height = 110 + 'px'
		}
	})
}

const burgerMenuRender = function () {
	burgerMenuBars.addEventListener('click', e => {		
		burgerMenu.classList.remove('hidden')
		burgerMenu.classList.remove('burger-x-slide-right')
		burgerMenu.classList.add('burger-slide-left')
	})

	burgerMenuX.addEventListener('click', e => {
		burgerMenu.classList.remove('burger-slide-left')
		burgerMenu.classList.add('burger-x-slide-right')
		setTimeout(() => {
			burgerMenu.classList.add('hidden')
		}, 300)
		burgerModelsMenu.forEach(btn => {
			btn.classList.add('hidden')
		})
	})

	btnBurgerCategory.forEach(btn => {
		btn.addEventListener('click', e => {
			burgerModelsMenu.forEach(btn => {
				btn.classList.add('burger-slide-left')
				btn.classList.remove('hidden')
			})
		})
	})
}

logo.addEventListener('click', () => {
	location.reload()
})

basketHover()
basketCheckout()
searchBarHide()
burgerMenuRender()
document.onload = renderProducts(recomendedProducts)
document.onload = renderModels(recomendedProducts)
