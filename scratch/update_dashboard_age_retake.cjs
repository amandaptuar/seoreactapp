const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add state variables for Age and Gender
if (!content.includes('const [userAge, setUserAge]')) {
  content = content.replace(
    "const [isSidebarOpen, setIsSidebarOpen] = useState(false);",
    "const [isSidebarOpen, setIsSidebarOpen] = useState(false);\n  const [userAge, setUserAge] = useState('');\n  const [userGender, setUserGender] = useState('');"
  );
}

// 2. Fetch age and gender along with payment_status
content = content.replace(
  /\.select\('payment_status'\)/g,
  ".select('payment_status, age, gender')"
);

// 3. Set age and gender in state
if (!content.includes('setUserAge(userRecord.age')) {
  content = content.replace(
    /if \(userRecord\.payment_status === 'paid'\)/g,
    "setUserAge(userRecord.age || '');\n              setUserGender(userRecord.gender || '');\n              sessionStorage.setItem('userAge', userRecord.age || '');\n              sessionStorage.setItem('userGender', userRecord.gender || '');\n              if (userRecord.payment_status === 'paid')"
  );
}

// 4. Show Age and Gender in the navbar next to the date
const dateJSX = `              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
const newDateJSX = `              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {userAge && userGender && (
                <span style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid #CBD5E1' }}>
                  Age: {userAge} | Gender: {userGender.charAt(0).toUpperCase() + userGender.slice(1)}
                </span>
              )}`;

content = content.replace(dateJSX, newDateJSX);

// 5. Update Retake Assessment button onClick
const retakeBtnMatch = "onClick={() => startLoggedInAssessment(navigate, setIsSwitchingAssessment)}";
const newRetakeBtnMatch = `onClick={() => {
            if (!isPaid) {
              alert("Please complete your payment to unlock unlimited retakes.");
              navigate('/pricing');
              return;
            }
            startLoggedInAssessment(navigate, setIsSwitchingAssessment);
          }}`;

content = content.replace(retakeBtnMatch, newRetakeBtnMatch);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Dashboard updated with Age, Gender, and Paywall for Retake.');
