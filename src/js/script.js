'use strict'
import { products } from './products.js'
let categories = []
const productsSection = document.querySelector('.products-list')
const categoryBtn = document.querySelectorAll('.btn')
const categoryItem = document.querySelectorAll('.cat-item')
const modelItem = document.querySelectorAll('.model-item')


categoryItem.forEach(btn =>
	btn.addEventListener('click', function () {
		categoryItem.forEach(item => item.classList.remove('active'))
		this.classList.add('active')
	})
)
modelItem.forEach(btn =>
	btn.addEventListener('click', function () {
		modelItem.forEach(item => item.classList.remove('active'))
		this.classList.add('active')
	})
)




const renderProducts = function (products) {
	products.forEach(products => {
		const newProduct = document.createElement('div')
		newProduct.className = `product ${products.sale ? '' : 'not-on-sale'}  ${
			products.installment ? '' : 'no-installment'
		}`
		newProduct.innerHTML = `
        <div class="product-header">
            <h2>${products.name}</h2>
        </div>
        <div class="product-img"><img src="${products.image}" alt=""></div>
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

const renderCategories = () => {
	let categories = new Set(products.map(item => item.category))

	console.log(categories)
	const categoriesItems = document.querySelector('.categories-container')
	categories = ['polecamy', ...categories]
	console.log(categories)
}

// document.onload = renderProducts(products)
// document.onload = renderCategories(products)
