import { Component, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { materialModules } from './material';
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
export class LoginComponent   {

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

  constructor(private _snackBar: MatSnackBar) {
  }

  receiveToggleControlForDarkMode($event: FormControl):void {
    let val:boolean = $event.value
    val ? this.className='darkMode' : this.className='';
}
  
async chargmentFichier(){
  let [fileHandle] = await window.showOpenFilePicker({
    startIn: WellKnownDirectory[0]
  });
  let file = await fileHandle.getFile();
  console.log(file);
  if (file.size === 0){
    this._snackBar.open("Le fichier selectionné est vide","",{duration:2000,verticalPosition:'top'});
    return;
  }
  this.tabs2[0].push(file.name);
  this.selected.setValue(this.tabs2[0].length - 1);
  let text = await file.text();
  this.tabs2[1].push(text)
  console.log(new Date(1668501544000).getDate());
  
   
}

//   async load(event: any) {
//   this.byLineArray = [];
//     const file:File = event.target.files[0];
//     if(file){
//       if (file.size === 0){
//         if(this.input)this.input.nativeElement.value = "";
//         this._snackBar.open("Le fichier selectionné est vide","",{duration:2000,verticalPosition:'top'});
//         return;
//       }
//        this.tabs2[0].push(file.name);
//        this.selected.setValue(this.tabs2[0].length - 1);
//        await file.text().then((res)=>{
//         this.tabs2[1].push(res)
//       });
//    }
// }
 
removeTab(index: number) {
    this.tabs2[0].splice(index, 1);
    this.tabs2[1].splice(index, 1);
    if(this.input)
     this.input.nativeElement.value = "";
  }
}
 

