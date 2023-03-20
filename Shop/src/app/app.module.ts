import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgToastModule } from 'ng-angular-popup';
import { ProductComponent } from './component/product/product.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { FilterPipe } from './shared/filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        ProductComponent,
        CartComponent,
        HeaderComponent,
        FilterPipe,
    ],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgToastModule,
        NgbModule,
       

        
        
    ]
})
export class AppModule { }
