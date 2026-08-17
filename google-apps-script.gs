/**
 * HAMEEZ — LEAD FORM BACKEND (used by both index.html and offer.html)
 * ---------------------------------------------------------------
 * SETUP (ek baar karna hai):
 *
 * 1. Google Sheet kholo (naya ya existing). Row 1 me headers likho
 *    exactly is order me:
 *       Timestamp | Name | Email | Business | Message | Source
 *
 *    "Source" column apne aap batayega ke lead kis page se aayi —
 *    "Portfolio Page" (index.html) ya "Offer Page" (offer.html).
 *
 * 2. Sheet ke andar: Extensions → Apps Script.
 *    Editor khulega, default "myFunction" code delete karke
 *    is poori file ka content paste kar do. Ctrl+S / Save.
 *
 * 3. Upar-left me "Deploy" → "New deployment".
 *    - Gear icon → type select karo: "Web app"
 *    - Description: "Lead form handler" (kuch bhi likh sakte ho)
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    "Deploy" dabao. Pehli dafa Google permission maangega —
 *    apna Google account authorize kar do.
 *
 * 4. "Web app URL" copy karo — kuch is tarah dikhega:
 *    https://script.google.com/macros/s/AKfycb.../exec
 *
 * 5. DONO files (index.html aur offer.html) me ye line dhoondo:
 *       const scriptURL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
 *    Aur dono jagah SAME URL single quotes ke andar paste kar do.
 *    Isse dono pages ki inquiries ek hi Sheet me aayengi, bas
 *    "Source" column se pata chal jayega konsi page se aayi.
 *
 *    Agar har page ka data alag Sheet me chahiye, to doosri Sheet
 *    pr ye hi script dobara deploy karo aur uska alag URL doosri
 *    file me paste kar do.
 *
 * NOTE: Agar future me form ke fields change karo (add/remove),
 * to neeche doPost() function ke andar corresponding e.parameter.xxx
 * lines bhi update karni hongi.
 * ---------------------------------------------------------------
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var timestamp = new Date();
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var business = e.parameter.business || '';
    var message = e.parameter.message || '';
    var source = e.parameter.source || '';

    sheet.appendRow([timestamp, name, email, business, message, source]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: browser me deployment URL kholne par ye response test
// ke liye dikhega, taake pata chale deployment sahi se live hai.
function doGet(e) {
  return ContentService
    .createTextOutput('Lead form backend is live. POST requests only.')
    .setMimeType(ContentService.MimeType.TEXT);
}
