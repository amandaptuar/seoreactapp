const fs = require('fs');

const files = [
  'src/pages/Home.jsx',
  'src/pages/DemoPage.jsx',
  'src/pages/JoinUsPage.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Find the start of the block
  const startStr = 'const generatedPassword = Math.random().toString(36).slice(-8).toUpperCase();';
  const startIdx = content.indexOf(startStr);
  
  if (startIdx === -1) {
    console.log('Could not find start in', file);
    return;
  }
  
  // Find the end of the block
  const isDemo = file.includes('DemoPage.jsx');
  const isJoin = file.includes('JoinUsPage.jsx');
  const errorFn = 'setFormError';
  
  const endStr = `${errorFn}('');`;
  let endIdx = content.indexOf(endStr, startIdx);
  if (endIdx === -1) {
    console.log('Could not find end in', file);
    return;
  }
  
  const blockToReplace = content.slice(startIdx, endIdx);
  
  // Replace the block
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

      // 2. Generate Questions from Limitless API
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
          password_reset_required: ${isDemo ? 'false' : 'true'},
          payment_status: '${isDemo ? 'demo' : 'pending'}',
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
      `;
      
  content = content.replace(blockToReplace, newBlock);
  fs.writeFileSync(file, content);
  console.log('Patched flow in', file);
});
