from plugins._flask_test import app


@app.route('/api/v1/upload', methods=['POST'])
def upload():
    return 'ok'


app.run(debug=True)
