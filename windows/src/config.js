// >>> The ONLY file you normally need to edit. <<<
module.exports = {
  // Where the app opens. ?gmk_view=login skips the marketing page and shows the log-in screen.
  START_URL: 'https://gmkwebservices.co.za/invoice-app/?gmk_view=login',
  // Links to these sites open INSIDE the app window (your site + PayFast checkout).
  INTERNAL_HOSTS: ['gmkwebservices.co.za', 'www.gmkwebservices.co.za', 'payfast.co.za', 'www.payfast.co.za', 'sandbox.payfast.co.za'],
  // Lets the server recognise the desktop app (it hides the Google button there, because Google blocks it in app windows).
  UA_SUFFIX: 'GMKInvoiceApp/1.0',
  TITLE: 'GMK Invoice'
};
