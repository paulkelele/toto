import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { materialModules } from './material';

export interface Imessages {
  nom: string;
  prenom: string,
  age: string,
  commentaire: string
}

export enum WellKnownDirectory {
  "desktop",
  "documents",
  "downloads",
  "music",
  "pictures",
  "videos",
  "windows",
};

declare const window: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, materialModules, ReactiveFormsModule, FormsModule],
  template: `
 
  <!-- <input  type="file"  (change)="load($event)"  /> -->
 <div class="scafold">
  <div style="width: 100%;"> Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Tenetur consectetur aliquid voluptatum sunt neque corporis non praesentium, 
  officia voluptates magnam nulla, asperiores voluptas maxime quae voluptate ratione quia exercitationem accusantium?
  </div>
  <div style="display: flex;">
  <div style="width: 5%;"> </div>
  <div style="width: 95%;">
 <div style="margin-bottom:5px;"> <button mat-raised-button color="primary" (click)="detec()" >load table</button> </div>
 
 <div *ngIf="tabMessages.length>0">
   <mat-form-field *ngFor="let filter of filterSelectObj " style="margin-left: 15px;" >
  <mat-label>Filter {{filter.name}}</mat-label>
  <select matNativeControl name="{{filter.columnProp}}" >
  <option value="">-- Select {{filter.name}} --</option>
  <option [value]="item" *ngFor="let item of filter.options">{{item}}</option>
  </select>
</mat-form-field>
 </div>

  <table *ngIf="tabMessages.length>0" mat-table  mat-table [dataSource]="dataSource" class="mat-elevation-z8">
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
  </div>
  </div>
</div>

  `,
  styles: [`

.scafold{
  padding:10px; 
}


  table {
  width: 100%;
}`
  ]
})
export class LoginComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom', 'age', 'commentaire'];
  tabMessages: Array<Imessages> = new Array<Imessages>;
  dataSource:any = new MatTableDataSource();
  filterSelectObj:any[] = [];
  project_dir: any = "";
  filterValues:any = {};


  constructor() {
    this.filterSelectObj = [
      {
        name: this.displayedColumns[0].toUpperCase(),
        columnProp: this.displayedColumns[0],
        options: []
      }, {
        name: this.displayedColumns[1].toUpperCase(),
        columnProp: this.displayedColumns[1],
        options: []
      }, {
        name: this.displayedColumns[2].toUpperCase(),
        columnProp: this.displayedColumns[2],
        options: []
      }, {
        name: this.displayedColumns[3].toUpperCase(),
        columnProp: this.displayedColumns[3],
        options: []
      }
    ]
   }

  ngOnInit(): void {
  }
 
    // Called on Filter change
    filterChange(filter:any, event:any) {
       console.log(filter.columnProp);
       
      this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
      this.dataSource.filter = JSON.stringify(this.filterValues)
    }

  async detec() {
    let [fileHandle] = await window.showOpenFilePicker({
      multiple:false,
      id:'foo',
      startIn: WellKnownDirectory[2],
    });
    console.log(fileHandle);
    
    let fileData = await fileHandle.getFile();
    let text = await fileData.text();
    const byLineArray: string[] | undefined = text.toString().split('\n');
    if (byLineArray) {
      this.tabMessages = [];
      byLineArray.forEach(element => {
        let mes = {} as Imessages;
        console.log(element);
        let e: string[] = element.split('|');
        mes.nom = e[0];
        mes.prenom = e[1]
        mes.age = e[2];
        mes.commentaire = e[3];
         this.tabMessages = [...this.tabMessages, mes];
      });
      this.dataSource = new MatTableDataSource(this.tabMessages);
      this.dataSource.filterPredicate 
    }
  }
 
}
