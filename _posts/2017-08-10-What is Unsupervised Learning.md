---
layout: post
title: What is Unsupervised Learning?
category: blogs
permalink: What is Unsupervised Learning.html
---


Machine Learning (ML) uses powerful algorithms, statistical and numerical models to make machines learn without being explicitly programmed. The design of the ML systems, however, may differ depending on the skill set we want our machines to build,  a form of training data, time constraints, and computing resources at our disposal. As a result, we have four major types of ML: supervised, unsupervised, semi-supervised, and reinforcement learning. 
<br><br>

In this article, we’re  going to discuss unsupervised learning – an approach to the design of ML systems that has become very popular over the last several years. In a nutshell, in the unsupervised learning  our inputs (training data) are unlabeled and we have no output results to validate efficiency of the learning process. However, once the training process is complete, we are able to label our data. The described process is similar to how humans acquire knowledge through experience. Like a child who makes the first steps in the world, our unsupervised machine lacks guidance and experience. Even though the machine works in the dark, it somehow manages to extract features and patterns from the probability distributions of data (e.g images, texts) which are fed to it. 


However, why would we even need unsupervised learning if we have so many efficient and tested supervised ML methods around? Actually, there are several reasons for the growing popularity of unsupervised methods:
<br><br>
- Sometimes we don’t know in advance to which class/type our data belongs. For example, assume we know the median household income, occupation, gender, distance from the nearest urban area of a large population of consumers. At the same time, though, we don’t know what similarities these consumers really share and how they differ as groups. This is a classical consumer segmentation problem that may be solved with the unsupervised learning method called clustering. With a popular k-means clustering algorithm we can simply put these consumers into cohesive groups that account for similarities and difference among them. 


- Structured data can be expensive and not always available. Supervised learning requires properly labeled, cleaned up, and regularized data. To acquire such data, companies hire employees or use crowdsourcing platforms such as Amazon Mechanical Turk (MTurk) or Scale, which ends up in paying much money. Even worse, many AI startups might not have access to structured data at all.  To acquire data needed to train their AI systems, startups have to license it from commercial datasets specializing in data collection for supervised learning.


- Supervised methods are a good fit for classification and prediction, but not as suitable for content generation. Unsupervised learning is an excellent option when we want to generate content (e.g images, videos) similar to the original training data. When we want to teach our machine to make a style transfer or generate a new video, it might not be feasible to label image or video features. Since we don’t know what features make up a style in machine terms, it’s better to entrust automatic feature extraction and learning to unsupervised algorithms that can come up with the non-linear and subtle explanation of data patterns which even humans do not see.
<br><br>

- Unsupervised learning may be now efficiently used with deep learning and neural networks. Until very recently, unsupervised learning was mainly associated with clustering techniques and dimensionality reduction methods. Now, however, thanks to the cheaper cloud-based computing power and new deep learning techniques, we may efficiently use unsupervised learning in combination with neural networks trained on powerful GPUs. 
<br><br>


To illustrate how unsupervised learning actually works, let us take two popular implementations of this method with neural networks: autoencoders and GANs (Generative Adversarial Networks). 

<br><br>
First things first, autoencoder is a  neural network with a specialized architecture suitable for unsupervised learning. In a way, it is similar to a standard neural network (Multilayer Perceptron). As an MLP, an autoencoder has an input layer that receives data, a number of hidden layers that process it using activation functions, and an output layer. Unlike a standard neural network, though, autoencoders have the same number of nodes (neurons) in their input and output layers. Such design is useful because the purpose of autoencoders is to reconstruct their own inputs rather than predict the target value (Y) of training samples. In other words, autoencoders learn how to represent and generate data, rather than how to classify and predict it. 

                

<br><br>
![alt text](/img/log2 copy.png "A Standard Design of ANN & An Architecture of a Auto-encoder network")
<br><br>
This feature makes unsupervised learning extremely efficient in generative models: ML techniques used to simulate and create virtual environments, and multimedia content. A recent advance in unsupervised learning with generative models are GANs (Generative Adversarial Networks) developed by Ian Goodfellow and his colleagues in 2014i. A GAN setup consists of two networks, Generative and Discriminatory, that compete against each other. A generative network tries to create model samples that look similar to the original data. In its turn, a discriminatory network tries to identify this counterfeit. The resultant competition drives both parties to improve their skills, which ultimately ends up in model data samples virtually indistinguishable from the training data. GAN’s  learning techniques have been already effectively used in DCGAN (Deep Convolutional Generative Adversarial Networks) to create hi-fi images of human faces and landscapes.

<br><br>
### Unsupervised methods have other revolutionary applications at the cutting edge of AI innovation:


- Generation of virtual environments for simulation. Unsupervised learning allows creating complex virtual environments that may be used for testing robotics software. Such environments are especially useful in the contexts where wrong decisions might cause damage if tested in the real world.
- Future prediction and video generation. MIT CSAIL researchers have managed to create an AI that can predict future video frames and generate entirely new videos after being trained on over 2 millions of unlabeled videos.
- Image resolution enhancement and film remaster/colorization.  Unsupervised models can make the probabilistic assessment of images to fill them with missing pixels, and enhance resolution. Unsupervised learning has been also successfully used for film colorization and remasteringiv.

- Procedural Content Generation (PCG) in video games. Generative models powered with unsupervised learning can create video game textures, characters, and even entire levels.

With all these fantastic applications one could hardly imagine even ten years ago, unsupervised learning firmly establishes itself as one of the main fields of innovation and experimentation in Artificial Intelligence and Machine Learning.