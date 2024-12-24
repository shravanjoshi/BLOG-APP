const { validateUserToken } = require('../service/auth');

function checkForAuthentication(cookieName){
    return (req,res,next)=>{
        const token = req.cookies[cookieName];
        if(!token){
            return next();
        }
        try {
            const payload = validateUserToken(token);
            req.user = payload;
        } catch (error) {
            
        }
        return next();
    }
}

module.exports = { checkForAuthentication };