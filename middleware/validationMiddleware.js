const validateUser = (req, res, next) => {
    const { email, password, username } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username; use correct format' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Invalid password; use correct format' });
    }

    if (password.length < 5) {
        return res.status(400).json({ error: 'Password should be more than 5 characters' });
    }

    next();
};

export default validateUser;
