import { Component, OnInit } from '@angular/core';
import { CitationsService } from './../../service/citations.service';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.component.html',
  styleUrls: ['./citations.component.css']
})
export class CitationsComponent implements OnInit {
  intervalId: number;
  citation = '...';

  constructor(private citationsService: CitationsService) { }

  ngOnInit(): void {
    this.citationsService.getData().then(citation =>{ 
      console.log("citation", citation);
      this.citation = citation
    }); // (?)TypeError: this.citationsService.getQuote is not a function

    // En général, les tests ne doivent pas faire appel à des serveurs distants. Ils devraient imiter ces appels
  }

}