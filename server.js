/*const express = require('express');
const path = require('path');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Set views folder
app.set('views', path.join(__dirname, 'views'));

// Serve static files like CSS, images, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Landing Page
app.get('/', (req, res) => {
  res.render('index'); // renders views/index.ejs
});

// Login Page
app.get('/login', (req, res) => {
  res.render('login'); // renders views/login.ejs
});

// Signup Page
app.get('/signup', (req, res) => {
  res.render('signup'); // renders views/signup.ejs
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});*/

/*const express = require('express');
const path = require('path');
const session = require('express-session');
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
initializeApp({
  credential: cert(serviceAccount)
});

// Middleware setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.uid) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Login GET (render form)
app.get('/login', (req, res) => {
  if (req.session.uid) return res.redirect('/dashboard');
  res.render('login', {
    error: null,
    message: null,
    email: req.session.emailAttempt || ''
  });
});

// Login POST (handle submission)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  
  try {
    // Store email in session for potential resend
    req.session.emailAttempt = email;
    
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    if (!userCredential.user.emailVerified) {
      await auth.signOut();
      return res.render('login', {
        error: 'Please verify your email first. Check your inbox.',
        email: email
      });
    }
    
    // Clear session data and set auth
    delete req.session.emailAttempt;
    req.session.uid = userCredential.user.uid;
    res.redirect('/dashboard');
  } catch (error) {
    res.render('login', {
      error: error.message,
      email: email
    });
  }
});

// Signup GET (render form)
app.get('/signup', (req, res) => {
  if (req.session.uid) return res.redirect('/dashboard');
  res.render('signup', { error: null });
});

// Signup POST (handle submission)
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    
    // Send verification email
    await auth.sendEmailVerification(userCredential.user.uid);
    
    // Store email in session for login attempt
    req.session.emailAttempt = email;
    
    res.render('login', {
      message: 'Verification email sent! Please check your inbox.',
      email: email
    });
  } catch (error) {
    res.render('signup', {
      error: error.message
    });
  }
});

// Resend Verification POST
app.post('/resend-verification', async (req, res) => {
  const { email } = req.body;
  const auth = getAuth();
  
  try {
    const user = await auth.getUserByEmail(email);
    await auth.sendEmailVerification(user.uid);
    
    res.render('login', {
      message: 'Verification email resent! Check your inbox.',
      email: email
    });
  } catch (error) {
    res.render('login', {
      error: 'Could not resend verification: ' + error.message,
      email: email
    });
  }
});

// Dashboard (protected)
app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.uid });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});*/

/*const express = require('express');
const path = require('path');
const session = require('express-session');
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const bodyParser = require('body-parser');

const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
initializeApp({
  credential: cert(serviceAccount)
});

// Middleware setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.uid) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Login GET (render form)
app.get('/login', (req, res) => {
  if (req.session.uid) return res.redirect('/dashboard');
  res.render('login', {
    error: null,
    message: null,
    email: req.session.emailAttempt || ''
  });
});

// Login POST (handle submission)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    if (!userCredential.user.emailVerified) {
      await auth.signOut();
      return res.status(401).json({
        success: false,
        error: 'Please verify your email first. Check your inbox.'
      });
    }
    
    req.session.uid = userCredential.user.uid;
    res.json({
      success: true,
      redirect: '/dashboard'
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
});

// Signup GET (render form)
app.get('/signup', (req, res) => {
  if (req.session.uid) return res.redirect('/dashboard');
  res.render('signup', { error: null });
});

// Signup POST (handle submission)
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    
    // Send verification email
    await auth.sendEmailVerification(userCredential.user.uid);
    
    res.json({
      success: true,
      message: 'Verification email sent! Please check your inbox.',
      redirect: '/login'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Dashboard (protected)
app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.uid });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});*/
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Firebase Admin SDK initialization
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing JSON body (needed for sessionLogin)
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

// Middleware to check if user is authenticated via session cookie
function isAuthenticated(req, res, next) {
  const sessionCookie = req.cookies.session || '';
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      req.user = decodedClaims;
      next();
    })
    .catch((error) => {
      res.redirect('/login');
    });
}

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login'); // Your login.html renamed to login.ejs and placed in /views
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

// Session login (called from frontend after Firebase Auth)
app.post('/sessionLogin', async (req, res) => {
  const idToken = req.body.idToken;
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: false }; // secure: true if using HTTPS
    res.cookie('session', sessionCookie, options);
    res.status(200).send('Session login successful');
  } catch (error) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

app.get('/logout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/login');
});

// Fallback for unknown POST to /login (prevent error)
app.post('/login', (req, res) => {
  res.status(404).send("Direct login is not supported. Use Firebase authentication.");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

