document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.getElementById('productos-dinamicos');
    const carritoIcono = document.getElementById('carrito-icono');
    const carritoContador = document.getElementById('carrito-contador');

    
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        if (carritoContador) {
            carritoContador.textContent = totalItems;
            carritoContador.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    function crearProductoHTML(producto) {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');

        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-descripcion">
                <span>${producto.categoria}</span>
                <h5>${producto.descripcion}</h5>
                <h4>$${producto.precio.toFixed(2)}</h4>
            </div>
            <a href="#" class="carrito añadir-al-carrito" data-id="${producto.id}">
                <i class="fal fa-shopping-cart"></i>
            </a>
        `;
        return divProducto;
    }

    fetch('/script/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - No se pudo cargar el archivo de productos.`);
            }
            return response.json();
        })
        .then(productos => {
            productos.forEach(producto => {
                contenedorProductos.appendChild(crearProductoHTML(producto));
            });

            document.querySelectorAll('.añadir-al-carrito').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const productId = parseInt(event.currentTarget.dataset.id);
                    const productoSeleccionado = productos.find(p => p.id === productId);
                    if (productoSeleccionado) {
                        añadirProductoAlCarrito(productoSeleccionado);
                    }
                });
            });
            actualizarContadorCarrito();
        })
        .catch(error => {
            console.error('Hubo un problema al cargar los productos:', error);
            contenedorProductos.innerHTML = '<p>Lo sentimos, no pudimos cargar los productos en este momento...</p>';
        });


    function añadirProductoAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        alert(`"${producto.nombre}" se agrego al carrito.`);
    }
});