const express = require('express');
const passport = require('./samlAuth');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/auth/saml', passport.authenticate('saml', { failureRedirect: '/' }));

app.post('/api/auth/saml/callback',
  passport.authenticate('saml', { failureRedirect: '/' }),
  (req, res) => {
    console.log("Authenticated User:", req.user);
    res.redirect(`http://localhost:3000/dashboard?user=${encodeURIComponent(JSON.stringify(req.user))}`);
  }
);

app.get('/api/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));