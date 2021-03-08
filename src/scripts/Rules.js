const correoRules = [
  v => !!v || "Correo requerido",
  v => /.+@.+\..+/.test(v) || "El correo no es válido",
  v => (v && v.length <= 150) || "El correo es demasiado largo"
];
const passwordRules = [
  v => !!v || "La contraseña es requerida",
  v => (v && v.length >= 7) || "La contraseña es demasiado corta",
  v => (v && v.length <= 120) || "La contraseña es demasiado larga"
];
const nombre_dependenciaRules = [
  v => !!v || "Nombre de dependencia requerido",
  v => (v && v.length <= 230) || "El nombre de dependencia demasiado largo"
];
const nombre_contactoRules = [
  v => !!v || "Nombre de contacto requerido",
  v => (v && v.length <= 200) || "El nombre de contacto demasiado largo"
];
const direccionRules = [
  v => !!v || "Dirección requerida",
  v => (v && v.length <= 250) || "La dirección es demasiado larga"
];
const ciudadRules = [
  v => !!v || "La ciudad es requerida",
  v => (v && v.length <= 120) || "La ciudad es demasiado larga"
];
const num_contactoRules = [
  v => !!v || "Número de contacto requerido",
  v => (v && v.length >= 10) || "El número es demasiado corto",
  v => (v && v.length <= 20) || "El número es demasiado largo"
];
const sectorRules = [
  v => !!v || "El sector es requerido",
  v => (v && v.length <= 50) || "El sector es demasiado largo"
];
const num_usRules = [
  v => !!v || "No. ususarios requerido",
  v => (v && v.length <= 30) || "El número es demasiado largo"
];

export {
  ciudadRules,
  correoRules,
  direccionRules,
  nombre_contactoRules,
  nombre_dependenciaRules,
  num_contactoRules,
  num_usRules,
  passwordRules,
  sectorRules
};
