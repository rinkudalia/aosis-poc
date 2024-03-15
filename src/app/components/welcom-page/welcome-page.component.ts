import { Token } from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import { AosisMappingService } from '@app/services/aosis-mapping.service';
import { TokenDto } from '@app/types/token-dto';
import { take } from 'rxjs/operators';
@Component({  
  selector: 'welcome-page',
  templateUrl: `./welcome-page.component.html`,
  styleUrl: `./welcome-page.component.scss`
})
export class WelcomePageComponent implements OnInit {

  welcomeMessage: string = '';
  tokenMessage: TokenDto = {
      expires: '',
      ssl: false,
      token: ''
  };
  constructor(private aosisMappingService: AosisMappingService) { }

  ngOnInit(): void {
    this.getWelcomeData();
  }

  getWelcomeData() {
    this.aosisMappingService.getWelcomePage()
    .pipe((take(1)))
      .subscribe({
        next: (response: any) =>{
            this.welcomeMessage = response;
            console.log(response);
            return response;
        },
        error: (e: any) => {
          console.error('Error reading the json file.', e);
          return e;
        },
        complete: () => console.info('complete') 
      });
  }

  getToken() {
    this.aosisMappingService.getToken()
    .pipe((take(1)))
      .subscribe({
        next: (response: TokenDto) =>{
            this.tokenMessage = response;
            console.log(response);
            return response;
        },
        error: (e: any) => {
          console.error('Error reading the json file.', e);
          return e;
        },
        complete: () => console.info('complete') 
      });
  }

  getQueryAllWell() {
    this.aosisMappingService.getQueryAllWell()
    .pipe((take(1)))
      .subscribe({
        next: (response: any) =>{
            console.log(response.layers[0].fields);
            console.log(response);
            return response;
        },
        error: (e: any) => {
          console.error('Error reading the json file.', e);
          return e;
        },
        complete: () => console.info('complete') 
      });
  }
}