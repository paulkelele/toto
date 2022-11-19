import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { materialModules } from './material';

export interface Imessages {  
  nom:string;
  prenom:string,
  age:string,
  commentaire:string
}

declare const window: any;
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, materialModules, ReactiveFormsModule],
  template:`
 
  <!-- <input  type="file"  (change)="load($event)"  /> -->
 
  <button (click)="detec()" >ddd</button>
  <table *ngIf="tabMessages.length>0" mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

  <!-- Position Column -->
  <ng-container matColumnDef="nom">
    <th mat-header-cell *matHeaderCellDef> NOM </th>
    <td mat-cell *matCellDef="let element"> {{element.nom}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="prenom">
    <th mat-header-cell *matHeaderCellDef> PRENOM </th>
    <td mat-cell *matCellDef="let element"> {{element.prenom}} </td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="age">
    <th mat-header-cell *matHeaderCellDef> AGE </th>
    <td mat-cell *matCellDef="let element"> {{element.age}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="commentaire">
    <th mat-header-cell *matHeaderCellDef> COMMENTAIRE </th>
    <td mat-cell *matCellDef="let element"> {{element.commentaire}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
  `,
  styles: [`
  table {
  width: 100%;
}`
  ]
})
export class LoginComponent implements OnInit {
  
  displayedColumns: string[] = ['nom', 'prenom', 'age', 'commentaire'];
   tabMessages:Array<Imessages> = new Array<Imessages>;
  dataSource:any  ;
  constructor( ) { }

  ngOnInit(): void {
  }
  
  async detec(){
   let [fileHandle] = await window.showOpenFilePicker();
   let fileData = await fileHandle.getFile();
   let text = await fileData.text();
   const byLineArray: string[] | undefined= text.toString().split('\n'); 
   if(byLineArray ){
    byLineArray.forEach(element => {
      let mes  = {} as Imessages  ;
      console.log(element);
      let e:string[]  =  element.split('|');
      mes.nom = e[0];
      mes.prenom  = e[1]
      mes.age = e[2];
      mes.commentaire = e[3];
      console.log(mes);
      this.tabMessages = [...this.tabMessages,mes];
       
    });
    this.dataSource = this.tabMessages;
  }  
   
   
  }
  
  // load(event: any) {
  //   const file:File = event.target.files[0];
  //   if(file){
  //     if (file.size === 0) return;
     
  //     let fileReader: FileReader = new FileReader();
  //     fileReader.readAsText(file);
  //     fileReader.onload = () => {
  //       const byLineArray: string[] | undefined= fileReader.result?.toString().split('\n'); 
  //       if(byLineArray ){
         
  //         byLineArray.forEach(element => {
  //           let mes  = {} as Imessages  ;
  //           console.log(element);
  //           let e:string[]  =  element.split('|');
  //           mes.nom = e[0];
  //           mes.prenom  = e[1]
  //           mes.age = e[2];
  //           mes.commentaire = e[3];
  //           console.log(mes);
  //           this.tabMessages = [...this.tabMessages,mes];
             
  //         });
  //         this.dataSource = this.tabMessages;
  //       }         
  //       console.log(this.tabMessages);
     
  //     };
  //     fileReader.onerror = () => {
  //  }
  //   }
  
  
  // }
}
