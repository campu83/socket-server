// Archivo donde declarar las constantes necesarias de node

// El caso de process.env.PORT es porque si lo montamos en un hosting nos vendrá en ese variable el puerto permitido
// sino hay ningun puerto (como al probarlo en local), se usará el 5000
export const SERVER_PORT: number =  Number( process.env.PORT) || 5000;