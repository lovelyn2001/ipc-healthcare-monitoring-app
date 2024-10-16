// practitioner-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const viewRecordButtons = document.querySelectorAll('.view-record-btn');
    const modal = document.getElementById('record-modal');
    const modalContent = document.getElementById('patient-record');
    const closeModalButton = document.querySelector('.close');

    viewRecordButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const patientId = button.getAttribute('data-id');
            try {
                const response = await fetch(`/patient-record/${patientId}`);
                if (response.ok) {
                    const record = await response.json();
                    
                    // Format the record into a readable format
                    const formattedRecord = `
                        <strong>Name:</strong> ${record.name}<br>
                        <strong>Phone Number:</strong> ${record.phoneNumber}<br>
                        <strong>House Address:</strong> ${record.houseAddress}<br>
                        <strong>Gender:</strong> ${record.gender}<br>
                        <strong>Blood Type:</strong> ${record.bloodType}<br>
                        <strong>Email:</strong> ${record.email}<br>
                        <strong>Date of Birth:</strong> ${new Date(record.dateOfBirth).toLocaleDateString()}<br>
                        <strong>Chronic Conditions:</strong> ${record.chronicConditions.join(', ') || 'None'}<br>
                        <strong>Allergies:</strong> ${record.allergies || 'None'}<br>
                        <strong>Medications:</strong> ${record.medications || 'None'}<br>
                        <strong>Previous Surgeries:</strong> ${record.previousSurgeries || 'None'}<br>
                        <strong>Family Medical History:</strong> ${record.familyMedicalHistory || 'None'}<br>
                        <strong>Vaccination Records:</strong> ${record.vaccinationRecords || 'None'}<br>
                        <strong>Laboratory Results:</strong> ${record.labResults || 'None'}<br>
                        <strong>Doctor's Notes:</strong> ${record.doctorNotes || 'None'}<br>
                        <strong>Lifestyle Information:</strong> ${record.lifestyleInfo || 'None'}<br>
                        
                        <strong>Vital Signs:</strong><br>
                        ${record.vitalSigns.length > 0 ? record.vitalSigns.map(vital => `
                            - Heart Rate: ${vital.heartRate} BPM<br>
                            - Blood Pressure: ${vital.bloodPressure}<br>
                            - Body Temperature: ${vital.bodyTemperature} °C<br>
                            - Respiratory Rate: ${vital.respiratoryRate} breaths/min<br>
                            - Oxygen Saturation: ${vital.oxygenSaturation} %<br>
                            - Blood Glucose Levels: ${vital.bloodGlucoseLevels} mg/dL<br>
                        `).join('') : 'No vital signs recorded.'}
                    `;

                    // Insert the formatted record into the modal
                    modalContent.innerHTML = formattedRecord;

                    // Display the modal
                    modal.style.display = 'block';
                } else {
                    throw new Error('Failed to fetch patient record.');
                }
            } catch (error) {
                console.error('Error fetching patient record:', error);
                alert('Error fetching the patient’s record. Please try again.');
            }
        });
    });

    // Close the modal when the close button is clicked
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal if the user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
