import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {

  private productosService = inject(ProductosService);

  productos$ = this.productosService.productosFiltrados$;

  eliminarProducto(id: number): void {
    const confirmar = confirm(
      '¿Estás seguro de que deseas eliminar este producto?'
    );

    if (confirmar) {
      this.productosService.eliminarProducto(id);
    }
  }
}
