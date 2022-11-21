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
  
  tabMessages: Array<Imessages> = new Array<Imessages>;
  dataSource: any ;
  byLineArray: string[] | undefined 
 
  filterValues: any = {};
  fileData:any;
  numberRows:number |undefined ;

  // @ViewChild(MatPaginator, {static: false})
  // set paginator(value: MatPaginator | undefined) {
  //   this.dataSource.paginator = value;
  // }
  // @ViewChild(MatSort, {static: false}) 
  // set sort(value: MatSort | undefined) { 
  //   this.dataSource.sort = value
  // };

  constructor() {
   
  }

  ngOnInit(): void {
    
  }
 
  

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   // if (this.dataSource.paginator) {
  //   //   this.dataSource.paginator.firstPage();
  //   // }
  // }

  // // Called on Filter change
  // filterChange(filter: any, event: any) {
  //   this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
  //   this.dataSource.filter = JSON.stringify(this.filterValues)
  // }

ngAfterViewInit(): void {
  

}
  async detec() {
    this.byLineArray = [];
    let [fileHandle] = await window.showOpenFilePicker({
      multiple: false,
      id: 'foo',
      startIn: WellKnownDirectory[2],
    });
 
     this.fileData = await fileHandle.getFile();
    console.log(this.fileData);
     this.tabs.push(this.fileData.name);
    // quand on charge un fichier on passe directement à sa vue 
     this.selected.setValue(this.tabs.length - 1);
    let text = await this.fileData.text();
    this.byLineArray  = text.toString().split('\n');
    console.log(this.tabs);
    
  }
 


  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
