import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { map } from 'rxjs';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class StatisticsComponent {

  private productosService = inject(ProductosService);

  // Calcular estadísticas cada vez que cambia la colección.
  estadisticas$ = this.productosService.productos$.pipe(

    map(productos => {

      const total = productos.length;

      // Obtener los precios.
      const precios = productos.map(producto => producto.precio);

      // Calcular el promedio mediante reduce().
      const suma = precios.reduce(
        (acumulado, precio) => acumulado + precio,
        0
      );

      const promedio = total > 0 ? suma / total : 0;

      // Obtener precio mínimo y máximo.
      const minimo = total > 0 ? Math.min(...precios) : 0;
      const maximo = total > 0 ? Math.max(...precios) : 0;

      return {
        total,
        promedio,
        minimo,
        maximo
      };

    })

  );

}
