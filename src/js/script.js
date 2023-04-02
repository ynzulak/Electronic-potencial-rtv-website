import { products } from './products.js'

const productsSection = document.querySelector('.products-list')

const priceCentsCut = function() {
    const numToString = products.price.toString();
    products.price = products.price.slice(0, -3)
}

const renderProducts = function () {
	products.forEach(products => {
		const newProduct = document.createElement('div')
		newProduct.className = '.product'
		newProduct.innerHTML = `
        <div class="product">
        <div class="product-header">
            <h2>${products.name}</h2>
        </div>
        <div class="product-img"><img src="/src/img/iphone13.jpg" alt=""></div>
        <div class="price-box">
            <div class="full-price">
                <div class="prices">
                    <div class="price-with-cents-and-currency"><span class="price">${products.price}</span>
                        <span class="cents-with-currency">
                            <span class="cents">00</span>
                            <span class="'currency">zł</span></span>
                    </div>
                    <div class="price-discount">
                        <div class="old-price">
                            <span class="whole">4499</span>
                            <span class="spearator">,</span>
                            <span class="cents">00</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="installment"><span>224,95 zł x 20 rat 0%</span></div>
            <div class="add-to-cart"><button class="add-to-cart-button"><span>DO
                        KOSZYKA</span></button></div>
        </div>
    </div>
        `

		productsSection.appendChild(newProduct)
	})
}

renderProducts()
console.log(renderProducts())
