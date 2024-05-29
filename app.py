from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    send_file,
    jsonify
)
import os
import predict
import subprocess

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

'''
@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, "static"),
        "favicon.ico"
    ) 
'''

def delete_files(folder_path):
    # Iterate over all files in the folder
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        # Check if it's a file
        if os.path.isfile(file_path):
            try:
                # Delete the file
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
            except Exception as e:
                print(f"Error deleting file: {file_path}, {e}")


def to_mp4(input_path):
    # Construct the output path with MP4 extension
    output_path = os.path.join(
        os.path.dirname(input_path),
        os.path.splitext(os.path.basename(input_path))[0] + ".mp4",
    )

    # Run FFmpeg command to convert AVI to MP4
    cmd = f'ffmpeg -i "{input_path}" -c:v copy -c:a aac "{output_path}"'
    subprocess.run(cmd, shell=True)


@app.route("/upload", methods=["POST"])
def upload_file():
    if request.method == "POST":
        file = request.files["file"]
        if file:
            filename = file.filename
            dir = os.path.join(app.root_path, "data/realtime_data/video")
            delete_files(dir)
            file_path = os.path.join(dir, filename)
            file.save(file_path)
            ext = os.path.splitext(file_path)[-1].lower()
            print (ext)
            if ext != ".mp4":
                to_mp4(file_path)
                mp4_file_path = file_path.replace(".avi", ".mp4")
                os.remove(file_path)
                return send_file(mp4_file_path, as_attachment=True)
            else:
                return send_file(file_path, as_attachment=True)
    return redirect(url_for("index"))

@app.route("/generateCap", methods=["GET"])
def get_cap():
    caption, timetaken = predict.generate_cap()
    print(caption)
    timetaken = round(timetaken, 2)
    return jsonify({"caption": caption,"time": timetaken})

if __name__ == "__main__":
    app.run(debug=True)
