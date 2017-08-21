---
layout: post
title: A Generative AI Produces a Hallucinatory Footage
category: blogs
permalink: A Generative AI Produces a Hallucinatory Footage.html
---


Generative models are gathering a powerful momentum in the contemporary AI research. Leveraging the power of unsupervised learning and DL (Deep Learning), generative models such as Variational Auto-encoders (VAEs) and GANs (Generative Adversarial networks) create pictures, audio and video samples that look and sound more realistic with each training epoch<a href="#note1" id="note1ref"><sup>1</sup></a>. Among recent breakthroughs in the generative models, one should mention Sketch RNN, a neural net for generating sketches, Google’s DeepDream that creates surrealistic images by exciting certain neurons, and MIT Nightmare Machine that transfers horror style to images of human faces and buildings.<br><br>

### Future Prediction
One of the most exciting innovations in the field of generative models is a future prediction technique developed by MIT’s Computer Science and Artificial Intelligence Laboratory (CSAIL)<a href="#note2" id="note2ref"><sup>2</sup></a>. The technique allows transforming still images into brief animations (GIFs) that simulate the future of the scene. The MIT’s algorithm has been able to produce short videos that look if as the artificial brain of the neural net was hallucinating. The imagery created by CSAIL’s neural net reminds of the tripping pictures that come to people on LSD. Motion blurs, unstable backgrounds and foregrounds one can see in the CSAIL experiment are also very reminiscent of the famous Surrealistic paintings by Salvador Dali. The question arises: is this effect intentional?


<br><br>
<img style="margin-left: 20%;" src="/img/VAE learning to generate images (log time).gif"><img style="margin-left: 3%;" src="/img/GAN learning to generate images (linear time).gif">
<br><br>
<p style="margin-left: 23%;">VAE learning to generate images (log time)&nbsp;   &nbsp;  &nbsp;   &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;   &nbsp;GAN learning to generate images (linear time)</p>
<br><br>


On the one hand, machine 'hallucinations' may be explained by the shortcomings of the CSAIL’s generative model. On the other hand, they can say much about a hidden potential of machine creativity that expands the boundaries of human imagination. Let’s delve deeper into the technical details of the network to understand how MIT CSAIL algorithms produce this interesting effect.

<br><br>
### Architecture of the CSAIL Model
Carl Vondrick, Hamed Pirsiavash, and Antonio Torralba, the researchers who developed a future prediction AI, used the unsupervised learning approach in combination with Generative Adversarial Networks (GANs). The system was trained on two million of unlabeled videos that included a year’s worth of footage. As a result, the CSAIL team has managed to develop a system that can classify and generate new videos. The GAN architecture used by MIT CSAIL is an innovative approach first presented by Ian Goodfellow and his colleagues in the 2014 paper<a href="#note3" id="note3ref"><sup>3</sup></a>. In a nutshell, GANs( Generative Adversarial Networks) is a generative model that consists of two competing networks, Generative and Discriminatory. The Generative network creates model samples from input noise that represents some probability distribution over the unlabeled video samples. In its turn, the Discriminatory network acts as a policeman who tries to expose the fake samples created by the Generative network. The competition between two networks results in the gradual improvement of the Generative network’s creativity and the Discriminatory network’s policing skills. In the end of the training, samples produced by the Generative network are virtually indistinguishable from the training sample. 

<br><br>

MIT CSAIL researchers employed a pretty similar approach. They used a low-dimensional random noise as the input of the generative network. To model videos, they also applied spatio-temporal up-convolution (2D for space, and 1D for time). For the discriminator, the researchers opted for a deep spatio-temporal convolutional network. Then, to train two networks, millions of Flickr videos were stabilized and filtered by scene category. To expand still scenes into the future, the researchers decided to model the background separately from the foreground. As a result, the setup produces a static background (replicated over time) and a moving foreground combined with the background using a mask. This technical decision explains why videos produced by the model look like hallucinations. Since foreground and background change separately, there is a slight mismatch between them.  Similarly, motion blurs make videos a little bit fluctuating and unpredictable. Therefore, in many cases, the future scene does not match the first frame. As in Dali’s paintings,  time in CSAIL’s GIFs, thus, seems discontinuous and almost visible.  Dispersed and visible time combined with  low resolution and unnatural rendering of the video samples create a tripping atmosphere which is very different from reality. 
Nevertheless, the discussed experiment is very promising because it explores new venues in automatic video and graphics generation. Its findings may be used in the procedural generation of video game content, automatic production of stock photography, commercial designs, video clips, and many other things. Related generative models may be also efficiently used for style transfer. This technology has been already popularized in mobile applications such as Prisma, Comet, Pikazo, and BitCam that can transform images into various styles (e.g Impressionist or Cubist) expanding the way users express themselves. At the same time, it is still a long way to go from hallucinatory videos to truly realistic clips. Even though, future prediction technology has already introduced a new era of machine creativity that was hard to imagine even three years ago. <br><br>

References
=====

1. [Open AI Blog. (2016). Generative Models. Open AI](https://blog.openai.com/generative-models/) <a id="note1" href="#note1ref"><sup>1</sup></a>
2. [Vondrick, Carl, Pirsiavash, Hamed, Torralba, Antonio. (2016). Generating Videos From Scene Dynamic](http://carlvondrick.com/tinyvideo/)<a id="note2" href="#note2ref"><sup>2</sup></a>
3. [Goodfellow, I. et al. (2014). Generative Adversarial Networks](https://arxiv.org/abs/1406.2661)<a id="note3" href="#note3ref"><sup>3</sup></a>