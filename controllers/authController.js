const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginSchema } = require('../schema/authSchema');

exports.login = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const { email, password } = value;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Mot de passe invalide' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body); // même schéma
        if (error) return res.status(400).json({ error: error.message });

        const existingUser = await User.findOne({ where: { email: value.email } });
        if (existingUser) return res.status(409).json({ error: 'Utilisateur déjà existant' });

        const hashedPassword = await bcrypt.hash(value.password, 10);
        const newUser = await User.create({ email: value.email, password: hashedPassword });

        res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
        next(err);
    }
};