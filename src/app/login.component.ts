import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { materialModules } from './material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
 <div style="margin-bottom:5px;"> <button mat-raised-button color="primary" (click)="detec()" >Chargement d'un fichier de log</button> </div>
 
 <div *ngIf="tabMessages.length>0">
  <mat-card>
    <mat-card-content> 
      nom [ {{fileData.name}} ] 
      -- taille [ {{fileData.size}} ] 
      -- nombre d'enregistrements [ {{this.numberRows}} ]</mat-card-content>
  </mat-card>
      <mat-form-field>
         <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Ex. Mia" #input>
      </mat-form-field>
        <table  mat-table   [dataSource]="dataSource" class="mat-elevation-z1" matSort>
         <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef mat-sort-header="nom"> NOM </th>
          <td mat-cell *matCellDef="let element"> {{element.nom}} </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="prenom">
          <th mat-header-cell *matHeaderCellDef mat-sort-header="prenom"> PRENOM </th>
          <td mat-cell *matCellDef="let element"> {{element.prenom}} </td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="age">
          <th mat-header-cell *matHeaderCellDef mat-sort-header="age"> AGE </th>
          <td mat-cell *matCellDef="let element"> {{element.age}} </td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="commentaire">
          <th mat-header-cell *matHeaderCellDef mat-sort-header="commentaire"> COMMENTAIRE </th>
          <td mat-cell *matCellDef="let element"> {{element.commentaire}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          <!-- Ligne affichée lorsqu'il n'y a pas de données correspondantes. -->
    <tr class="mat-row" *matNoDataRow>
      <td class="mat-cell" colspan="4">Aucune donnée correspondant au filtre "{{input.value}}"</td>
    </tr>
        </table>
          <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>   
         </div>
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
export class LoginComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nom', 'prenom', 'age', 'commentaire'];
  tabMessages: Array<Imessages> = new Array<Imessages>;
  dataSource: any ;
  filterSelectObj: any[] = [];
  project_dir: any = "";
  filterValues: any = {};
  fileData:any;
  numberRows:number |undefined ;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator | undefined) {
    this.dataSource.paginator = value;
  }
  @ViewChild(MatSort, {static: false}) 
  set sort(value: MatSort | undefined) { 
    this.dataSource.sort = value
  };

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
 
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  // Called on Filter change
  filterChange(filter: any, event: any) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

ngAfterViewInit(): void {
  

}
  async detec() {
    let [fileHandle] = await window.showOpenFilePicker({
      multiple: false,
      id: 'foo',
      startIn: WellKnownDirectory[2],
    });
 
     this.fileData = await fileHandle.getFile();
    console.log(this.fileData);
    
    let text = await this.fileData.text();
    const byLineArray: string[] | undefined = text.toString().split('\n');
    this.numberRows = byLineArray?.length;
    await this.getTable(byLineArray).then((res)=>{
        this.dataSource = res as MatTableDataSource<Imessages>;
        this.dataSource.paginator = this.paginator;
          // this.paginator.?_intl.itemsPerPageLabel = "Entrées par page" ;
      })
  }
 

  // parse table objets de types Imessages dans un MatTableDataSource
 private getTable(tab: string[] | undefined): Promise<MatTableDataSource<Imessages>> {
    return new Promise((resolve, reject)=>{
      if(tab){
         this.tabMessages = [];
          tab.forEach(element => {
            let mes = {} as Imessages;
            let e: string[] = element.split('|');
            mes.nom = e[0];
            mes.prenom = e[1]
            mes.age = e[2];
            mes.commentaire = e[3];
            this.tabMessages = [...this.tabMessages, mes];
          });
         resolve(new MatTableDataSource(this.tabMessages))
        }
      reject(new Error('impossible de retourner la table'));
    })
  }

}
