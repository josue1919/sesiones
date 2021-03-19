const User = require("../models/Users");

module.exports = {
  //para traer todos los usuarios
  index: async function (req, res) {
    await User.find()
      .sort({ date: "desc" })
      .then((documentos) => {
        const contexto = {
          users: documentos.map((documento) => {
            return {
              name: documento.name,
              email: documento.email,
              _id: documento._id,
            };
          }),
        };
        res.render("users/all-user", {
          users: contexto.users,
        });
      });
  },
  //para guardar usuarios

  guardar: async function (req, res) {
    var errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (!name || !email || !password || !confirm_password) {
      errors.push({ text: "Algun dato esta vacio" });
    }
    if (password != confirm_password) {
      errors.push({ text: "contraseñas no coinciden" });
    }
    if (password.length < 4) {
      errors.push({ text: "contraseña debe ser mayor a 4 caracteres." });
    }
    if (errors.length > 0) {
      res.render("users/add-user", {
        errors,
        name,
        email,
        password,
        confirm_password,
      });
    } else {
      // Look for email coincidence

      // Saving a New User
      const emailUser = await User.findOne({ email: email });
      if (emailUser) {
        req.flash("error_msg", "EL correo electronico ya esta en uso");

        res.redirect("/users/add");
      } else {
        // Saving a New User
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash("success_msg", "Usuario registrado");
        res.redirect("/users/all");
      }
    }
  },

  //para obter la ruta de la edicion
  getEdit: async function (req, res) {
    console.log(req.params.id);
    const users = await User.findById(req.params.id)
      .lean()

      .then((documento) => {
        return {
          name: documento.name,
          email: documento.email,
          _id: documento._id,
        };
      });
    res.render("users/edit-user", { users });
  },

  //metodo put para hacer update en la bd
  Update: async function (req, res) {
    const { name, email, password } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email, password });
    req.flash("success_msg", "El usuario a sido actualizado");
    res.redirect("/users/all");
  },

  //eliminar un usuario

  Delete: async function (req, res) {
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    req.flash("sucess_msg", "Usuario eliminado satisfactoriamente");
    res.redirect("/users/all");
  },
};
