import { Component, OnInit, Input, ViewChild, AfterViewInit,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { materialModules } from './material';
import { MatTableDataSource } from '@angular/material/table';

export interface Imessages {
    date:string,
    sessionId:string,
    id:string,
    parent_id:string,
    nb_sub_records:string,
    configuration_name:string,
    server_name:string,
    user_name:string,
    module:string,
    sub_module:string,
    object_type:string,
    object_name:string,
    field_name:string,
    old_value:string,
    new_value:string,
    action_type:string,
    status:string,
    message:string
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, materialModules],
  template: `
  <mat-form-field>
                <mat-label>Filter</mat-label>
                <input matInput (keyup)="applyFilter($event)"   #input>
                </mat-form-field>
                  <table mat-table [dataSource]="dataSource" class="mat-elevation-z1" matSort>
                    <ng-container matColumnDef="date">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="date"> date </th>
                        <td mat-cell *matCellDef="let element"> {{element.date}} </td>
                    </ng-container>

                    <!-- Name Column -->
                    <ng-container matColumnDef="sessionId">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="sessionId"> </th>
                        <td mat-cell *matCellDef="let element"> {{element.sessionId}} </td>
                    </ng-container>

                    <!-- Weight Column -->
                    <ng-container matColumnDef="id">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="age"> id </th>
                        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="parent_id">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="parent_id"> parent_id </th>
                        <td mat-cell *matCellDef="let element"> {{element.parent_id}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="nb_sub_records">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="nb_sub_records"> nb_sub_records </th>
                        <td mat-cell *matCellDef="let element"> {{element.nb_sub_records}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="configuration_name">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="configuration_name"> configuration_name
                        </th>
                        <td mat-cell *matCellDef="let element"> {{element.configuration_name}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="server_name">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="server_name"> server_name </th>
                        <td mat-cell *matCellDef="let element"> {{element.server_name}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="user_name">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="user_name"> user_name </th>
                        <td mat-cell *matCellDef="let element"> {{element.user_name}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="module">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="module"> module </th>
                        <td mat-cell *matCellDef="let element"> {{element.module}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="sub_module">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="sub_module"> sub_module </th>
                        <td mat-cell *matCellDef="let element"> {{element.sub_module}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="object_type">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="object_type"> object_type </th>
                        <td mat-cell *matCellDef="let element"> {{element.object_type}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="object_name">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="object_name"> object_name </th>
                        <td mat-cell *matCellDef="let element"> {{element.object_name}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="field_name">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="field_name"> field_name </th>
                        <td mat-cell *matCellDef="let element"> {{element.field_name}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="old_value">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="old_value"> old_value </th>
                        <td mat-cell *matCellDef="let element"> {{element.old_value}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="new_value">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="new_value"> new_value </th>
                        <td mat-cell *matCellDef="let element"> {{element.new_value}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="action_type">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="action_type"> action_type </th>
                        <td mat-cell *matCellDef="let element"> {{element.action_type}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="status">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="status"> status </th>
                        <td mat-cell *matCellDef="let element"> {{element.status}} </td>
                    </ng-container>

                    <!-- Symbol Column -->
                    <ng-container matColumnDef="message">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header="message"> message </th>
                        <td mat-cell *matCellDef="let element"> {{element.message}} </td>
                    </ng-container>



                    <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
                    <tr mat-row *matRowDef="let row; columns: colonnes; let i = index; let even = even; let odd=odd" [ngClass]="{ odd: odd, even: even }" ></tr>
                    <!-- Ligne affichée lorsqu'il n'y a pas de données correspondantes. -->
                    <tr class="mat-row" *matNoDataRow>
                        <td class="mat-cell" colspan="4">Aucune donnée correspondant au filtre "{{input.value}}"</td>
                    </tr>
                </table>
               <mat-paginator #paginator [pageSize]="5" showFirstLastButtons [pageSizeOptions]="[1, 5, 10, 25, 100]"></mat-paginator>
  `,
  styles: [
  ]
})
export class TableComponent implements OnInit, AfterViewInit {
 colonnes:string[]=[
        "date",
        "sessionId",
        "id",
        "parent_id",
        "nb_sub_records",
        "configuration_name",
        "server_name",
        "user_name",
        "module",
        "sub_module",
        "object_type",
        "object_name",
        "field_name",
        "old_value",
        "new_value",
        "action_type",
        "status",
        "message"
      ] 
  
  @Input('byLineArray') byLineArray: string   | undefined ;
  @ViewChild(MatSort) sort:any;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;


 filterSelectObj: any[] = [];
dataSource:any;

 constructor(private ref: ChangeDetectorRef ){
    for (let index = 0; index < this.colonnes.length; index++) {
        const obj={
         name: this.colonnes[index].toUpperCase(),
         columnProp: this.colonnes[index],
         options: []
       }
       this.filterSelectObj=[...this.filterSelectObj,obj];
     }
 }

 ngOnInit(): void {
    console.log('paginator is ', this.paginator);
     if(this.byLineArray){
        const arr: string[]=this.byLineArray.split('\n');
        this.tt(arr );
        
     }
 }

ngAfterViewInit(): void {
    
}

 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
 
 

 async tt(arr:string[] | undefined ){
      await this.getTable(arr).then((res)=>{
        this.dataSource = new MatTableDataSource<Imessages>(res as Imessages[]);
        this.ref.detectChanges();
        console.log('paginator is 2', this.paginator);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    })
 }

    getTable(tab: string[] | undefined): Promise<Imessages[]> {
    return new Promise((resolve, reject)=>{
      if(tab){
        console.log(tab);
        let tabMessages:any = [];
          tab.forEach(element => {
            if(element){
            let mes = {} as Imessages;
            let e: string[] = element.split('|');
            mes.date = e[0];
            mes.sessionId = e[1]
            mes.id = e[2];
            mes.parent_id = e[3];
            mes.nb_sub_records = e[4];
            mes.configuration_name = e[5];
            mes.server_name = e[6];
            mes.user_name = e[7];
            mes.module = e[8];
            mes.sub_module = e[9];
            mes.object_type = e[10];
            mes.object_name = e[11];
            mes.field_name = e[12];
            mes.old_value = e[13];
            mes.new_value = e[14];
            mes.action_type = e[15];
            mes.status = e[16];
            mes.message = e[17];
            tabMessages = [...tabMessages, mes];
        }
          });
          console.log(tabMessages);
         resolve(tabMessages)
        }
      reject(new Error('impossible de retourner la table'));
    })
  }
  
}
 
