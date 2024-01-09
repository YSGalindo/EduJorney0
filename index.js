const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const uri = "mongodb+srv://edujoney:clave123@cluster0.piepdob.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

async function run() {
  try {
    await client.connect();
    const db = client.db('edujoney');
    const collection = db.collection('instituciones');
    const collectionCursos = db.collection('cursos');

    // Endpoint para obtener todas las instituciones
    app.get('/instituciones', async (req, res) => {
      const instituciones = await collection.find().toArray();
      res.json(instituciones);
    });

    // Endpoint para obtener todas las cursos
    app.get('/cursos', async (req, res) => {
        const cursos = await collectionCursos.find().toArray();
        res.json(cursos);
      });

    // Endpoint para obtener una institución por ID
    app.get('/instituciones/:id', async (req, res) => {
      const id = req.params.id;
      const institucion = await collection.findOne({ _id: ObjectId(id) });

      if (institucion) {
        res.json(institucion);
      } else {
        res.status(404).json({ error: 'Institución no encontrada' });
      }
    });

    // Endpoint para agregar una nueva institución
    app.post('/instituciones', async (req, res) => {
      const nuevaInstitucion = req.body;

      const result = await collection.insertOne(nuevaInstitucion);
      res.json(result.ops[0]);
    });

    // Endpoint para actualizar una institución por ID
    app.put('/instituciones/:id', async (req, res) => {
      const id = req.params.id;
      const actualizacion = req.body;

      const result = await collection.updateOne({ _id: ObjectId(id) }, { $set: actualizacion });

      if (result.modifiedCount === 1) {
        res.json({ mensaje: 'Institución actualizada correctamente' });
      } else {
        res.status(404).json({ error: 'Institución no encontrada' });
      }
    });

    // Endpoint para eliminar una institución por ID
    app.delete('/instituciones/:id', async (req, res) => {
      const id = req.params.id;

      const result = await collection.deleteOne({ _id: ObjectId(id) });

      if (result.deletedCount === 1) {
        res.json({ mensaje: 'Institución eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Institución no encontrada' });
      }
    });

    // Iniciar el servidor después de conectarse a la base de datos
    app.listen(port, () => {
      console.log(`Servidor en funcionamiento en http://localhost:${port}`);
    });
  } finally {
    // Close the database connection when finished or an error occurs
    // await client.close();
  }
}

run().catch(console.error);
