import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxaResposta } from '../models/moedas';

@Injectable({
  providedIn: 'root',
})
export class ConversaoService {
  private apiUrl =
    'https://v6.exchangerate-api.com/v6/48c6b6d0594a79850a741ec5/latest/';

  constructor(private http: HttpClient) {}

  obterTaxas(moedaOrigem: string): Observable<Partial<TaxaResposta>> {
    return this.http.get(`${this.apiUrl}${moedaOrigem}`);
  }
}
