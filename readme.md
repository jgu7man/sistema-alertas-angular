# Servicio de alertas en Angular 
Un mini sistema de alertas que se pueden invocar desde cualquier componente en un proyecto Angular emitiendo preguntas y esperando respuestas del usuario.

## Requerimientos
- **rxjs**: incluido a partir de Angular 6.
- **jQuery**: instalación desde paquete npm o vínculado en el ``index.html`` del proyecto.
- **materialize**: instalación desde paquete npm o vínculado en el ``index.html`` del proyecto.
- **fontawesome**: vínculado en el ``index.html`` del proyecto.
- **@types/jquery**: [recomendado]
- **@types/materialize-css** no es necesario

## Instalación

### Instalación de todos los paquetes
`npm i jQuery materialize @types/jquery @types/materialize-css --save`

### Instalación del componente

1. Copiar y pegar la carpeta en el area de componentes del proyecto
2. Hacer el llamado del componente en el `app.module.ts`

*app.module.ts*
```ts
import { AlertasComponent } from './components/alerta_service/alertas.component';

@NgModule({
    declarations: [
        AlertasComponent
    ]
})
```

3. Se recomienda invocar el componente en el html del componente más cercano a la raíz del proyecto:

*app.component.html*
```html
<routing-module></routing-module>

<app-alertas></app-alertas>
```




## Uso

### Usar en cualquier componente

Invocar el servicio en el componente para mandar las alertas

*cualquier.component.ts*
```ts
import { AdminAlertaService } from '../../../services/admin/admin-alerta.service';

export class CualquierComponent implements OnInit {

    constructor(
        private _alerta: AdminAlertaService
    ) { }

}
```


### MENSAJES

El servicio recibe un mensaje a través de la función `enviarMensajeAlerta()` el cual requiere **al menos** un argumento como mensaje en forma de *string*.

*cualquier.component.ts*
```ts

    cualquierFuncion(){
        this._alerta.enviarMensajeAlerta({mensaje: 'El usuario que buscas aún no está registrado'})
    }

```

Esta función activará la ventana emergente de alertas pero no esperará confirmación. Para esperar una confirmación se debe suscribir al servicio, esperar una respuesta de tipo `true` y realizar cualquier evento deseado

*cualquier.component.ts*
```ts

    cualquierFuncion(){
        this._alerta.enviarMensajeAlerta({mensaje: 'El usuario que buscas aún no está registrado'})
        .suscribe( respuesta => {
            if (respuesta) {
                // hacer cualquier cosa
            }
        })
    }
    
```

El botón de confirmación está configurado por default como *"aceptar"* si se desea personalizar la etiqueta del botón se debe agregar un segundo parametro en la función.


*cualquier.component.ts*
```ts

    cualquierFuncion(){
        this._alerta.enviarMensajeAlerta({
            mensaje: 'El usuario que buscas aún no está registrado',
            confirmacion: 'OK'
            })
        .suscribe( respuesta => {
            if (respuesta) {
                // hacer cualquier cosa
            }
        })
    }
    
```

### PREGUNTAS

El servicio recibe una pregunta a través de la función `enviarAlertaPregunta()` el cual requiere **al menos** un argumento como mensaje en forma de *string*.

*cualquier.component.ts*
```ts

    cualquierFuncion(){
        this._alerta.enviarAlertaPregunta({mensaje: '¿Deseas eliminar el usuario?'})
    }

```

Esta función activará la ventana emergente de alertas pero y esperará una respuesta. Para ello habrá que suscribirse y obtener una respuesta de tipo `boolean` y realizar cualquier evento deseado a partir de la respuesta obtenida

*cualquier.component.ts*
```ts

    cualquierFuncion(){
        this._alerta.enviarAlertaPregunta({mensaje: '¿Deseas eliminar el usuario?'})
        .suscribe( (respuesta: boolean) => {
            if (respuesta) {
                // hacer cualquier cosa en base a la confirmación
            } else {
                // hacer cualquier otra cosa si no se confirmó
            }
        })
    }
    
```

Los botones de respuestas están configurado por default como *"aceptar"* y *"cancelar"*. Si se desea personalizar la etiqueta de los botones se debe agregar un segundo y un tercer parametro en la función.


*cualquier.component.ts*
```ts

    cualquierFuncion(){
        this._alerta.enviarAlertaPregunta({
            mensaje: '¿Deseas eliminar el usuario?',
            respTrue: 'SÍ',
            respFalse: 'NO'
        }).suscribe( (respuesta: boolean) => {
            if (respuesta) {
                // hacer cualquier cosa en base a la confirmación
            } else {
                // hacer cualquier otra cosa si no se confirmó
            }
        })
    }
    
```

