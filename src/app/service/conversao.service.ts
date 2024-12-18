import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConversaoService {
  private apiUrl =
    'https://v6.exchangerate-api.com/v6/48c6b6d0594a79850a741ec5/latest/';

  constructor(private http: HttpClient) {}

  obterMoedas(moedaOrigem: string): Observable<{ label: string; value: string }[]> {
    return this.http.get(`${this.apiUrl}${moedaOrigem}`).pipe(
      map((resposta: any) => {
        if (!resposta || !resposta.conversion_rates) {
          throw new Error('Resposta inválida da API.');
        }

        const moedas = Object.keys(resposta.conversion_rates).map((moeda) => ({
          label: moeda,
          value: moeda,
        }));

        return moedas;
      }),
      catchError((error) => {
        console.error('Erro ao obter moedas:', error);
        return of([]);
      })
    );
  }

  obterTaxas(moedaOrigem: string): Observable<{ [key: string]: number }> {
    return this.http.get(`${this.apiUrl}${moedaOrigem}`).pipe(
      map((resposta: any) => {
        if (!resposta || !resposta.conversion_rates) {
          throw new Error('Resposta inválida da API.');
        }

        return resposta.conversion_rates;
      }),
      catchError((error) => {
        console.error('Erro ao obter taxas:', error);
        return of({});
      })
    );
  }
}
