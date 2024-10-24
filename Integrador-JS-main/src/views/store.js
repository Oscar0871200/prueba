//==== Store ====

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";

//funcion que se encarga de traer los elementos y llamar al render
export const handleGetProductsToStore = ()=>{
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};

//se encarga de filtrar y renderizar la seccion con todos sus respectivos elementos
export const handleRenderList = (productosIn) =>{
    //filtrado de arrays por categoria
    const burgers = productosIn.filter((el) => el.categories == "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories == "Papas");
    const gaseosas = productosIn.filter((el) => el.categories == "Gaseosas");
    //funcion que renderiza los elementos de la seccion

    const renderProductGroup = (productos, title)=>{
        console.log("Productos a renderizar en", title, productos); // Aquí verificamos qué productos se están renderizando
        if (productos.length >0){
        const productosHTML = productos.map((producto, index)=>{
            return`<div class="containerTargetItem" id="product-${producto.categories}-${producto.id}">
            <div>
            <img src="${producto.imagen}"/>
            <div >
            <h2>${producto.nombre}</h2>
            </div>
            <div class="targetProps">
            <p><b>Precio:</b>  ${producto.precio}</p>
            </div>
            </div>
            </div>`;
        });
        //retorna la seccion con todos los elementos dentro
        return `
        <section class="sectionStore">
        <div class="containerTitleSection">
        <h3>${title}</h3>
        </div>
        <div class="containerProductStore">
        ${productosHTML.join("")}
        </div>
        </section>
        `;
    } else {
        return "";
    }
    };

    //renderizar cada uno de los productos dentro de su categoría
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${renderProductGroup(burgers,"Hamburguesas")}
    ${renderProductGroup(papas,"Papas")}
    ${renderProductGroup(gaseosas,"Gaseosas")}
    `;
    //añaden los eventos de manera dinamica
    const addEvents = (productsIn) =>{
        productosIn.forEach((element, index) => {const productContainer = document.getElementById(`product-${element.categories}-${element.id}`);
        if(productContainer){        
        productContainer.addEventListener("click", ()=>{
                    setProductoActivo(element);
                    openModal();
                });
            }else {console.warn(`No se encontró el contenedor con ID: product-${element.categories}-${element.id}`);}
        });
    };


        addEvents(burgers);
        addEvents(papas);
        addEvents(gaseosas);

    

    

};

