import express from 'express';
const router = express.Router();
import pool from '../database/db.js'; 
import maquillajes from '../database/query.js'; 

const maquillajesModel = new maquillajes(pool);


router.get('/maquillajes', async (req, res) => {
    try {
        const maquillaje = await maquillajesModel.getproductosm();
        res.json(maquillaje);
    } catch (error) {
        console.error('Error al obtener maquillaje:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.get('/maquillajes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const maquillaje = await maquillajesModel.getproductosmById(id);
        if (maquillaje.length === 0) {
            res.status(404).send('maquillaje no encontrado');
        } else {
            res.json(maquillaje[0]);
        }
    } catch (error) {
        console.error('Error al obtener maquillaje por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/maquillajes', async (req, res) => {
    const { nombre, marca, cantidad } = req.body;
    try {
        const result = await maquillajesModel.addproductosm(nombre, marca, cantidad );
        res.status(201).send(`maquillaje agregado con ID: ${result.insertId}`);
    } catch (error) {
        console.error('Error al agregar maquillaje:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.put('/maquillajesUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, cantidad } = req.body;
    try {
        const result = await maquillajesModel.updateproductosm(id, nombre, marca, cantidad);
        if (result.affectedRows === 0) {
            res.status(404).send('maquillaje no encontrado');
        } else {
            res.send(`maquillaje con ID ${id} actualizado`);
        }
    } catch (error) {
        console.error('Error al actualizar maquillaje:', error);
        res.status(500).send('Error en el maquillaje');
    }
});

router.delete('/maquillajesDelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await maquillajesModel.deleteproductosm(id);
        if (result.affectedRows === 0) {
            res.status(404).send('maquillaje no encontrado');
        } else {
            res.send(`maquillaje con ID ${id} eliminado`);
        }
    } catch (error) {
        console.error('Error al eliminar maquillaje:', error);
        res.status(500).send('Error en el servidor');
    }
});

export default router;
