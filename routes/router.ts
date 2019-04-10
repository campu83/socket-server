// Rutas REST que generamos
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    //Lectura de los parámetros 
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    //Lectura de la url
    const id = req.params.id;

    res.json({
        ok: true,
        cuerpo, // Eso es lo mismo que poner cuerpo: cuerpo
        de,
        id,
        mensaje: 'POST - Listo'
    });

});

export default router;