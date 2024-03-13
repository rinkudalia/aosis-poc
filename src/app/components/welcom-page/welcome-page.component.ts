import {Component, OnInit} from '@angular/core';
import { AosisMappingService } from '@app/services/aosis-mapping.service';
import { take } from 'rxjs/operators';
@Component({  
  selector: 'welcome-page',
  templateUrl: `./welcome-page.component.html`,
  styleUrl: `./welcome-page.component.scss`
})
export class WelcomePageComponent implements OnInit {

  welcomeMessage: string = '';
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
}