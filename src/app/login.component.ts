import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { materialModules } from './material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableComponent } from './table.component';

 

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
  @ViewChild('in')  input: ElementRef | undefined;
  tabs:string[]=[];
   selected = new FormControl(0);
  
  // tabMessages: Array<Imessages> = new Array<Imessages>;
  dataSource: any ;
  byLineArray: string[] | undefined = [];
 
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
 
  

 

ngAfterViewInit(): void {
}
  
  async load(event: any) {
  this.byLineArray = [];
  console.log(event);
    const file:File = event.target.files[0];
    if(file){
      if (file.size === 0){
        if(this.input)this.input.nativeElement.value = "";
        return;
      }
       this.tabs.push(file.name);
       this.selected.setValue(this.tabs.length - 1);
      //  await file.text().then((res)=>{
      //   this.byLineArray = res.toString().split('\n'); 
      // });
    
  }
}
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    if(this.input)
     this.input.nativeElement.value = "";
  }
}
