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

Antes de usar los components se debe instalar las dependencias mediante las siguientes opciones

### NPM
`npm i jQuery materialize @types/jquery @types/materialize-css --save`

Luego de completada la instalación de los paqutes, es necesario incluir en el `angular.json` los scripts y estilos
```json
{
    "styles": [
        "node_modules/materialize-css/dist/css/materialize.css",

    ],
    "scripts": [
        "node_modules/materialize-css/dist/js/materialize.js",
        "node_modules/jquery/dist/jquery.js",
    ]
}
```


### CDN's

```html
<!-- FONTAWESOME -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<!-- MATERIALIZE -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
```


### Instalación del componente

1. Copiar y pegar la carpeta **alerta_service** en el area de componentes del proyecto
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
import { AlertaService } from '/components/alerta_service/alertas.component';

export class CualquierComponent implements OnInit {

    constructor(
        private _alerta: AlertaService
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


### ESTILOS

Para modificar estilos y colores con la librería de *materialize*, puedes revisar la documentación en http://archives.materializecss.com/0.100.2/getting-started.html.

#### Colores

Los colores del cuadro de diálogo son fácil de editar usando la librería de *materialize* que se encuentra en http://archives.materializecss.com/0.100.2/color.html.

##### Ejemplo
*alertas.component.html*
```html
<!-- Por defaul el cuadro viene en gris definido por "grey lighten-1" -->
<div class="pop-up grey lighten-1"> 

        <div class="col s12">
            <!-- "black-text" define el ícono de cerrado en negro -->
            <i class="fas fa-times right black-text" (click)="onClose()"></i>
        </div>

        
        <div class="row">
            <div class="col s12 center">
                <!-- "black-text" define el color de la fuente del mensaje en negro -->
                <p class="black-text">{{alerta.mensaje}}</p>
            </div>
        </div>

        <div class="col s12">
            <!-- El color de fondo del boton se define en blanco escribiendo "white" y el texto en negro -->
            <button class="btn white black-text" (click)="getResponse(true)">{{alerta.confirmacion}}</button>
        </div>

</div>
```

