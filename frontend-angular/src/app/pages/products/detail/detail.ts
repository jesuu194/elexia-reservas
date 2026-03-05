import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, ProductModel } from '../../../services/product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  product = signal<ProductModel | null>(null);
  loading = signal(false);
  error = signal('');
  id: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading.set(true);
      this.productService.getById(this.id).subscribe({
        next: (prod) => {
          this.product.set(prod);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el producto');
          this.loading.set(false);
        }
      });
    }
  }

  salesPitch(product: ProductModel | null): string {
    if (!product) return '';

    const map: Record<string, string> = {
      'Agente de Voz Basico': 'Perfecto para equipos que necesitan captar reservas aun cuando el local esta cerrado.',
      'Agente de Voz Premium': 'Diseñado para cerrar operaciones de mayor ticket con menos friccion comercial.',
      'Chatbot FAQ Inteligente': 'Acelera respuestas y reduce abandono antes de la reserva.',
      'Chatbot Ventas IA': 'Orientado a conversion con mensajes que guian al cierre.',
      'Bot WhatsApp Reservas': 'Canal directo para vender por WhatsApp sin saturar a tu equipo.',
      'Automatizacion Recordatorios': 'Protege ingresos minimizando no-shows y cancelaciones de ultima hora.',
      'Integracion Calendario IA': 'Coordina disponibilidad en tiempo real para mejorar experiencia del cliente.',
      'Panel Analitico de Reservas': 'Convierte datos en decisiones para subir conversion semanal.',
      'Asistente Omnicanal': 'Una unica experiencia de reservas en todos tus canales de atencion.',
      'Suite Conversacional Negocios': 'La opcion mas completa para escalar reservas con un sistema conectado.'
    };

    return map[product.nombre] || product.descripcion || 'Solucion pensada para vender mas con IA.';
  }

  urgencyText(stock = 0): string {
    if (stock <= 30) return 'Quedan pocas plazas de implementacion esta semana.';
    if (stock <= 55) return 'Alta demanda: activa este servicio antes que tu competencia.';
    return 'Disponible para implementacion inmediata.';
  }
}
