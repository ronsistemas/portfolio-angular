import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/infopagina.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: number = new Date().getFullYear();
  autor = 'Ronsistemas';


  constructor(public infoService: InfoPaginaService) { }

  ngOnInit() {
  }

}
