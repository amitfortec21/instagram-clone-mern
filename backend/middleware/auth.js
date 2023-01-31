export const isLogout = async (req, res, next) => {
    try {
        if(req.session.user){ return res.send({ message: "User already logged in... Please logout first!", sessionStorage: req.session }) }
        next();
    } catch (error) {
        return res.send({ loggedIn: false, sessionStorage: req.session })
    }
}

export const isLogin = async (req, res, next) => {
    try {
        if(!req.session.user){ return res.send({ message: "Please login first!", sessionStorage: req.session }) }
        next();
    } catch (err) { return res.send({ message: err.message }) }
}
