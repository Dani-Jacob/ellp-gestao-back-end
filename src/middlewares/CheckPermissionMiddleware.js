export default function checkPermission(permission) {
    return (req, res, next) => {
      if (req.user && Array.isArray(req.user.permissions)) {

        if (req.user.permissions.includes(permission)) {
          return next(); 
        } else {
          return res.status(403).json({ error: 'Permissão negada' }); 
        }
      } else {
        return res.status(401).json({ error: 'Usuário não autenticado ou permissões ausentes' }); 
      }
    };
}