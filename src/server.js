const Hapi = require('@hapi/hapi');
const routes = require('./routes');//-------------> untuk manggil routes.js dipakai di bawah code, cek komen di kode bwh
 
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',

    routes: {//-----------------------> fungsi CORS atau Cross-Origin Response Sharing
      cors: {
        origin: ['*'],
      },
    },

  });
 
  server.route(routes);//-------------> untuk manggil routes.js
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();