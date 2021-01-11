import express from 'express';

import { createRoles } from './libs/initialSetup';

import UsersRoutes from './routes/users.routes';
import ProductsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';

const app = express();
createRoles();

// settings
app.set('port', process.env.PORT || 3000);

app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my application'})
})

app.use( '/api/auth', authRoutes );
app.use( '/api/users', UsersRoutes );
app.use( '/api/products', ProductsRoutes );

export default app;