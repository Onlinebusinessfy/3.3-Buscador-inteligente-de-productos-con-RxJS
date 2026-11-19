
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // Productos iniciales del catálogo.
  private productosIniciales: Producto[] = [
    { id: 1, nombre: 'Audífonos Bluetooth', categoria: 'Tecnología', precio: 850, descripcion: 'Audífonos inalámbricos.', imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { id: 2, nombre: 'Laptop Lenovo', categoria: 'Tecnología', precio: 12500, descripcion: 'Laptop para trabajo y estudio.', imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500' },
    { id: 3, nombre: 'Smartphone Samsung', categoria: 'Tecnología', precio: 9500, descripcion: 'Teléfono inteligente.', imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500' },
    { id: 4, nombre: 'Teclado Mecánico', categoria: 'Tecnología', precio: 1200, descripcion: 'Teclado para computadora.', imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
    { id: 5, nombre: 'Mouse Gamer', categoria: 'Tecnología', precio: 650, descripcion: 'Mouse de alta precisión.', imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500' },
    { id: 6, nombre: 'Monitor HD', categoria: 'Tecnología', precio: 4200, descripcion: 'Monitor de alta resolución.', imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
    { id: 7, nombre: 'Bocina Bluetooth', categoria: 'Tecnología', precio: 1100, descripcion: 'Bocina portátil.', imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500' },
    { id: 8, nombre: 'Smartwatch', categoria: 'Tecnología', precio: 1800, descripcion: 'Reloj inteligente.', imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
    { id: 9, nombre: 'Playera Casual', categoria: 'Ropa', precio: 250, descripcion: 'Playera cómoda.', imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
    { id: 10, nombre: 'Sudadera', categoria: 'Ropa', precio: 650, descripcion: 'Sudadera de algodón.', imagen: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
    { id: 11, nombre: 'Tenis Deportivos', categoria: 'Ropa', precio: 1400, descripcion: 'Calzado cómodo.', imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { id: 12, nombre: 'Gorra', categoria: 'Ropa', precio: 300, descripcion: 'Gorra ajustable.', imagen: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500' },
    { id: 13, nombre: 'Mochila', categoria: 'Ropa', precio: 750, descripcion: 'Mochila para uso diario.', imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
    { id: 14, nombre: 'Lámpara de Mesa', categoria: 'Hogar', precio: 500, descripcion: 'Iluminación moderna.', imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500' },
    { id: 15, nombre: 'Silla Moderna', categoria: 'Hogar', precio: 2200, descripcion: 'Silla para oficina.', imagen: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500' },
    { id: 16, nombre: 'Cafetera', categoria: 'Hogar', precio: 900, descripcion: 'Prepara café fácilmente.', imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500' },
    { id: 17, nombre: 'Reloj de Pared', categoria: 'Hogar', precio: 400, descripcion: 'Reloj decorativo.', imagen: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500' },
    { id: 18, nombre: 'Balón de Fútbol', categoria: 'Deportes', precio: 450, descripcion: 'Balón para entrenamiento.', imagen: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500' },
    { id: 19, nombre: 'Mancuernas', categoria: 'Deportes', precio: 800, descripcion: 'Equipo para ejercicio.', imagen: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500' },
    { id: 20, nombre: 'Bicicleta', categoria: 'Deportes', precio: 6500, descripcion: 'Bicicleta para exteriores.', imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500' }
  ];

  // Colección compartida.
  private productosSubject = new BehaviorSubject<Producto[]>(
    this.productosIniciales
  );

  // Observable para los demás componentes.
  productos$ = this.productosSubject.asObservable();

  // Flujos de búsqueda y filtros.
  private busquedaSubject = new BehaviorSubject<string>('');
  private categoriaSubject = new BehaviorSubject<string>('Todas');

  private ordenSubject = new BehaviorSubject<
    'ninguno' | 'menor' | 'mayor'
  >('ninguno');

  // Observable que combina productos, búsqueda y filtros.
  productosFiltrados$ = combineLatest({
    productos: this.productos$,
    busqueda: this.busquedaSubject,
    categoria: this.categoriaSubject,
    orden: this.ordenSubject
  }).pipe(

    map(({ productos, busqueda, categoria, orden }) => {

      let resultado = [...productos];

      // Buscar por nombre.
      if (busqueda.trim()) {
        resultado = resultado.filter(producto =>
          producto.nombre.toLowerCase().includes(
            busqueda.toLowerCase().trim()
          )
        );
      }

      // Filtrar por categoría.
      if (categoria !== 'Todas') {
        resultado = resultado.filter(
          producto => producto.categoria === categoria
        );
      }

      // Ordenar por precio.
      if (orden === 'menor') {
        resultado.sort((a, b) => a.precio - b.precio);
      }

      if (orden === 'mayor') {
        resultado.sort((a, b) => b.precio - a.precio);
      }

      return resultado;
    })
  );

  // Actualizar búsqueda.
  setBusqueda(termino: string): void {
    this.busquedaSubject.next(termino);
  }

  // Actualizar categoría.
  setCategoria(categoria: string): void {
    this.categoriaSubject.next(categoria);
  }

  // Actualizar ordenamiento.
  setOrden(orden: string): void {
    if (
      orden === 'ninguno' ||
      orden === 'menor' ||
      orden === 'mayor'
    ) {
      this.ordenSubject.next(orden);
    }
  }


  // Consultar productos actuales.
  obtenerProductos(): Producto[] {
    return this.productosSubject.value;
  }

  // Agregar un producto.
  agregarProducto(producto: Producto): void {
    const productos = this.obtenerProductos();

    this.productosSubject.next([
      ...productos,
      producto
    ]);
  }

  // Eliminar un producto.
  eliminarProducto(id: number): void {
    const productos = this.obtenerProductos();

    this.productosSubject.next(
      productos.filter(producto => producto.id !== id)
    );
  }
}
