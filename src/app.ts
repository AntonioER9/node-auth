import { envs } from './config/envs';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';



(async () => { //Función anonima autoinvocada
  main();
})();


async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const server = new Server();
  const routes = AppRoutes.routes;

  server.start({
    port: envs.PORT,
    routes: routes,
  });
}