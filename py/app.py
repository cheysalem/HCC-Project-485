from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_data', methods=['POST'])
def submit_data():
    if request.method == 'POST':
        cookies_enabled = int(request.form['cookies_enabled'])  # Convert to int to store as binary value
        languages = request.form['languages']
        user_agent = request.form['user_agent']
        browser_platform = request.form['browser_platform']
        browser_engine = request.form['browser_engine']
        device_id = request.form['device_id']

        conn = sqlite3.connect('form_data.db')
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS form_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cookies_enabled INTEGER,  -- Store as INTEGER for binary value
                languages TEXT,
                user_agent TEXT,
                browser_platform TEXT,
                browser_engine TEXT,
                device_id TEXT
            )
        ''')

        cursor.execute('''
            INSERT INTO form_data (cookies_enabled, languages, user_agent, browser_platform, browser_engine, device_id)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (cookies_enabled, languages, user_agent, browser_platform, browser_engine, device_id))

        conn.commit()
        conn.close()

        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
