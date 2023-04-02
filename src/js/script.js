import { products } from './products.js'

const productsSection = document.querySelector('.products-list')

const renderProducts = function (products) {
	products.forEach(products => {
		const newProduct = document.createElement('div')
		newProduct.className = `product ${products.sale ? '' : 'not-on-sale'}  ${
			products.installment ? '' : 'no-installment'
		}`
		newProduct.innerHTML += `
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

document.onload = renderProducts(products)
