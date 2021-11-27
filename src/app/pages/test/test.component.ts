import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { generos } from 'src/app/data/generos';
import { equipos } from 'src/app/data/clubes';
import { nacionalidades } from 'src/app/data/nacionalidades'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import jsPDF from 'jspdf';

import * as $ from "jquery";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {





  inicio:FormGroup;
 public  nom:string
 public  ocup:string
 public  rfc:string
 public  fdnc:string 
  
  Data=Object.values(generos);
  Dataequipos = Object.values(equipos);
  DataNacion=Object.values(nacionalidades);
  
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
    
  };
 
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };
  
  enviar(valores){

     this.nom=valores.Nombre  +' '+ valores.ApellidoP+' '+ valores.ApellidoM;
     this.ocup=valores.Ocupacion;

     this.rfc=valores.RFC;
     this.fdnc=valores.FechaN;
     console.log(valores);


    console.log(this.nom);
  }

 

  generatedoc(){

    var doc =  new jsPDF('p','pt','letter');
 var margin=10;
 var scale=(doc.internal.pageSize.width-margin*2)/document.body.scrollWidth;

 

    doc.html(document.body, {
      x:margin,
      y:margin,
      html2canvas:{
        scale:scale,
      },

      callback: function (doc) {
        doc.output('dataurlnewwindow',{filename:'fichero-pdf.pdf'})
        
      }
   });


  }


  constructor(private ngWizardService: NgWizardService,private _builder:FormBuilder) {
    console.log(this.DataNacion);
     this.inicio=this._builder.group(
       {
Nombre: [''],
ApellidoP: [''],
ApellidoM: [''],
FechaN: ['',Validators.required],
Genero: [''],
Nacionalidad: [''],
Equipo: [''],
RFC: ['',Validators.minLength(12)],
Ocupacion: ['']
       })
   }
 

  ngOnInit(): void {
    this.Data=Object.values(generos);
    console.log(this.Data);
    
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
 
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
 
  isValidTypeBoolean: boolean = true;
 
  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }
 
  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    // return of(true);
  }

}
