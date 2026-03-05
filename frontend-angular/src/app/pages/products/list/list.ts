import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, ProductModel } from '../../../services/product';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  products = signal<ProductModel[]>([]);
  total = signal(0);
  page = signal(1);
  limit = 10;
  loading = signal(false);
  error = signal('');

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading.set(true);
    this.error.set('');
    this.productService.getAll(this.page(), this.limit).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar productos');
        this.loading.set(false);
      }
    });
  }

  nextPage() {
    if (this.page() * this.limit < this.total()) {
      this.page.set(this.page() + 1);
      this.fetchProducts();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
      this.fetchProducts();
    }
  }

  marketingDescription(product: ProductModel): string {
    const map: Record<string, string> = {
      'Agente de Voz Basico': 'Atiende llamadas 24/7 y confirma reservas sin perder oportunidades fuera de horario.',
      'Agente de Voz Premium': 'Cierra reservas con guion avanzado, objeciones y transferencia inteligente a tu equipo.',
      'Chatbot FAQ Inteligente': 'Responde dudas al instante y lleva al cliente directo al paso de reservar.',
      'Chatbot Ventas IA': 'Convierte conversaciones en reservas con mensajes orientados a cierre.',
      'Bot WhatsApp Reservas': 'Captura reservas desde WhatsApp en menos de 1 minuto por cliente.',
      'Automatizacion Recordatorios': 'Reduce ausencias enviando recordatorios y reprogramaciones automaticas.',
      'Integracion Calendario IA': 'Sincroniza cupos en tiempo real para evitar sobreventas o huecos vacios.',
      'Panel Analitico de Reservas': 'Visualiza conversion, canales top y horas pico para vender mas.',
      'Asistente Omnicanal': 'Unifica web, telefono y mensajeria para no perder ningun lead.',
      'Suite Conversacional Negocios': 'Solucion completa para escalar ventas y reservas de forma automatizada.'
    };

    return this.stripIaToken(map[product.nombre] || product.descripcion || 'Servicio para acelerar reservas y conversion.');
  }

  marketingBenefit(product: ProductModel): string {
    if (product.precio >= 350) return 'Ideal para equipos que quieren escalar resultados rapido';
    if (product.precio >= 220) return 'Equilibrio entre coste y conversion para crecer sin friccion';
    return 'Entrada rapida para digitalizar reservas desde hoy';
  }

  demandLabel(stock: number): string {
    if (stock <= 35) return 'Alta demanda';
    if (stock <= 55) return 'Muy solicitado';
    return 'Disponible ahora';
  }

  productLabel(name = ''): string {
    return this.stripIaToken(name);
  }

  private stripIaToken(value = ''): string {
    return value.replace(/\bIA\b/g, '').replace(/\s{2,}/g, ' ').trim();
  }
}
