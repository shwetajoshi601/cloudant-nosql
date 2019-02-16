# cloudant-nosql
Introduction to Cloudant NoSQL Database   

IBM Cloudant is a NoSQL Database provided as a service on the IBM Cloud.

This Database provides easy to consume REST APIs making it an obvious choice for most applications.
The data is stored in the form of JSON documents. It provides advanced querying and search capabilities.

## Creating a Cloudant Service instance
If you are not familiar with Cloudant, follow the below steps to create an account and get started.
* If you do not have an IBM Bluemix account, Sign Up through [this](https://console.bluemix.net/registration/) link and follow the instructions. You can Sign Up for a Free Account.
* Once you login to IBM Cloud, Click on Catalog.
* In the search bar, enter Cloudant, you will find Cloudant under Data & Analytics. Click on this Service.
* Enter a name for the service(optional), select the region & space, select a pricing plan as per your need, and Click Create.
* Now, click on Credentials to see your service username and password. Note this username and password.
* To access the Database UI, click on the “Manage” Tab, and the click “Launch”. This will open the Database Dashboard.
* Once you Launch, you are now ready to start exploring your Cloudant database.

## Understanding Cloudant Concepts
The .pptx file in this repository gives a concise explanation of the various features of Cloudant. It also contains a list of links to the relevant documentation.

## Using Node.js for Cloudant
An official node module "cloudant" is available for connecting and performing various operations on your cloudant service instance.
The .js file in this repository demonstrate the basic CRUD and query operations using this module

