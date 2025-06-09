const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require ('./models/user');
const authRouter = require ('./routers/auth/loginRouter');
const produitRouter = require ('./routers/admin/ProduitLiquideRouter')
const liquideRouter = require ('./routers/admin/LiquideRouter')
const vapeRouter = require ('./routers/admin/VapeRouter')
const accessoireRouter = require ('./routers/admin/AccessoireRouter')
const serviceRouter = require ('./routers/admin/ServiceRouter')
const employeRouter = require ('./routers/admin/EmployeRouter')
const venteRouter = require ('./routers/VenteRouter')
const salaryRouter = require ('./routers/admin/SalaireRouter')
const financeRouter = require ('./routers/admin/FinanceRouter')
const StatistiquesRouter = require ('./routers/admin/StatistiqueRouter')
const settingsRouter = require ('./routers/settingsRouter')
const { verifyToken } = require('./middleware/authMiddleware');
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Votre app est lancée');
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000', // ton frontend
  credentials: true
}));

// Authentification

app.use('/auth',authRouter);
app.use('/api/settings',verifyToken, settingsRouter);

app.get('/api/auth/me', verifyToken, (req, res) => {
  
  res.json({
    id: req.user.id,
    role: req.user.role,
  });
});
// Gestion admin
app.use('/api/produits', verifyToken, produitRouter );
app.use('/api/liquides', verifyToken, liquideRouter );
app.use('/api/vapes', verifyToken, vapeRouter );
app.use('/api/accessoires', verifyToken, accessoireRouter );
app.use('/api/services', verifyToken, serviceRouter );
app.use('/api/employes', verifyToken, employeRouter );
app.use('/api/salary', verifyToken, salaryRouter );
app.use('/api/finance', financeRouter );
app.use('/api/statistiques', StatistiquesRouter );

//ventes 

app.use('/api/ventes',verifyToken, venteRouter );

// DB + Start
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
console.log("MongoDB connected");
const existAdmin = await User.findOne({role:'admin'});
if(!existAdmin){
    const HashedPassword = await bcrypt.hash('Admin123',10);
    const adminUser = new User({
        name:'Admin',
        email:'raedtouati2550@gmail.com',
        password: HashedPassword,
        role: 'admin'
    });
    await adminUser.save();
    console.log('Admin creer');
}
else{
    console.log('Admin déjà existe');
}
app.listen(process.env.PORT, () => {
console.log(`Server running on port ${process.env.PORT}`);
});
})
.catch(err => console.log(err)); 
