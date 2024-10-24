// ====Localstorage
//traer productos localstorage
export const handleGetProductLocalStorage = ()=>{
    const products = JSON.parse(localStorage.getItem("products"));
    if (products){
        return products;
    } else {
        return [];
    }
};

//guardar en localstorage

//recibir un producto
export const setInLocalStorage = (productIn)=>{
    //traer los elementos
    let productsInLocal = handleGetProductLocalStorage();
    const existingIndex = productsInLocal.findIndex(
        (productsLocal)=> productsLocal.id == productIn.id
)
//verificar si el elmetnos existe
if(existingIndex != -1){
    //si existe debe reemplazarse
productsInLocal[existingIndex] = productIn;

} else{
    //si no agregarlo
    productsInLocal.push(productIn);
    }
    //setear nuevo array
localStorage.setItem("products", JSON.stringify(productsInLocal));  
};