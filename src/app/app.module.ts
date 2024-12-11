import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoversaoMoedaComponent } from './coversao-moeda/coversao-moeda.component';

import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Menubar } from 'primeng/menubar';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

@NgModule({
  declarations: [AppComponent, CoversaoMoedaComponent, NavBarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    Menubar,
  ],
  providers: [
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
