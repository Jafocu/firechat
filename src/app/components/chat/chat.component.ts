import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {
  mensaje: string = '';
  elemento: any;

  constructor( public chatService: ChatService ) {

    this.chatService.cargarMensajes()
      .subscribe( () => {
        setTimeout( () => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);
      });

      // Si fem tota la lògica aquí pot haver-hi lentitut. Ho farem als serveis (Providers)
      // .subscribe( (mensajes: any[]) => {
      //  console.log( mensajes );
      //      });

   }

   // tslint:disable-next-line: typedef
   ngOnInit(){
     this.elemento = document.getElementById('app-mensajes');
   }

  enviar_mensaje(){
    console.log( this.mensaje);

    if( this.mensaje.length === 0 ){
      return;
    }
    this.chatService.agregarMensaje( this.mensaje)
    .then( () => this.mensaje = '')
    .catch( (err) => console.error('Error al enviar', err) );

  }

}
