'use strict'
import { products } from './products.js'

let addToBasketEvent = false
let basketPrice = []

const header = document.querySelector('.header-sticky')
const productsSection = document.querySelector('.products-list')
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
	<div class="product-amount">${itemAmountNumber}</div>
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

	basketPrice.push(products.at(key).price)
	let totalBasketPrice = basketPrice.reduce((sum, product) => {
		return sum + product
	}, 0)

	console.log(basketPrice)
	console.log(totalBasketPrice)

	const totalBasketAmount = document.querySelector('.total-amount')
	totalBasketAmount.innerHTML = totalBasketPrice + '.00 zł'
	addToBasketEvent = true

	const basketProductDiv = document.querySelectorAll('.basket-product')
	const xMark = document.querySelectorAll('.fa-xmark')
	function handleClick(event) {
		const xMark = event.target
		xMark.removeEventListener('click', handleClick)
		// 	console.log(totalBasketPrice)
	}
	xMark.forEach((btn, index) => {
		btn.addEventListener(
			'click',
			() => {
				
				totalBasketPrice -= basketPrice[index]
				// basketPrice.splice(index, 1)
				totalBasketAmount.innerHTML = totalBasketPrice
				console.log(basketPrice)
				console.log(totalBasketPrice)
				basketProductDiv[index].remove()
				itemAmountNumber -= 1
				itemAmount.innerHTML = itemAmountNumber
			},
			handleClick
		)
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
		<button class="btn" data-category="${models}"><span style="pointer-events:none">${models}</span></button>
		`
		modelsList.appendChild(newModel)
	})
	const modelItem = document.querySelectorAll('.model-item')
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

	header.addEventListener('mouseleave', e => {
		if (addToBasketEvent) {
			basketList.classList.remove('basket-animation-in')
			basketList.classList.add('basket-animation-out')
		}
	})
}

basketHover()

document.onload = renderProducts(recomendedProducts)
document.onload = renderModels(recomendedProducts)
