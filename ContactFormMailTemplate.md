# Web3Forms Email Routing Setup

### How to start receiving emails at `patarovagjorgina@gmail.com`

Since this website is completely static (no backend server), you must generate a **Access Key** to securely route the form submissions to your email address without exposing your email directly in the HTML.

## Easy Steps (takes 1 minute):

1. **Go to Web3Forms**: [web3forms.com](https://web3forms.com/)
2. **Enter your email address**: Type `patarovagjorgina@gmail.com` into the box on their homepage and click "Create Access Key".
3. **Check your Inbox**: You will receive an email from Web3Forms containing your unique `Access Key` (it will look like a long string of letters and numbers).
4. **Update `index.html`**:
   - Open your `index.html` file
   - Go to **Line 156** right below `<form id="inquiryForm"...>`
   - Find this line: `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">`
   - Replace `YOUR_ACCESS_KEY_HERE` with the Access Key you received in your email!

Once you paste your unique key into the HTML and save it, your contact form will instantly become live and all submissions will successfully route straight to `patarovagjorgina@gmail.com`!
