from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def student():
   return render_template('student.html')

@app.route('/result',methods = ['POST', 'GET'])
def result():
   if request.method == 'POST':
      result = request.form
      print(result)
      #return render_template("result.html",result = result)
      return render_template('index.html')

@app.route('/recipe', methods=['POST', 'GET'])
def recipe():
    return render_template('swipe.html')


@app.route('/rate', methods=['POST', 'GET'])
def rate():
    return render_template('rate.html')
@app.route('/thanks', methods=['POST', 'GET'])
def thanks():
    print(request.form['rate'])
    return 'Thank you very much!'

if __name__ == '__main__':
   app.run(debug = True)