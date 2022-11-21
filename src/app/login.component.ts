import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { materialModules } from './material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableComponent } from './table.component';

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
  imports: [CommonModule, materialModules, ReactiveFormsModule, FormsModule, TableComponent],
  templateUrl:'login.component.html',
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

  tabs:string[]=[];
  selected = new FormControl(0);
  displayedColumns: string[] = ['nom', 'prenom', 'age', 'commentaire'];
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
    // this.filterSelectObj = [
    //   {
    //     name: this.displayedColumns[0].toUpperCase(),
    //     columnProp: this.displayedColumns[0],
    //     options: []
    //   }, {
    //     name: this.displayedColumns[1].toUpperCase(),
    //     columnProp: this.displayedColumns[1],
    //     options: []
    //   }, {
    //     name: this.displayedColumns[2].toUpperCase(),
    //     columnProp: this.displayedColumns[2],
    //     options: []
    //   }, {
    //     name: this.displayedColumns[3].toUpperCase(),
    //     columnProp: this.displayedColumns[3],
    //     options: []
    //   }
    // ]
    for (let index = 0; index < 18; index++) {
       const obj={
        name: this.colonnes[index].toUpperCase(),
        columnProp: this.colonnes[index],
        options: []
      }
      this.filterSelectObj=[...this.filterSelectObj,obj]
      
    }
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
     this.tabs.push(this.fileData.name)
    let text = await this.fileData.text();
    const byLineArray: string[] | undefined = text.toString().split('\n');
    this.numberRows = byLineArray?.length;
    await this.getTable(byLineArray).then((res)=>{
        this.dataSource = res as MatTableDataSource<Imessages>;
        // this.dataSource.paginator = this.paginator;
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
            this.tabMessages = [...this.tabMessages, mes];
          });
         resolve(new MatTableDataSource(this.tabMessages))
        }
      reject(new Error('impossible de retourner la table'));
    })
  }

}
