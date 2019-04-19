import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import socketIO from 'socket.io';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}
 
export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario( cliente.id );

        io.emit('usuarios-activos', usuariosConectados.getLista());

    });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('mensaje', ( payload: {de:string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });

}
// Escuchar peticion usuarios
export const peticion = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('petition-usuarios-activos', () => {
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());
        //io.in( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());
        //cliente.emit('usuarios-activos', usuariosConectados.getLista());
    });

}

// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: {nombre: string }, callback: Function ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());
        
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        })
    });
}