import { Component, OnInit, ViewChild, ElementRef, HostBinding, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { materialModules } from './material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableComponent } from './table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from './header.component';

 

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
  imports: [CommonModule, HeaderComponent, materialModules, ReactiveFormsModule, FormsModule, TableComponent],
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
export class LoginComponent implements OnInit {

  @HostBinding('class') className = '';
  @ViewChild('in')  input: ElementRef | undefined;
  tabs:string[]=[];
  tabs2:string[][]=[[],[]];
  sendToggleControl!:FormControl;
   selected = new FormControl(0);
   toggleControl = new FormControl(false);
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

  constructor(private _snackBar: MatSnackBar) {
   
  }

  ngOnInit(): void {
    // this.toggleControl.valueChanges.subscribe((darkMode) => {
    //   console.log("Je suis appelé");
    //   const darkClassName = 'darkMode';
    //   this.className = darkMode ? darkClassName : '';
    // });
   
   }
   

sendFormContolAction($event: FormControl) {
  $event.valueChanges.subscribe((darkMode) => {
  console.log("Je suis appelé");
  const darkClassName = 'darkMode';
  this.className = darkMode ? darkClassName : '';
});
}
  
  async load(event: any) {
  this.byLineArray = [];
  console.log(event);
    const file:File = event.target.files[0];
    if(file){
      if (file.size === 0){
        if(this.input)this.input.nativeElement.value = "";
        this._snackBar.open("Le fichier selectionné est vide","",{duration:2000,verticalPosition:'top'});
        return;
      }
       this.tabs2[0].push(file.name);
       this.selected.setValue(this.tabs2[0].length - 1);
       await file.text().then((res)=>{
        this.tabs2[1].push(res)
      });
   }
}
 
removeTab(index: number) {
     
    this.tabs2[0].splice(index, 1);
    this.tabs2[1].splice(index, 1);
    if(this.input)
     this.input.nativeElement.value = "";
  }
}
 

