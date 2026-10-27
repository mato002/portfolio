# AI Operations Copilot demo

This portfolio demo answers questions about a small, fixed fictional retail dataset. The browser calls `api/ai-demo.php`; PHP sends the question and dataset to the OpenAI Responses API. The API key stays in the server environment and is never sent to browser code.

## Run with XAMPP

1. Use a PHP-enabled Apache server with the PHP cURL extension enabled.
2. In Windows, open **Edit environment variables for your account**, add a user variable named `OPENAI_API_KEY`, and paste your API key into its value. Keep this variable out of the repository and website files.
3. Close and reopen XAMPP, then start or restart Apache so it inherits the environment variable. If XAMPP runs as a Windows service under another account, set the variable for that account instead.
4. Open the portfolio through Apache, for example `http://localhost/portfolio/`.

The endpoint defaults to the `gpt-6-luna` model. Set an `OPENAI_MODEL` environment variable on the server to use another model available to the OpenAI API account.

## Demo behavior

- `data/fictional-retail.json` is the only business dataset used by the assistant.
- Questions are limited to 500 characters; answers are capped at 300 output tokens.
- The endpoint allows up to 8 requests per IP address per hour. It stores a hashed IP counter in the server's temporary directory, not the user's question or answer.
- Responses are requested with `store: false`. The question and fictional dataset are still sent to the OpenAI API for processing.
- API usage is billed to the OpenAI API account configured on the server.
- The assistant is instructed to stick to the supplied data and say when it cannot answer. Model responses can still be incorrect.

Do not put the API key in `index.html`, `index.js`, Git, or any public file. Static-only hosting will not run this PHP endpoint; deploy the portfolio on PHP-enabled hosting and configure the key in the server environment.
