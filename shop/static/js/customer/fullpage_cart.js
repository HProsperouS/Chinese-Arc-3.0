let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));

if(!productsInCart){
	productsInCart = [];
}
// const parentElement = document.querySelector('#buyItems');
// const cartSumPrice = document.querySelector('#sum-prices');
// const products = document.querySelectorAll('.product-under');
// const cartItemNumber= document.querySelector('#sum-count');

const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-price');
const products = document.querySelectorAll('.col-md-3');
const cartItemNumber= document.querySelector('#sum-count');
const flash = document.getElementById('flash')

const active_discount = document.querySelectorAll('.Discount-active')
// const CartCallout = function(){
//   alert("Item added to cart!");
// }


function getCartSum() {
	var prdLenth = productsInCart.length;
	var paymentPrice = 0;
	var discount_count = 0;
	
	for (let i = 0; i < prdLenth; i++) {
//		alert(productsInCart[i].basePrice c);

		// assuming the price of each item in cart will not be same

		paymentPrice = paymentPrice + ((productsInCart[i].basePrice) * productsInCart[i].count)
		

	}
	localStorage.setItem('value', paymentPrice);
	document.getElementById("grandTotal").textContent = paymentPrice;
	document.getElementById('discount_number').textContent = 0
	document.getElementById('code_number').textContent = 'N/A'
	localStorage.setItem('discount', 0)

	
	
	
}
function empty_display(){
	document.querySelector('#empty-discount').textContent =''
}
function ApplyRemove(){
	if ( document.getElementById('grandTotal').textContent == 0){
		Checkout()
	}
	else if ( document.getElementById('grandTotal').textContent != 0){
		if (document.getElementById('Apply_Remove').textContent == 'Apply'){
			if (document.getElementById('Discount_entry').value == ''){
				document.querySelector('#empty-discount').textContent = 'Please enter a vaild code'
	
				const timer = setTimeout(empty_display,1000)
		
			}
			else if (document.getElementById('Discount_entry').value != ''){
	
				active_discount.forEach(code => {
					var discount_count = 0; 
					const discount_code = code.querySelector('.Discount_code').textContent;
					const discount_value = document.getElementById('Discount_entry')
					const discount_secret = code.querySelector('.Discount_secret').textContent;
			
					
					if(document.getElementById('Discount_entry').value == code.querySelector('.Discount_code').textContent ){
				
						document.getElementById('Apply_Remove').textContent = 'Remove';
					
						document.getElementById('discount_number').textContent = discount_secret
						document.getElementById('code_number').textContent = discount_code
						// var tick_confirm = document.getElementById('tick_confirm')
						// tick_confirm.classList.add('far fa-check-circle');
						var discount_pricing = document.getElementById("grandTotal").textContent
						paymentPrice = discount_pricing - parseFloat(discount_secret)
						document.getElementById("grandTotal").textContent = paymentPrice;
						localStorage.setItem('value', paymentPrice);
						localStorage.setItem('discount', discount_secret)
						
						discount_count +=1
					}
					else if (document.getElementById('Discount_entry').value != code.querySelector('.Discount_code').textContent ){
						
						document.querySelector('#empty-discount').textContent = 'Please enter a vaild code'
			
						const error_code = setTimeout(empty_display,1000)
					}
						
	
			
				})
	
			}
		}
		else if (document.getElementById('Discount_entry').value == ''){
			document.getElementById('Discount_entry').value = ''
			document.getElementById('Apply_Remove').textContent ='Apply'
			var discount = document.getElementById('discount_number').textContent;
			var discount_pricing = document.getElementById("grandTotal").textContent
			paymentPrice = parseFloat(discount_pricing) + parseFloat(discount)
			document.getElementById("grandTotal").textContent = paymentPrice;
			
			document.getElementById('discount_number').textContent = 0
			document.getElementById('code_number').textContent = 'N/A'
			localStorage.setItem('value', paymentPrice);
			localStorage.setItem('discount', 0)
		}
		else if (document.getElementById('Apply_Remove').textContent == 'Remove'){
			document.getElementById('Discount_entry').value = ''
			document.getElementById('Apply_Remove').textContent ='Apply'
			var discount = document.getElementById('discount_number').textContent;
			var discount_pricing = document.getElementById("grandTotal").textContent
			paymentPrice = parseFloat(discount_pricing) + parseFloat(discount)
			document.getElementById("grandTotal").textContent = paymentPrice;
			
			document.getElementById('discount_number').textContent = 0
			document.getElementById('code_number').textContent = 'N/A'
			localStorage.setItem('value', paymentPrice);
			localStorage.setItem('discount', 0)
		}
	}
	
	

}



active_discount.forEach(code => {
	code.addEventListener('click', (e) => {
		if ( document.getElementById('grandTotal').textContent == 0){
			document.querySelector('#alert-discount').textContent = 'Cart is Empty'

			const timer = setTimeout(alert_discount,1000)
		}
		else if ( document.getElementById('grandTotal').textContent != 0){
			getCartSum()
			var discount_count = 0;
			console.log('1')
			const discount_code = code.querySelector('.Discount_code').textContent;
			const discount_value = document.getElementById('Discount_entry')
			const discount_secret = code.querySelector('.Discount_secret').textContent
			
			discount_value.value = discount_code

			if (discount_value.value == discount_code && discount_count == 0) {
				document.getElementById('Apply_Remove').textContent = 'Remove';
				
				document.getElementById('discount_number').textContent = discount_secret
				document.getElementById('code_number').textContent = discount_code
				// var tick_confirm = document.getElementById('tick_confirm')
				// tick_confirm.classList.add('far fa-check-circle');
				var discount_pricing = document.getElementById("grandTotal").textContent
				paymentPrice = discount_pricing - parseFloat(discount_secret)
				document.getElementById("grandTotal").textContent = paymentPrice;
				localStorage.setItem('value', paymentPrice);
				localStorage.setItem('discount', discount_secret)
				
				discount_count +=1
		
				
				
			}
			else{
				console.log('Error')
			
			
			}
	
		}
		
		
	})
})	


function Summary_value(){
	const value = localStorage.getItem('value')
	const discount = localStorage.getItem('discount')
	document.getElementById("grandTotal").innerHTML = value;
	document.getElementById('summary-value').value = value;
	document.getElementById('discount-value').value = discount;
	console.log(productsInCart)
	
	
}





function Checkout(){
	var pricing = document.getElementById("grandTotal").textContent
	

	
	if (pricing <= 0 ) {
		document.getElementById("checkout").href = "#";
		document.getElementById('flash').textContent = 'Cart is Empty!'
		
		const showFlash = () => {
			flash.classList.add("flash--visible")  
		  }
		const hideFlash = () => {
			flash.classList.remove("flash--visible")
			document.getElementById('flash').innerHTML = ''
		  }
		const btn = document.getElementById('checkout')
	
		showFlash();
		setTimeout(hideFlash, 1000);

		  
	}

	
	else if (pricing > 0){
		document.getElementById('checkout').href = '/createCustOrder'

		

	}
}

function alert_discount(){
	document.querySelector('#alert-discount').textContent = ''
}

function Discount_expired(){
	document.querySelector('#alert-discount').textContent = 'Code has Expired'

	const timer = setTimeout(alert_discount,1000)
}




const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const countTotalItem = function (){
	let sum = 0
	productsInCart.forEach(item => {
		sum += item.count;
	})
	return sum
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
			
            
			
			
		<div class="card mb-3 " style="max-width: 1540px;">
			<div class="row g-0">
				<div class="col-md-2 col-sm-4">
					<div class="aside"><img src="${product.image}"></div>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="card-body">
						<figcaption class="info">
							<a href="#" class="title text-dark">${product.name}</a>

						</figcaption>
						<p class="text-muted small">Size: XL, Color: blue, <br> Brand: Gucci</p>
						<div class='qnty'>
							<i class="fas fa-minus minus mr-2" data-id=${product.id} type='button'></i>
							
							
							<span class="countOfProduct">${product.count}</span>
							
							<i class="fas fa-plus plus ml-2" data-id=${product.id} type='button'></i>
							
							
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-2">
					<div class="card-body">
						<figcaption class="info">
							<a href="#" class="title text-dark">Unit Price</a>
						</figcaption>
						<div class=""> 
							<var class="price">$${product.basePrice}</var>
						</div>
						
					</div>
				</div>
				<div class="col-md-3 col-sm-2">
					<div class="card-body">
					<figcaption class="info">
							<a href="#" class="title text-dark">Sub-Total</a>
						</figcaption>
						<div class=""> 
							<var class="price">$${product.price}</var>
						</div>
						
					</div>
					
				</div>
				<div class='col-12'style='height:70px; margin-left:20px;'>
					<div class="card-body float-right">
						<div> 
							<button type='button' class="btn btn-danger delete" data-id=${product.id}>Remove</button>
						</div>
					</div>
				</div>
			</div>
		</div>
			
        	`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		
		cartItemNumber.innerHTML = countTotalItem();
		// cartSumPrice.innerHTML = '$' + countTheSumPrice();
			
		
			
	}
	else if (productsInCart.length <= 0) {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty!</h4>';
		cartSumPrice.innerHTML = '';
		cartItemNumber.innerHTML = '';
	 
		
	}
	
}

function updateProductsInCart(product) { // 2
	
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			
			
			return;
		}
	}
	
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	
	item.addEventListener('click', (e) => {
		
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count:1,
				price: +productPrice,
				basePrice: productPrice,
				
			}
			
			updateProductsInCart(product);
			updateShoppingCartHTML();
			
			
		}
		// alert("Item added to cart!"); // Pop up when click on add to cart
		
	});
	
});





parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('plus');
	const isMinusButton = e.target.classList.contains('minus');
	const isDeleteButton = e.target.classList.contains('delete');
	if (isPlusButton || isMinusButton || isDeleteButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1

					productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

					AddtoCart(productsInCart[i])
					
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1

					productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

					MinusCart(productsInCart[i])
				}
				else if (isDeleteButton){
					productsInCart[i].count = 0
				
					productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
				
					Deleteitem(productsInCart[i])
				}
				
				
			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i,1); //The splice() method adds and/or removes array elements
			}
			getCartSum()
			
		}
		updateShoppingCartHTML();
		
	
	}
});

updateShoppingCartHTML();

function AddtoCart(product){
	console.log('add')
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			if (productsInCart[i].count > 1) {
				fetch('/createCustOrder',{
					method:'POST',
					body: JSON.stringify({
						function:'plus',product_name : product.name, product_price: product.basePrice, product_qty : product.count
					}),
					cache: 'no-cache',
					headers: new Headers({
						'content-type': 'application/json'
					})
				})
				
			}
			else if (productsInCart[i].count == 1){
				fetch('/createCustOrder',{
					method:'POST',
					body: JSON.stringify({
						function:'add',product_name : product.name, product_price: product.basePrice, product_qty : product.count
					}),
					cache: 'no-cache',
					headers: new Headers({
						'content-type': 'application/json'
					})
				})
				
			}
		}
	}
}

function MinusCart(productsInCart){
	fetch('/createCustOrder',{
		method:'POST',
		body: JSON.stringify({
			function:'minus',product_name : productsInCart.name, product_price: productsInCart.basePrice, product_qty : productsInCart.count
		}),
		cache: 'no-cache',
		headers: new Headers({
			'content-type': 'application/json'
		})
	})

}

function Deleteitem(productsInCart){
	fetch('/createCustOrder',{
		method:'POST',
		body: JSON.stringify({
			function:'delete',product_name :productsInCart.name, product_price: productsInCart.price, product_qty : productsInCart.count
		}),
		cache: 'no-cache',
		headers: new Headers({
			'content-type': 'application/json'
		})
	
	})
}