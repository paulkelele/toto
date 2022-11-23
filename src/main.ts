import { enableProdMode,importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
 import { RouterModule } from '@angular/router';
import { routes } from './app/app-routing';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// pour enregistrer les locales en francais
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent,{
  providers:[
    importProvidersFrom(
      RouterModule.forRoot(routes,{useHash:true}), 
      BrowserAnimationsModule,
      HttpClientModule),
      { provide: LOCALE_ID, useValue: "fr-FR" }
    ]
})

 