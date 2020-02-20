import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Departamento } from '../models/departamento';
import { DepartamentoService } from '../service/departamento.service';








@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {




  departamentos = [];

  constructor(private departamentoService: DepartamentoService) {
    this.departamentoService
      .buscar()
      .subscribe((res: Departamento[]) => {
        res.forEach((Item, index) => {
          this.departamentos.push(Item);
        })

      })
  }

  ngOnInit(): void {

    document
      .querySelector('header button')
      .addEventListener("click", function () {
        document
          .querySelector('.form')
          .classList.toggle('hide')
      })
  }

  deletar(id) {

    const musDelete = confirm('Deseja realmente excluir ?');

    if (musDelete)
      this.departamentoService
        .deletar(id)
        .subscribe((res: Departamento[]) => {
          window.location.reload();
        });
  }

  editar(id) {
    this.departamentoService
      .editar(id)
      .subscribe((res: Departamento[]) => {
        window.location.reload();
      })
  }

}
