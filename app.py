from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def student():
   #return render_template('student.html')
   return render_template('temp.html')

@app.route('/time', methods = ['POST', 'GET'])
def time():
    return render_template('temp2.html')
#@app.route('/result',methods = ['POST', 'GET'])
#def result():
#   if request.method == 'POST':
#      result = request.form
#      print(result)
#      #return render_template("result.html",result = result)
 #     return render_template('index.html')

@app.route('/recipe', methods=['POST', 'GET'])
def recipe():
    return render_template('swipe.html')

@app.route('/recipe/<page_id>', methods=['POST', 'GET'])
def recipes(page_id):
    pageid = page_id
    return render_template('recipe.html')

@app.route('/rate', methods=['POST', 'GET'])
def rate():
    return render_template('rate.html')


@app.route('/thanks', methods=['POST', 'GET'])
def thanks():
    print(request.form['rate'])
    return 'Thank you very much!'

if __name__ == '__main__':
   app.run(debug = True)