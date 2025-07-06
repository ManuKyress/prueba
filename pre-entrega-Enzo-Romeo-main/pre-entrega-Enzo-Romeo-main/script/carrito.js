document.addEventListener('DOMContentLoaded', () => {
    const tablaCarrito = document.getElementById('cuerpo-tabla-carrito');
    const subtotalElement = document.getElementById('subtotal-carrito');
    const totalElement = document.getElementById('total-carrito');

    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function renderizarCarrito() {
        const carrito = obtenerCarrito();
        tablaCarrito.innerHTML = '';

        let subtotal = 0;

        if (carrito.length === 0) {
            tablaCarrito.innerHTML = '<tr><td colspan="5">Tu carrito esta vacio.</td></tr>';
            subtotalElement.textContent = '$0.00';
            totalElement.textContent = '$0.00';
            return;
        }

        carrito.forEach(item => {
            const row = document.createElement('tr');
            const precioTotalItem = item.precio * item.cantidad;
            subtotal += precioTotalItem;

            row.innerHTML = `
                <td><a href="#" class="eliminar-item" data-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.imagen}" alt="${item.nombre}"></td>
                <td>${item.nombre}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td><input type="number" value="${item.cantidad}" min="1" class="cantidad-input" data-id="${item.id}"></td>
                <td>$${precioTotalItem.toFixed(2)}</td>
            `;
            tablaCarrito.appendChild(row);
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;

        document.querySelectorAll('.eliminar-item').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const productId = parseInt(event.currentTarget.dataset.id);
                eliminarProductoDelCarrito(productId);
            });
        });

        document.querySelectorAll('.cantidad-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const productId = parseInt(event.currentTarget.dataset.id);
                const nuevaCantidad = parseInt(event.currentTarget.value);
                if (nuevaCantidad > 0) {
                    actualizarCantidadProducto(productId, nuevaCantidad);
                } else {
                    eliminarProductoDelCarrito(productId);
                }
            });
        });
    }

    function eliminarProductoDelCarrito(id) {
        let carrito = obtenerCarrito();
        carrito = carrito.filter(item => item.id !== id);
        guardarCarrito(carrito);
        renderizarCarrito();
        actualizarContadorCarritoPrincipal();
        alert('Producto eliminado del carrito.');
    }

    function actualizarCantidadProducto(id, nuevaCantidad) {
        let carrito = obtenerCarrito();
        const item = carrito.find(p => p.id === id);
        if (item) {
            item.cantidad = nuevaCantidad;
            guardarCarrito(carrito);
            renderizarCarrito();
            actualizarContadorCarritoPrincipal();
        }
    }

    function actualizarContadorCarritoPrincipal() {
        const carritoContador = document.getElementById('carrito-contador');
        if (carritoContador) {
            const carrito = obtenerCarrito();
            const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            carritoContador.textContent = totalItems;
            carritoContador.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    renderizarCarrito();
    actualizarContadorCarritoPrincipal();
});