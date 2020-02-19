import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { MensajeAlertaModel, PreguntaAlertaModel } from './alertas.model';

@Injectable({ providedIn: 'root' })
export class AlertaService {
    
    mensajeAlerta$ = new Subject<MensajeAlertaModel>()
    preguntaAlerta$ = new Subject<PreguntaAlertaModel>()
    respuestaAlerta$ = new Subject<boolean>()

    

    constructor() { }

    // Función que envía un mensaje de alerta
    // y espera la confirmación de la lectura del usuario
    enviarMensajeAlerta(mensaje: MensajeAlertaModel): Observable<any> {
        
        if (!mensaje.confirmacion) mensaje.confirmacion = 'aceptar'

        this.mensajeAlerta$.next(mensaje)
        
        return this.respuestaAlerta$
    }


    // Función que envía una pregunta como alerta
    // y espera la respuesta true o false del usuario
    enviarPreguntaAlerta(pregunta: PreguntaAlertaModel): Observable<any> {

        if (!pregunta.respTrue) pregunta.respTrue = 'aceptar'
        if (!pregunta.respFalse) pregunta.respFalse = 'cancelar'
        
        this.preguntaAlerta$.next(pregunta)

        return this.respuestaAlerta$
    }

    
    
}