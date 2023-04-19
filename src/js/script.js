'use strict'
import { products } from './products.js'

let categories = []
const productsSection = document.querySelector('.products-list')
const categoryBtn = document.querySelectorAll('.btn')
const categoryItem = document.querySelectorAll('.cat-item')
const modelItem = document.querySelectorAll('.model-item')
const categoriesItems = document.querySelector('.categories-container')
const recomendedBtn = document.querySelector('.recomended-btn')

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

		productsSection.appendChild(newProduct)
	})
}

categoryItem.forEach((btn, index) => {
	if (index !== 0) {
		btn.addEventListener('click', function (e) {
			const category = e.target.dataset.category
			const selectedCategoryProducts = products.filter(item => {
				if (item.category === category) return item
			})
			renderProducts(selectedCategoryProducts)
			console.log(selectedCategoryProducts)

			categoryItem.forEach(item => item.classList.remove('active'))
			this.classList.add('active')
		})
	}
})


const recomendedProducts = products.filter(item => {
    if (item.recomended === true) return item
})

recomendedBtn.addEventListener('click', function (e) {
	renderProducts(recomendedProducts)
})




modelItem.forEach(btn =>
	btn.addEventListener('click', function () {
		modelItem.forEach(item => item.classList.remove('active'))
		this.classList.add('active')
	})
)

// document.onload = renderCategories(products)
document.onload = renderProducts(recomendedProducts)
