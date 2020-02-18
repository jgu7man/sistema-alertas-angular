import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

export interface MENSAJE {
    mensaje: string, confirmacion?: string
}
export interface PREGUNTA {
    mensaje: string, respTrue?: string, respFalse?: string
}


@Injectable({ providedIn: 'root' })
export class AlertaService {
    
    mensajeAlerta$ = new Subject<MENSAJE>()
    preguntaAlerta$ = new Subject<PREGUNTA>()
    respuestaAlerta$ = new Subject<boolean>()

    

    constructor() { }

    // Función que envía un mensaje de alerta
    // y espera la confirmación de la lectura del usuario
    enviarMensajeAlerta(mensaje: MENSAJE): Observable<any> {
        
        if (!mensaje.confirmacion) mensaje.confirmacion = 'aceptar'

        this.mensajeAlerta$.next(mensaje)
        
        return this.respuestaAlerta$
    }


    // Función que envía una pregunta como alerta
    // y espera la respuesta true o false del usuario
    enviarPreguntaAlerta(pregunta: PREGUNTA): Observable<any> {

        if (!pregunta.respTrue) pregunta.respTrue = 'aceptar'
        if (!pregunta.respFalse) pregunta.respFalse = 'cancelar'
        
        this.preguntaAlerta$.next(pregunta)

        return this.respuestaAlerta$
    }

    
    
}