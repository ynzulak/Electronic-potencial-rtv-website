'use strict'
import { products } from './products.js'
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
		<div class="add-to-cart"><button class="add-to-cart-button"><span>DO
		KOSZYKA</span></button></div>
		</div>
		`
		const cartBtn = document.querySelectorAll('.add-to-cart-button')

		productsSection.appendChild(newProduct)
		// cartBtn.forEach(btn =>
		// 	btn.addEventListener('click', e => {
		// 		this
		// 	}))
	})
}

// REMEMBER TO FIX THAT
const renderModels = function (products) {
	let uniqueModels = [...new Set(products.map(item => item.model))]
	modelsList.innerHTML = ''
	uniqueModels.forEach(products => {
		const newModel = document.createElement('div')
		newModel.className = `item model-item`
		newModel.innerHTML = `
		<button class="btn"><span>${products}</span></button>
		`
		
		modelsList.appendChild(newModel)
	})
	const modelItem = document.querySelectorAll('.model-item')
	modelItem.forEach(btn =>
		btn.addEventListener('click', function (e) {
			modelItem.forEach(item => item.classList.remove('active'))
			this.classList.add('active')
		})
	)
}

modelItem.forEach(btn =>
	btn.addEventListener('click', function (e) {
		modelItem.forEach(item => item.classList.remove('active'))
		this.classList.add('active')
	})
)
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

const recomendedProducts = products.filter(item => {
	if (item.recomended === true) return item
})

recomendedBtn.addEventListener('click', function (e) {
	categoryItem.forEach(item => item.classList.remove('active'))
	this.classList.add('active')

	renderProducts(recomendedProducts)
	renderModels(recomendedProducts)
})

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

	// searchBtn.addEventListener('click', (e) => renderProducts(foundProducts))
	renderProducts(foundProducts)
	if (search === '') {
		renderProducts(recomendedProducts)
	}
})

document.onload = renderProducts(recomendedProducts)
document.onload = renderModels(recomendedProducts)
