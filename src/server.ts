import './util/module-alias';
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser';

export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();
    }

    //Separa a inicialização da aplicação e permitindo que quem inicie o server tenha controle total de como o server será inicializado
    //1° controi o SetupServer e depois chama o init. Não chama no construtor pois teremos operações assincronas.
    public init(): void {
        this.setupExpress();
    }
    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }
}