import { Component, OnInit } from '@angular/core';
import { AlertaService, PREGUNTA, MENSAJE } from './alertas.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  public alerta: MENSAJE
  public pregunta: PREGUNTA
  
  
  constructor(
    private _alerta: AlertaService
  ) { }

  ngOnInit() {
    
    this._alerta.mensajeAlerta$.subscribe(mensaje => {
        this.alerta = mensaje
        $('#alertaWindow').fadeToggle()
    })

    this._alerta.preguntaAlerta$.subscribe(pregunta => {
      this.pregunta = pregunta
      $('#alertaWindow').fadeToggle()
    })

  }

  getResponse(res:boolean) {
    this._alerta.respuestaAlerta$.next(res)
    this.alerta = undefined
    this.pregunta = undefined
    $('#alertaWindow').fadeToggle()
  }

  onClose() {
    $('#alertaWindow').fadeToggle()
    this.alerta = undefined
    this.pregunta = undefined
  }

}
