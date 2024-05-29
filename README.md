# Video Captioning

With all these platforms like YouTube and Twitch and short videos like Instagram Reels, videos have become a very important means of communication in our daily lives. Video captioning is the task of automatically generating a textual description of the actions in the video. Some real-world examples of video captioning can be: Understanding Video Content, Enhancing Video Search and Recommendation Systems, etc.

This is a brief overview of our project. To understand the project in details check out our report <a href="https://drive.google.com/file/d/1DOZYehxgq_tDhWsYpJWican6D320wEVk/view?usp=sharing"></a>.

## Table of contents

- <a href="#Dataset">Dataset</a>
- <a href="#Setup">Setup</a>
- <a href="#Usage">Usage</a>
- <a href="#Model">Model</a>
  - <a href="#TrainingArchitecture">Training Architecture</a>
  - <a href="#InferenceArchitecture">Inference Architecture</a>
  - <a href="#Loss">Loss</a>
  - <a href="#Metric">Metric</a>
- <a href="#Scripts">Scripts</a>
- <a href="#References">References</a>

<h2 id="Dataset">Dataset</h2>
This project is build on the <a href="https://www.kaggle.com/datasets/sarthakjain004/msvd-clips/data">MSVD</a> dataset. 
MSVD dataset is given by Microsoft. It contains 1870 short YouTube clips, manually labeled for training, and 100 videos for testing. Each video has been assigned a unique ID and each ID has about 15–20 captions. The training validation split ratio is 0.85.

<h2 id="Setup">Setup</h2>

Clone the repository : <code>git clone https://github.com/such-a-nooob/VideoCaption.git</code>

Change directory: <code>cd VideoCaption</code>

Create environment: <code>conda create -n video_caption python=3.7</code>

Activate environment: <code>conda activate video_caption</code>

Install requirements: <code>pip install -r requirements.txt</code>

<h2 id="Usage">Usage</h2>

To use the models that have already been trained,

Run **app.py** file as <code>python app.py</code>

For faster results extract the features of the video and save it in feat folder of the realtime_data.

To convert into features run the extract_features.py file as <code>python extract_features.py</code>

Run train.py for local training.

<h2 id="Model">Model</h2>

<h3 id="TrainingArchitecture">Training Architecture</h3>

<p align = "center"><img align = "center" src = "images/model_train.png" /></p>

<h3 id="InferenceArchitecture">Inference Architecture</h3>

<h3 id="EncoderModel">Encoder Model</h3>
<p align = "center"><img align = "center" src = "images/model_inference_encoder.png" /></p>

<h3 id="DecoderModel">Decoder Model</h3>
<p align = "center"><img align = "center" src = "images/model_inference_decoder.png" /></p>

<h3 id="Loss">Loss</h3>
This is the graph of epochs vs loss. The loss used is categorical crossentropy.
<p align = "center"><img align = "center" src = "images/loss.png" /></p>

<h3 id="Metric">Metric</h3>
This is the graph of epochs vs metric. The metric used is accuracy.
<p align = "center"><img align = "center" src = "images/accuracy.png" /></p>

<h2 id="Scripts">Scripts</h2>
 
 * **data** folder contains the training and testing videos, their features and the <code>training_label.json</code> file- that contains the video_id and captions pair
 * **train.py** contains the model architecture
 * **predict.py** checks the results in realtime
 * **predict_test.py** is to check for predicted results and store them in a txt file along with the time taken for each prediction
 * **predict_realtime.py** predicts the captions of the testing videos in realtime
 * **model_final** folder contains the trained encoder model along with the tokenizerl and decoder model weights.
 * **extract_features.py** extracts 80 frames evenly spread from the video and then those video frames are processed by a pre-trained VGG16 so each frame has 4096 dimensions. So for a video we create a numpy array of shape(80, 4096) 
 * **config.py** contains all the configurations that are used throughout
 * **model.py** returns the model that will be used for inference
 * **app.py** links the model to the webpage
 * **static and templates** folder contains the front-end assets and HTML templates.

<h2 id="References">References</h2>
 
 [SV2T paper 2015](https://arxiv.org/abs/1505.00487)
 
 [Keras implementation](https://github.com/CryoliteZ/Video2Text)
 
[Intelligent-Projects-Using-Python](https://github.com/PacktPublishing/Intelligent-Projects-Using-Python/blob/master/Chapter05)

[Video explanation](https://www.youtube.com/live/DJEnkhKPbxA?feature=shared)
