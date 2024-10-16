require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Patient Schema
const patientSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    houseAddress: String,
    gender: String,
    dateOfBirth: Date,
    bloodType: String,
    chronicConditions: [String],
    allergies: String,
    medications: String,
    previousSurgeries: String,
    familyMedicalHistory: String,
    vaccinationRecords: String,
    labResults: String,
    doctorNotes: String,
    lifestyleInfo: String,
    vitalSigns: [{
        heartRate: Number,
        bloodPressure: String,
        bodyTemperature: Number,
        respiratoryRate: Number,
        oxygenSaturation: Number,
        bloodGlucoseLevels: Number,
        date: { type: Date, default: Date.now }
    }]
});

const Patient = mongoose.model('Patient', patientSchema);

// Routes

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// Registration Route
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { name, phoneNumber } = req.body;
    try {
        const newPatient = new Patient({ name, phoneNumber });
        await newPatient.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering patient.');
    }
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { name, phoneNumber } = req.body;
    try {
        const patient = await Patient.findOne({ name, phoneNumber });
        if (patient) {
            res.redirect(`/dashboard/${patient._id}`);
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
});

// Patient Dashboard
app.get('/dashboard/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        res.render('patient-dashboard', { patient });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading dashboard.');
    }
});

// Save Patient Info
app.post('/dashboard/:id', async (req, res) => {
    const { email, dateOfBirth, houseAddress, gender, bloodType, chronicConditions, allergies, medications, previousSurgeries, familyMedicalHistory, vaccinationRecords, labResults, doctorNotes, lifestyleInfo, heartRate, bloodPressure, bodyTemperature, respiratoryRate, oxygenSaturation, bloodGlucoseLevels } = req.body;
    const patientId = req.params.id;

    // Update patient information
    await Patient.findByIdAndUpdate(patientId, {
        email,
        dateOfBirth,
        houseAddress,
        gender,
        bloodType,
        chronicConditions,
        allergies,
        medications,
        previousSurgeries,
        familyMedicalHistory,
        vaccinationRecords,
        labResults,
        doctorNotes,
        lifestyleInfo,
        $push: {
            vitalSigns: { // Ensure you are pushing the vital signs into an array
                heartRate,
                bloodPressure,
                bodyTemperature,
                respiratoryRate,
                oxygenSaturation,
                bloodGlucoseLevels
            }
        }
    });

    res.redirect('/dashboard/' + patientId); // Redirect to the patient's dashboard
});


// Practitioner Login
app.get('/practitioner-login', (req, res) => {
    res.render('practitioner-login');
});

app.post('/practitioner-login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'Mouau' && password === 'Mouau') {
        res.redirect('/practitioner-dashboard');
    } else {
        res.redirect('/practitioner-login');
    }
});

// Practitioner Dashboard
app.get('/practitioner-dashboard', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render('practitioner-dashboard', { patients });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading dashboard.');
    }
});

// View Full Patient Record
app.get('/patient-record/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        res.json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching record.');
    }
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
