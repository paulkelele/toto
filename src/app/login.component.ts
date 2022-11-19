import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
  imports: [CommonModule, materialModules, ReactiveFormsModule],
  template: `
 
  <!-- <input  type="file"  (change)="load($event)"  /> -->
 <div class="scafold">
  <div style="width: 100%;"> Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Tenetur consectetur aliquid voluptatum sunt neque corporis non praesentium, 
  officia voluptates magnam nulla, asperiores voluptas maxime quae voluptate ratione quia exercitationem accusantium?</div>
  <div style="display: flex;">
  <div style="width: 30%;"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Laborum veniam ducimus soluta odio, quae consequatur blanditiis voluptas, eligendi 
    ullam nihil alias ad totam officia officiis incidunt quaerat cupiditate quibusdam molestiae?</p></div>
  <div style="width: 70%;">
  <button mat-raised-button (click)="detec()" >load table</button>
  <table mat-table *ngIf="tabMessages.length>0" mat-table [dataSource]="dataSource" class="mat-elevation-z8">
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
  dataSource: any;
  project_dir: any = ""
  constructor() { }

  ngOnInit(): void {
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
        console.log(mes);
        this.tabMessages = [...this.tabMessages, mes];
      });
      this.dataSource = new MatTableDataSource(this.tabMessages);
      
    }
  }
 
}
