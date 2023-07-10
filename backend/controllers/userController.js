import User from "../models/User.js";
import genId from "../helpers/genId.js";
import genJWT from "../helpers/genJWT.js";

const registerUser = async (req, res) => {

    const { email } = req.body;
    const userRegistered = await User.findOne({ email });

    if(userRegistered) {
        const error = new Error('User already registered');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = genId();
        await user.save();
        res.json({ msg: 'User created succesfully!, check your email to confirm your account' });
    } catch (error) {
        console.log(error)
    }
};

const autenticate = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        const error = new Error("User do not exist");
        return res.status(404).json({ msg: error.message });
    }

    if(!user.confirmed) {
        const error = new Error("User has not been confirmed");
        return res.status(403).json({ msg: error.message });
    }

    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: genJWT(user._id),
        });
    } else {
        const error = new Error("Incorrect password");
        return res.status(403).json({ msg: error.message });
    };
};

const confirm = async (req, res) => {
    const { token } = req.params;
    const confirmUser = await User.findOne({ token });
    
    if(!confirmUser) {
        const error = new Error("Invalid token!");
        return res.status(403).json({ msg: error.message });
    }

    try {
        confirmUser.confirmed = true;
        confirmUser.token = "";
        await confirmUser.save();
        res.json({ msg: "User confirmed successfully!" })
    } catch (error) {
        console.log(error);
    }
};

const forgotPassword = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        const error = new Error("User do not exist");
        return res.status(404).json({ msg: error.message });
    }

    try {
        user.token = genId();
        await user.save();
        res.json({ msg: "We have sent an email with the instructions!" });
    } catch (error) {
        console.log(error);
    }
};

const checkToken = async (req, res) => {
    const { token } = req.params;
    const confirmUser = await User.findOne({ token }); 

    if(confirmUser) {
        res.json({ msg: "Valid token!" });
    } else {
        const error = new Error("Invalid token!");
        return res.status(403).json({ msg: error.message });
    }
};

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token }); 

    if(user) {
        user.password = password;
        user.token = '';
        
        try {
            await user.save();
            res.json({ msg: "Password modified succesfully!" });
        } catch (error) {
            console.log(error);
        }

    } else {
        const error = new Error("Invalid token!");
        return res.status(403).json({ msg: error.message });
    }
};

const profile = async (req, res) => {
    const { user } = req;
    res.json(user);
};

export {
    registerUser,
    autenticate,
    confirm,
    forgotPassword,
    checkToken,
    newPassword,
    profile,
}