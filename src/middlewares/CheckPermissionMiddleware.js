export default function checkPermission(permission) {
    return (req, res, next) => {
      if (req.user && Array.isArray(req.user.permissions)) {
        // Verifica se a permissão está no array
        if (req.user.permissions.includes(permission)) {
          return next(); // Permissão encontrada, segue para o próximo middleware ou rota
        } else {
          return res.status(403).json({ error: 'Permissão negada' }); // Permissão não encontrada
        }
      } else {
        return res.status(401).json({ error: 'Usuário não autenticado ou permissões ausentes' }); // Caso o usuário não tenha permissões
      }
    };
}