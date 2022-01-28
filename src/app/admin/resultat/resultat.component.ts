import { ResultsService } from './result.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from "@angular/router";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {

  form!: FormGroup;
  private resultatId: any;
  private routeSub: Subscription | undefined;
  filePreview!: string;
  fileName!:string;
  constructor( public ResultsService:ResultsService,public route: ActivatedRoute ) { }
  gen() {

      let last = Math.floor(Math.random() * (999999 - 100000) + 100000);
      return last.toString();

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      object: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)]
      }),
      filePath: new FormControl(null,{
        validators: [Validators.required],
      })
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.resultatId = params['resultatId'];

    });

  }
  onFilePicked(event: Event) {
    const file =((event.target as HTMLInputElement ).files as FileList)[0];
    this.form.patchValue({ filePath: file });
    ( (this.form.get('filePath') as any ).updateValueAndValidity());
    const reader = new FileReader();
    reader.onload =() => {
      this.filePreview = (reader.result as string );
    };
    reader.readAsDataURL(file);
    this.fileName = file.name;
  }
  onSavePost(){
    if (this.form.invalid){
      return
    }

    this.ResultsService.addresults(
      this.gen(),
      this.form.value.object,
      this.form.value.filePath,
      this.resultatId
      );

  }
}
