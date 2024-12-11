import {
  Component,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ConversaoService } from '../service/conversao.service';
import { TaxaResposta } from '../models/moedas';

@Component({
  selector: 'app-coversao-moeda',
  templateUrl: './coversao-moeda.component.html',
  styleUrls: ['./coversao-moeda.component.scss'],
})
export class CoversaoMoedaComponent implements OnInit {
  quantia: number = 0;
  quantiaConvertida: number = 0;
  moedaOrigem: string = 'BRL';
  moedaDestino: string = 'USD';
  taxas: { [key: string]: number } = {};
  moedas: any[] = [];
  historico: any[] = [];
  dadosTaxas: WritableSignal<TaxaResposta | undefined> = signal(undefined);

  constructor(private serviceMoeda: ConversaoService) {}

  ngOnInit(): void {
    this.carregarTaxas();
  }

  carregarTaxas() {
    this.serviceMoeda
      .obterTaxas(this.moedaOrigem)
      .subscribe((resposta: any) => {
        if (resposta && resposta.conversion_rates) {
          this.dadosTaxas.set(resposta as TaxaResposta);
          this.taxas = resposta.conversion_rates;

          this.moedas = Object.keys(this.taxas).map((moeda) => ({
            label: moeda,
            value: moeda,
          }));
        } else {
          console.error('Resposta inválida da API:', resposta);
        }
      });
  }

  converter() {
    if (!this.taxas[this.moedaDestino]) {
      alert('Taxa de câmbio para a moeda de destino não encontrada.');
      return;
    }

    this.quantiaConvertida = this.quantia * this.taxas[this.moedaDestino];

    this.historico.unshift({
      data: new Date().toLocaleString(),
      moedaOrigem: this.moedaOrigem,
      moedaDestino: this.moedaDestino,
      quantia: this.quantia,
      quantiaConvertida: this.quantiaConvertida,
    });
  }
}
