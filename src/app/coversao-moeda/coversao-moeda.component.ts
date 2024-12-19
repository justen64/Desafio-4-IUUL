import { Component, OnInit } from '@angular/core';
import { ConversaoService } from '../service/conversao.service';

@Component({
  selector: 'app-coversao-moeda',
  templateUrl: './coversao-moeda.component.html',
  styleUrls: ['./coversao-moeda.component.scss'],
})
export class CoversaoMoedaComponent implements OnInit {
  quantia: number = 0;
  quantiaConvertida: number = 0;
  quantiaCalculada: number = 0
  moedaOrigem: string = 'USD';
  moedaDestino: string = 'BRL';
  taxas: { [key: string]: number } = {};
  moedas: { label: string; value: string }[] = [];
  historico: any[] = [];

  constructor(private conversaoService: ConversaoService) {}

  ngOnInit(): void {
    this.carregarMoedas();
    this.carregarTaxas(this.moedaOrigem);
  }

  carregarMoedas() {
    this.conversaoService.obterMoedas(this.moedaOrigem).subscribe((moedas) => {
      this.moedas = moedas;
    });
  }

  carregarTaxas(base: string) {
    this.conversaoService.obterTaxas(base).subscribe((taxas) => {
      this.taxas = taxas;
    });
  }

  converter() {
    const taxaOrigem = this.taxas[this.moedaOrigem];
    const taxaDestino = this.taxas[this.moedaDestino];
  
    if (!taxaOrigem || !taxaDestino) {
      alert('Taxa de câmbio não encontrada para a moeda selecionada.');
      return;
    }
  
    this.quantiaCalculada = this.quantia;
  
    const taxaConversao = taxaDestino / taxaOrigem;
  
    this.quantiaConvertida = this.quantia * taxaConversao;
  
    this.historico.unshift({
      id: Date.now(),
      data: new Date().toLocaleString(),
      moedaOrigem: this.moedaOrigem,
      moedaDestino: this.moedaDestino,
      quantia: this.quantia,
      quantiaConvertida: this.quantiaConvertida,
      taxa: taxaConversao
    });
  }
  
  
  excluirHistoricoPorId(id: number): void {
    this.historico = this.historico.filter(item => item.id !== id);
  }
  
  
}
