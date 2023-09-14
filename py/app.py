from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Modify the following line to specify the path to your SQLite database file
db_path = 'your_database_file.db'  # Change this to your database file path

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_data', methods=['POST'])
def submit_data():
    if request.method == 'POST':
        cookies_enabled = request.form['cookies_enabled']
        languages = request.form['languages']
        user_agent = request.form['user_agent']
        browser_platform = request.form['browser_platform']
        browser_engine = request.form['browser_engine']
        device_id = request.form['device_id']

        # Connect to your SQLite database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Modify the CREATE TABLE statement to match your table structure
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS your_table_name (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                column1_name TEXT,
                column2_name INTEGER,
                ...  # Add more columns as needed + adjust column names to the names of the columns in the SQL database
            )
        ''')

        # Modify the INSERT INTO statement to match your column names
        cursor.execute('''
            INSERT INTO your_table_name (column1_name, column2_name, ...)
            VALUES (?, ?, ...)
        ''', (cookies_enabled, languages, user_agent, browser_platform, browser_engine, device_id))

        conn.commit()
        conn.close()

        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
