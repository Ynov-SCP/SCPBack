const request = require('supertest');
const express = require('express');
const { sequelize, User, SCP } = require('../models');
const authRoutes = require('../routes/authRoutes');
const scpRoutes = require('../routes/scpRoutes');
const errorHandler = require('../middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/scps', scpRoutes);
app.use(errorHandler);

let token = '';
let scpId = null;

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset DB

    // Inscription
    await request(app).post('/api/auth/register').send({
        email: 'test@scp.com',
        password: 'secure123'
    });

    // Connexion
    const res = await request(app).post('/api/auth/login').send({
        email: 'test@scp.com',
        password: 'secure123'
    });

    token = res.body.token;
});

afterAll(async () => {
    await sequelize.close();
});

describe('SCP CRUD', () => {
    it('Ajoute un SCP', async () => {
        const res = await request(app)
            .post('/api/scps')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'SCP-173',
                objectClass: 'Euclid',
                description: 'Statue vivante',
                procedures: 'Toujours être regardée'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('SCP-173');
        scpId = res.body.id;
    });

    it('Modifie le SCP', async () => {
        const res = await request(app)
            .put(`/api/scps/${scpId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ objectClass: 'Keter' });

        expect(res.statusCode).toBe(200);
        expect(res.body.objectClass).toBe('Keter');
    });

    it('Supprime le SCP', async () => {
        const res = await request(app)
            .delete(`/api/scps/${scpId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('SCP supprimé');
    });
});
