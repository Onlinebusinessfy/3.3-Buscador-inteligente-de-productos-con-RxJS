import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearchComponent {

  private productosService = inject(ProductosService);
  private destroyRef = inject(DestroyRef);

  // Campo de búsqueda.
  busqueda = new FormControl('', { nonNullable: true });

  constructor() {

    // Espera 300 milisegundos antes de buscar.
    this.busqueda.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(termino => {
      this.productosService.setBusqueda(termino);
    });

  }

  // Cambiar categoría.
  cambiarCategoria(categoria: string): void {
    this.productosService.setCategoria(categoria);
  }

  // Cambiar orden de precios.
  cambiarOrden(orden: string): void {
    this.productosService.setOrden(orden);
  }

}
