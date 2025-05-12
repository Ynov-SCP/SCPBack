const { SCP } = require('../models');

exports.getAll = async (req, res, next) => {
    try {
        const scps = await SCP.findAll();
        res.json(scps);
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        const scp = await SCP.findByPk(req.params.id);
        if (!scp) return res.status(404).json({ error: 'SCP non trouvé' });
        res.json(scp);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const scp = await SCP.create(req.body);
        res.status(201).json(scp);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const scp = await SCP.findByPk(req.params.id);
        if (!scp) return res.status(404).json({ error: 'SCP non trouvé' });

        await scp.update(req.body);
        res.json(scp);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const scp = await SCP.findByPk(req.params.id);
        if (!scp) return res.status(404).json({ error: 'SCP non trouvé' });

        await scp.destroy();
        res.json({ message: 'SCP supprimé' });
    } catch (err) {
        next(err);
    }
};
