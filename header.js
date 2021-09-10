function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot) => {
    // onsnapshot -> Web Socket
        let totalCount = 0;
        snapshot.docs.forEach((doc) =>{
            totalCount += doc.data().quantity;
        })
        // console.log(totalCount);
        setCartCounter(totalCount);
    })
}
function setCartCounter(totalCount){
    document.querySelector(".cart-item-number").innerText = totalCount;
}

getCartItems();
