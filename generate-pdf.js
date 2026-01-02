const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Read the HTML template
const htmlPath = path.join(__dirname, 'cv-template.html');
const pdfPath = path.join(__dirname, 'images', 'my-cv.pdf');

// Check if puppeteer is available
let puppeteer;
try {
    puppeteer = require('puppeteer');
} catch (e) {
    console.log('Puppeteer not found. Installing...');
    console.log('Please run: npm install puppeteer');
    console.log('Or manually install: npm install puppeteer --save-dev');
    process.exit(1);
}

async function generatePDF() {
    try {
        // Read HTML content
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Launch browser
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set content
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });
        
        // Generate PDF
        console.log('Generating PDF...');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        });
        
        await browser.close();
        
        console.log(`✅ PDF generated successfully: ${pdfPath}`);
        console.log(`File size: ${fs.statSync(pdfPath).size} bytes`);
    } catch (error) {
        console.error('❌ Error generating PDF:', error.message);
        process.exit(1);
    }
}

generatePDF();

