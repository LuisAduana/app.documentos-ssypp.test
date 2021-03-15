export default {
  actividadesRules: [
    v => !!v || "Actividades requeridas",
    v => (v && v.length <= 250) || "Las actividades son demasiado largas"
  ],
  actividades_funcionalesRulesOpcional: [
    v => v.length <= 250 || "Las actividades son demasiado larga"
  ],
  apellido_paternoRules: [
    v => !!v || "El apellido paterno es requerido",
    v => (v && v.length <= 45) || "El apellido es demasiado largo"
  ],
  apellido_maternoRules: [
    v => !!v || "El apellido materno es requerido",
    v => (v && v.length <= 45) || "El apellido es demasiado largo"
  ],
  bloqueRules: [
    v => !!v || "El bloque es requerido",
    v => /^([0-9]{1})$/.test(v) || "Bloque inválido"
  ],
  cargoRules: [
    v => !!v || "Cargo requerido",
    v => (v && v.length <= 100) || "Es demasiado largo"
  ],
  ciudadRules: [
    v => !!v || "La ciudad es requerida",
    v => (v && v.length <= 120) || "La ciudad es demasiado larga"
  ],
  correoRules: [
    v => !!v || "Correo requerido",
    v => /.+@.+\..+/.test(v) || "El correo no es válido",
    v => (v && v.length <= 150) || "El correo es demasiado largo"
  ],
  descripcion_generalRules: [
    v => !!v || "Descripción requerida",
    v => (v && v.length <= 250) || "La descripción es demasiado larga"
  ],
  direccionRules: [
    v => !!v || "Dirección requerida",
    v => (v && v.length <= 250) || "La dirección es demasiado larga"
  ],
  duracionRulesOpcional: [
    v => v.length <= 200 || "La duración del proyecto es demasiado largo"
  ],
  horarioRules: [
    v => !!v || "Horario requerido",
    v => (v && v.length <= 100) || "El horario es demasiado largo"
  ],
  horarioRulesOpcional: [
    v => v.length <= 200 || "El horario del proyecto es demasiado largo"
  ],
  matriculaRules: [
    v => !!v || "La matrícula es requerida",
    v => /^(S[0-9]{8})$/.test(v) || "Matrícula inválida"
  ],
  metodologiaRulesOpcional: [
    v => v.length <= 50 || "La metodología es demasiado larga"
  ],
  nombre_contactoRules: [
    v => !!v || "Nombre de contacto requerido",
    v => (v && v.length <= 200) || "El nombre de contacto demasiado largo"
  ],
  nombre_dependenciaRules: [
    v => !!v || "Nombre de dependencia requerido",
    v => (v && v.length <= 230) || "El nombre de dependencia demasiado largo"
  ],
  nombre_proyectoRules: [
    v => !!v || "Nombre del proyecto requerido",
    v => (v && v.length <= 250) || "El nombre del proyecto es demasiado largo"
  ],
  nombre_responsableRules: [
    v => !!v || "Nombre de responsable requerido",
    v => (v && v.length <= 120) || "El nombre de responsable es demasiado largo"
  ],
  nombresRules: [
    v => !!v || "El nombre de usuario es requerido",
    v => (v && v.length <= 90) || "El nombre es demasiado largo"
  ],
  num_alumnosRules: [
    v => !!v || "No. de alumnos requerido",
    v => (v && v.length <= 45) || "El campo es demasiado largo"
  ],
  num_contactoRules: [
    v => !!v || "Número de contacto requerido",
    v => (v && v.length >= 10) || "El número es demasiado corto",
    v => (v && v.length <= 20) || "El número es demasiado largo"
  ],
  num_personalRules: [
    v => !!v || "Número personal requerido",
    v => /^([0-9]{10})$/.test(v) || "Número incorrecto"
  ],
  num_usRules: [
    v => !!v || "No. ususarios requerido",
    v => (v && v.length <= 30) || "El número es demasiado largo"
  ],
  objetivo_generalRules: [
    v => !!v || "Objetivo requerido",
    v => (v && v.length <= 250) || "El objetivo es demasiado largo"
  ],
  objetivos_inmediatosRules: [
    v => !!v || "Objetivo requerido",
    v => (v && v.length <= 250) || "El objetivo inmediato es demasiado largo"
  ],
  objetivos_mediatosRules: [
    v => !!v || "Objetivo requerido",
    v => (v && v.length <= 250) || "El objetivo mediato es demasiado largo"
  ],
  passwordRules: [
    v => !!v || "La contraseña es requerida",
    v => (v && v.length >= 7) || "La contraseña es demasiado corta",
    v => (v && v.length <= 120) || "La contraseña es demasiado larga"
  ],
  requisitosRules: [
    v => !!v || "Requisitos requerido",
    v => (v && v.length <= 250) || "Las actividades son demasiado largas"
  ],
  responsabilidadesRulesOpcionales: [
    v => v.length <= 200 || "Las actividades son demasiado larga"
  ],
  seccionRules: [
    v => !!v || "La sección es requerida",
    v => /^([0-9]{1})$/.test(v) || "Sección incorrecta"
  ],
  sectorRules: [
    v => !!v || "El sector es requerido",
    v => (v && v.length <= 50) || "El sector es demasiado largo"
  ],
  tokenRules: [
    v => !!v || "Token requerido",
    v => (v && v.length <= 5) || "El número es demasiado largo"
  ]
};
