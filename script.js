function getItems() {
    db.collection("items").get().then((querySnapshot) => {
        // console.log(querySnapshot);
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id, //ID get generated from Firebase itself. (no need 2 'data()' )
                image: doc.data().image,
                make: doc.data().make,
                name: doc.data().name,
                rating: doc.data().rating,
                price: doc.data().price
            })
        });
        generateItems(items);
    });
}

function addToCart(item){
    // console.log("Add to Cart Clicked!");
    // console.log(item);
    // Cheking items above ^
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity +1
            })
        }
        else {
            cartItem.set({
                image: item.image,
                make: item.make,
                name: item.name,
                rating: item.rating,
                price: item.price,
                quantity: 1
            })
        }
    })
    
}

function generateItems(items) {
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement('div');
        doc.classList.add('main-product', 'mr-5');
        doc.innerHTML = `
                <div class="product-image w-48 h-52 bg-white rounded-lg">
                    <!-- img -->
                    <img class="w-full h-full object-contain p-4"
                        src="${item.image}" alt="">
                </div>
                <div class="product-name text-gray-700 font-bold mt-3 text-sm">
                    ${item.name}
                </div>
                <div class="product-make text-gray-700">
                    ${item.make}
                </div>
                <div class="product,-rating text-yellow-400 font-bold my-1">
                    ⭐⭐⭐⭐⭐ ${item.rating}
                </div>
                <div class="product-price font-semibold text-gray-700 text-lg">
                    ${numeral(item.price).format('$0,0.00')}
                </div>
        `
        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("hover:bg-yellow-600", "mt-2", "cursor-pointer", 
            "text-md", "rounded", "text-white", "flex", "items-center", "justify-center", 
            "add-to-cart", "h-8", "w-28", "bg-yellow-500");
            addToCartEl.innerText = "Add to cart";
            addToCartEl.addEventListener("click", function(){
                addToCart(item);
            })
            doc.appendChild(addToCartEl);
            document.querySelector(".main-section-product").appendChild(doc);
    })
}
getItems();