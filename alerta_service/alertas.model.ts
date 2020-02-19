export class MensajeAlertaModel {
    constructor(
        public mensaje: string,
        public confirmacion?: string
    ){}
}

export class PreguntaAlertaModel {
    constructor(
        public mensaje: string,
        public respTrue?: string,
        public respFalse?: string
    ){}
}