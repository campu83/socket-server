// Rutas REST que generamos
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    //Conectamos al websocket
    const server = Server.instance;
    //Enviamos por broadcast
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });

});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    //Lectura de los parámetros 
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    //Lectura de la url
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }
    //Conectamos al websocket
    const server = Server.instance;
    // Enviamos un mensaje a esta id en particular (mensaje privado.)
    server.io.in( id ).emit('mensaje-privado', payload); //sin in( id ) se enviaría a todos.

    res.json({
        ok: true,
        cuerpo, // Eso es lo mismo que poner cuerpo: cuerpo
        de,
        id,
        mensaje: 'POST - Listo'
    });

});

// Servicio para obtener los IDs de todos los usuarios
router.get('/usuarios', ( req: Request, res: Response ) =>{

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[]) => {
        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json( {
            ok: true,
            clientes
        });
    })
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) =>{
    
    res.json( {
        ok: true,
        clientes: usuariosConectados.getLista()
    });

});

export default router;