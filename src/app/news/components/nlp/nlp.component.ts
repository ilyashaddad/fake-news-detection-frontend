import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-nlp',
  templateUrl: './nlp.component.html',
  styleUrls: ['./nlp.component.scss']
})
export class NLPComponent implements OnInit {
  data: any;
  request: string = '';
  method: string = '';

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private NewsService: NewsService) { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log('new', this.request);

    this.NewsService.Nlp(this.request, this.method).subscribe((res: any) => {
      this.data = { news: this.request, response: res.data.nlpMutation.nlpProcess.result };
      console.log(res);
    },
      (error: any) => {
        console.log('error', error);
      });
  }

}
