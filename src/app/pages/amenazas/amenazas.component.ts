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
import { Amenaza } from '../interfaces/amenaza';
import { AmenazasService } from '../../services/amenazas.service';
import { CategoriaService } from '../../services/categoria.service';
import { AddEditAmenazaComponent } from './add-edit-amenaza/add-edit-amenaza.component';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-amenazas',
  imports: [
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './amenazas.component.html',
  styleUrl: './amenazas.component.scss'
})
export class AmenazasComponent implements AfterViewInit, OnInit {
  private _amanazaService = inject(AmenazasService);

private _categoriaService = inject(CategoriaService);

  public dialog = inject(MatDialog);
  list: Amenaza[] = [];
  displayedColumns: string[] = ['amenazaId', 'categoriaId','nombreCategoria', 'titulo', 'descripcion', 'nivelRiesgo', 'fechaPublicacion', 'acciones'];
  dataSource = new MatTableDataSource(this.list);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;



  ngOnInit() {
    //this.dataSource = new MatTableDataSource(AMENAZAS);

    this.mostrar();
  }
  mostrar() {
    this._amanazaService.get().subscribe({
      next: (dataResponse) => {
         console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // this._amanazaService.get().subscribe({
    //   next: (dataResponse) => {
    //      console.log(dataResponse);
    //     this.dataSource.data = dataResponse;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
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
  openDialogNuevo() {
    this.dialog
      .open(AddEditAmenazaComponent, {
        disableClose: false,
        width: '5000px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrar();
        }
      });
  }
  openDialogEditar(dataAmenaza: any) {
    // console.log('first');
    // console.log(dataAmenaza);
    // console.log(dataAmenaza.amenazas[0].amenazaId);
    // console.log(dataAmenaza.amenazas[0].titulo);
    this.dialog
      .open(AddEditAmenazaComponent, {
        disableClose: true,
        width: '700px',


        data: dataAmenaza,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.mostrar();
        }
      });
  }

  delete(dataAmenaza: Amenaza) {
    Swal
      .fire({
        title: 'Esta Seguro?',
        text: 'No podra revertir la acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminelo!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log('eliminado');
          this._amanazaService.delete(dataAmenaza.amenazaId).subscribe({
            next: (data) => {
              Swal.fire('Eliminado', 'El registro fue eliminado', 'info');

              this.mostrar();
            },
            error: (e) => {
              Swal.fire('Error', 'No se pudo eliminar el Item', 'error');

            },
          });
        }
      });
  }

}
