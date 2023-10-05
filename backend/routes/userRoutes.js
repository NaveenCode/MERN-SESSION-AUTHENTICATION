const router = require('express').Router()
const User = require('../models/userModel')

router.post('/signup', async (req, res) => {
    const { name, email, password, image, title, description } = req.body
    try {
        if (!name || !email || !password || !image || !title || !description) {
            return res.json({ success: false, message: 'Please fil all  inputs' })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, message: 'Email already exists' })
        }
        await User.create({ name, email, password, image, title, description })
        return res.status(201).json({ success: true, message: 'Registration Successfull' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'incorrect email or password' });
        }


        const isPasswordMatch = await user.matchPassword(password);

        if (!isPasswordMatch) {
            return res.json({ message: false, message: 'Incorrect email or password' });

        }
        req.session.username = user.name

        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false })
    }
})
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
        res.json({ message: 'Logout successful' });
    });
});
router.get('/details', async (req, res) => {
    const users = await User.find({})
    res.status(201).json(users)

})


module.exports = router