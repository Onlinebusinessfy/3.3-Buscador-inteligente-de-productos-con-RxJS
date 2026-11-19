
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent {

  private fb = inject(FormBuilder);
  private productosService = inject(ProductosService);

  formulario = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    categoria: ['Tecnología', Validators.required],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    descripcion: ['', Validators.required],
    imagen: ['']
  });

  mensaje = '';

  registrarProducto(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensaje = 'Completa correctamente todos los campos.';
      return;
    }

    const datos = this.formulario.getRawValue();

    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      precio: datos.precio,
      descripcion: datos.descripcion.trim(),
      imagen: datos.imagen.trim()
    };

    this.productosService.agregarProducto(nuevoProducto);

    // Limpiar todos los campos después del registro.
    this.formulario.reset({
      nombre: '',
      categoria: 'Tecnología',
      precio: 0,
      descripcion: '',
      imagen: ''
    });

    this.mensaje = '¡Producto registrado correctamente!';
  }
}
