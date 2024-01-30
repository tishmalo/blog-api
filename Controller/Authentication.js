const { User } = require('../Model/model');
const config = require('../config/config');
const jwt = require('jwt-simple');


exports.login = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // No user found with the provided email
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Check if the password is correct

        // If authentication is successful, generate a token
        var payload = {
            id: user._id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 6
        };

        var token = jwt.encode(payload, config.jwtSecret);

        return res.status(200).json({
            msg: 'Login Successful....!',
            username: user.username ?? user.username,
            token,
            user: user._id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
};


//register
exports.register = async function (req, res) {

    const { username, password, email } = req.body;

    try {
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, password, and email are required.' });
        }

        const [existingUsername, existingEmail] = await Promise.all([
            User.findOne({ username }),
            User.findOne({ email })
        ]);

        if (existingUsername) {
            return res.status(400).json({ error: "Username already in use." });
        }

        if (existingEmail) {
            return res.status(400).json({ error: "Email Address already in use." });
        }

        const newUser = new User({ email, username });

        User.register(newUser, req.body.password, async (err, registeredUser) => {
            if (err) {
                return res.status(500).json({
                    msg: "Internal server error: " + err,
                });
            } else {
                await newUser.save();

                return res.status(201).json({
                    msg: "User registered successfully.",
                    data: registeredUser
                });
            }
        });


        // if(password){
        //     const hashedPassword = await bcrypt.hash(password, 10);

        //     const user = new User({
        //         username,
        //         password: hashedPassword,
        //         email,
        //     });

        //     await user.save();

        //     return res.status(201).json({ 
        //         msg: "User registered successfully.",
        //         data: user
        //     });
        // }
    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }



}

exports.profile = function(req, res) {
    console.log(req.user._id)
    res.json({
      message: 'You made it to the secured profile'
    })
  }