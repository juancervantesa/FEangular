import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import Swal from 'sweetalert2';
import { AmenazasService } from '../../../services/amenazas.service';
import { Amenaza } from '../../interfaces/amenaza';
import { CategoriaService } from '../../../services/categoria.service';
import { CommonModule, NgFor } from '@angular/common';
import { Categoria } from '../../interfaces/categoria';

@Component({
  selector: 'app-add-edit-amenaza',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    NgFor

  ],

  templateUrl: './add-edit-amenaza.component.html',
  styleUrl: './add-edit-amenaza.component.scss'
})
export class AddEditAmenazaComponent implements OnInit {
  private dialogReference = inject(MatDialogRef<AddEditAmenazaComponent>);
  private fb = inject(FormBuilder);

  private _categoriaService = inject(CategoriaService);
  private _amenazaService = inject(AmenazasService);

  formAmenaza!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Nuevo';

  options : Categoria [] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dataAmenaza: any) {
    this.formAmenaza = this.fb.group({
      amenazaId: [''],
      categoriaId: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      nivelRiesgo: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    // console.log('on init');
    // console.log(this.dataAmenaza);
    // console.log(this.dataAmenaza.amenazas[0].titulo);

    this.getOpcionesCategoria();

    if (this.dataAmenaza) {
      this.formAmenaza.patchValue({
       amenazaId: this.dataAmenaza.amenazaId,
        categoriaId: this.dataAmenaza.categoriaId,
        titulo: this.dataAmenaza.titulo,
        descripcion: this.dataAmenaza.descripcion,
        nivelRiesgo: this.dataAmenaza.nivelRiesgo,
        fechaPublicacion: this.dataAmenaza.fechaPublicacion,

      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }

  }

  getOpcionesCategoria() {
    this._categoriaService.get().subscribe({
      next: (data) => {
        console.log('para cargar el combo')
        console.log(data);
        this.options = data;
        //console.log(this.options);
      },
      error: (error) => {
        // console.log(error);
        Swal.fire('Error', error, 'error');
      },
    });
  }
  addEdit() {
    //console.log(this.formCategoria.value);
    const modelo: Amenaza = {
      amenazaId: 0,
      categoriaId: this.formAmenaza.value.categoriaId,
      titulo: this.formAmenaza.value.titulo,
      descripcion: this.formAmenaza.value.descripcion,
      nivelRiesgo: this.formAmenaza.value.nivelRiesgo,
      fechaPublicacion: this.formAmenaza.value.fechaPublicacion,
    };

    if (this.dataAmenaza == null) {
      this._amenazaService.add(modelo).subscribe({
        next: (data) => {
          //console.log(data);
          Swal.fire('Adicionar', "La Amenaza fue creada", 'info');
          this.dialogReference.close('creado');
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', 'Error no se pudo adicionar', 'error');
        },
      });
    } else {
      modelo.amenazaId = this.dataAmenaza.amenazaId;
      this._amenazaService
        .update(this.dataAmenaza.amenazaId, modelo)
        .subscribe({
          next: (data) => {
            //console.log(data);
            Swal.fire('Actualizar', 'Actualizacion completada', 'info');
            this.dialogReference.close('editado');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Error', 'Error no se pudo editar', 'error');
          },
        });
    }
  }

}
