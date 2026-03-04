import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type BotMessage = {
  role: 'bot' | 'user';
  text: string;
};

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss'
})
export class Chatbot {
  isOpen = signal(false);
  input = signal('');
  messages = signal<BotMessage[]>([
    {
      role: 'bot',
      text: 'Hola, soy Elexia Bot. Te muestro como automatizamos reservas para cualquier negocio.'
    }
  ]);

  quickReplies = [
    'Quiero automatizar un restaurante',
    'Necesito agenda para clinica',
    'Busco reservas para gimnasio',
    'Quiero una demo para mi negocio'
  ];

  headerStatus = computed(() => (this.isOpen() ? 'En linea' : 'Disponible'));

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  sendQuickReply(text: string) {
    this.pushUserMessage(text);
    this.pushBotReply(text);
  }

  sendInputMessage() {
    const text = this.input().trim();
    if (!text) return;
    this.pushUserMessage(text);
    this.pushBotReply(text);
    this.input.set('');
  }

  private pushUserMessage(text: string) {
    this.messages.update((prev) => [...prev, { role: 'user', text }]);
  }

  private pushBotReply(userText: string) {
    const normalized = userText.toLowerCase();
    let reply =
      'Perfecto. En Elexia conectamos WhatsApp, web y llamadas para gestionar reservas, confirmaciones y recordatorios automaticos.';

    if (normalized.includes('restaurante')) {
      reply =
        'Para restaurantes automatizamos reservas de mesas, recordatorios y reasignacion de turnos sin llamadas manuales.';
    } else if (normalized.includes('clinica')) {
      reply =
        'Para clinicas gestionamos citas, recordatorios y reprogramaciones con flujos seguros y confirmacion inmediata.';
    } else if (normalized.includes('gimnasio')) {
      reply =
        'Para gimnasios automatizamos clases, cupos y renovaciones con notificaciones inteligentes.';
    } else if (normalized.includes('demo')) {
      reply =
        'Te podemos montar una demo en 48 horas con tu marca y tus reglas de negocio para validar resultados.';
    }

    this.messages.update((prev) => [...prev, { role: 'bot', text: reply }]);
  }
}
