import { Component, Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { materialModules } from './material';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, materialModules],
  template: `
  <mat-form-field>
                    <mat-label>Filter</mat-label>
                    <input matInput (keyup)="applyFilter($event)" placeholder="Ex. Mia" #input>
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
                    <tr mat-row *matRowDef="let row; columns: colonnes;"></tr>
                    <!-- Ligne affichée lorsqu'il n'y a pas de données correspondantes. -->
                    <tr class="mat-row" *matNoDataRow>
                        <td class="mat-cell" colspan="4">Aucune donnée correspondant au filtre "{{input.value}}"</td>
                    </tr>
                </table>
                <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
  `,
  styles: [
  ]
})
export class TableComponent {
 
}
