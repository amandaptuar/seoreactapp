const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/pages/Home.jsx');
let content = fs.readFileSync(file, 'utf8');

const missingCode = `
  const [showModal, setShowModal] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', age: '', gender: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const handleStartAssessment = () => {
    if (isLoggedIn) {
      navigate('/join');
      return;
    }
    setShowModal(true);
    setFormError('');
    setFormData({ name: '', email: '', age: '', gender: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {`;

content = content.replace('  const handleFormSubmit = async (e) => {', missingCode);
fs.writeFileSync(file, content, 'utf8');
console.log("Fixed");
