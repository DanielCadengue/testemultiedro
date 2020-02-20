import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../service/funcionario.service';
import { Funcionario } from '../models/funcionario';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  funcionarios = [];

  constructor(private funcionarioService: FuncionarioService) {
    this.funcionarioService
      .buscar()
      .subscribe((res: Funcionario[]) => {
        res.forEach((Item, index) => {
          this.funcionarios.push(Item);
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
      this.funcionarioService
        .deletar(id)
        .subscribe((res: Funcionario[]) => {
          window.location.reload();
        });
  }

  editar(id) {
    this.funcionarioService
      .editar(id)
      .subscribe((res: Funcionario[]) => {
        window.location.reload();
      })
  }

}

