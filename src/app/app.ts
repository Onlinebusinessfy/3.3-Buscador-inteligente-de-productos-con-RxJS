import { Component } from '@angular/core';

import { HeaderComponent } from './components/header/header';
import { SidebarComponent } from './components/sidebar/sidebar';
import { ProductSearchComponent } from './components/product-search/product-search';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductFormComponent } from './components/product-form/product-form';
import { StatisticsComponent } from './components/statistics/statistics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    ProductSearchComponent,
    ProductListComponent,
    ProductFormComponent,
    StatisticsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}