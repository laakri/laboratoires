import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-one-result-page',
  templateUrl: './one-result-page.component.html',
  styleUrls: ['./one-result-page.component.css']
})
export class OneResultPageComponent implements OnInit {
  private routeSub: Subscription | undefined;
  resultNum !: string;
  resultObject !: string;
  resultfilePath !: string;
  resultCreatedAt !: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.resultNum = params['num'];
      this.resultObject = params['object'];
      this.resultfilePath = params['filePath'];
      this.resultCreatedAt= params['createdAt'];
    });
  }

}
