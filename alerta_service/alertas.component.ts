import { Component, OnInit } from '@angular/core';
import { AlertaService} from './alertas.service';
import { PreguntaAlertaModel, MensajeAlertaModel } from './alertas.model';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  public alerta: MensajeAlertaModel
  public pregunta: PreguntaAlertaModel
  
  
  constructor(
    private _alerta: AlertaService
  ) {
    this.alerta = new MensajeAlertaModel('', '')
    this.pregunta = new PreguntaAlertaModel('','','')
   }

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
    this.alerta = new MensajeAlertaModel('', '')
    this.pregunta = new PreguntaAlertaModel('','','')
    $('#alertaWindow').fadeToggle()
  }

  onClose() {
    $('#alertaWindow').fadeToggle()
    this.alerta = new MensajeAlertaModel('', '')
    this.pregunta = new PreguntaAlertaModel('','','')
  }

}
