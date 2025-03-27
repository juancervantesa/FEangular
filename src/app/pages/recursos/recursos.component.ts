import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';

//angular material
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { RecursosService } from '../../services/recursos.service';
import { Recurso } from '../interfaces/recurso';

@Component({
  selector: 'app-recursos',
  imports: [
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,

  ],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.scss'
})
export class RecursosComponent implements AfterViewInit, OnInit {
  private _recursosService = inject(RecursosService);
  public dialog = inject(MatDialog);
  list: Recurso[] = [];
  displayedColumns: string[] = ['recursoId', 'titulo','descripcion','enlaceUrl', 'acciones'];
  dataSource = new MatTableDataSource(this.list);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    // console.log('ingrre');
     this.mostrar();
   }

   mostrar() {
    this._recursosService.get().subscribe({
      next: (dataResponse) => {
        // console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator?? null;
    this.dataSource.sort = this.sort?? null ;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
