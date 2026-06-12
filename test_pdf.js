import fetch from 'node-fetch';

async function testPdf() {
  const payload = {
    analysis: {
      overall: { score: 85, rating: "Excellent" }
    },
    brand: { primaryColor: '#3B82F6', accentColor: '#6366F1' }
  };
  
  try {
    const res = await fetch('https://limitless-mub2.onrender.com/api/v1/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    console.log('Status:', res.status);
    console.log('Headers:', res.headers.raw());
    
    if (res.ok) {
        console.log('Success!');
    } else {
        const text = await res.text();
        console.log('Error:', text);
    }
  } catch (err) {
    console.error(err);
  }
}

testPdf();
