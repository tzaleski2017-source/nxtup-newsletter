export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // For now, just log the email (you'll integrate with your email service later)
  console.log('New subscription:', email);
  
  // TODO: Integrate with ConvertKit, Mailchimp, or your preferred email service
  // Example ConvertKit integration:
  // const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     api_key: process.env.CONVERTKIT_API_KEY,
  //     email: email
  //   })
  // });

  return res.status(200).json({ message: 'Subscribed successfully' });
}