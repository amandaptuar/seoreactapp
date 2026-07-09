const fs = require('fs');

const files = [
  'src/pages/JoinUsPage.jsx',
  'src/pages/Home.jsx',
  'src/pages/DemoPage.jsx',
  'src/components/EnquiryModal.jsx',
  'src/components/Hero.jsx',
  'src/components/AssessmentModal.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  const regex = /(\/\/\s*1\.\s*Generate temp password[\s\S]*?)(try\s*\{\s*await sendCredentialsEmail[\s\S]*?\}\s*catch[\s\S]*?\}\s*(?:setFormError|setErrorMsg)\([^)]*\);\s*)/;
  
  const match = content.match(regex);
  if (match) {
    const isEnquiry = file.includes('EnquiryModal.jsx');
    const errorFn = isEnquiry ? 'setErrorMsg' : 'setFormError';
    
    const newBlock = `// 1. Check if email already exists FIRST
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingUser) {
        ${errorFn}('This email is already registered. Please log in instead.');
        setIsSubmitting(false);
        return;
      }

      // 2. Generate Questions from Limitless API (with retry for cold starts)
      const questionsData = await generateAssessmentQuestions(formData.age, formData.gender);
      
      // 3. Generate temp password & insert user
      const generatedPassword = Math.random().toString(36).slice(-8).toUpperCase();
      const passwordHash = await bcrypt.hash(generatedPassword, 10);
      
      const { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert([{
          name: formData.name,
          email: formData.email,
          temp_password: generatedPassword,
          password_hash: passwordHash,
          password_reset_required: true,
          payment_status: 'pending',
        }])
        .select('id')
        .single();

      if (insertErr) {
        throw new Error(\`DB Error: \${insertErr.message || insertErr.details || JSON.stringify(insertErr)}\`);
      }
      
      const dbUserId = newUser.id;

      try {
        await sendCredentialsEmail({
          name: formData.name,
          email: formData.email,
          tempPassword: generatedPassword,
        });
      } catch (emailErr) {
        console.warn('Credentials email failed (non-fatal):', emailErr);
      }
      ${errorFn}('');
`;
    content = content.replace(regex, newBlock);
    fs.writeFileSync(file, content);
    console.log('Patched flow in', file);
  } else {
    console.log('Regex did not match in', file);
  }
});
