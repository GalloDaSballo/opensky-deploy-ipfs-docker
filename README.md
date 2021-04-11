# OpenSky Deploy IPFS Docker

Deploy a new decentralized blog to IPFS, using OpenSky CMS

Simple Docker Image that:
Fetches the Default Blog Template
Builds a Server
Runs the Server

POST /
req.body.address = The address of the author which will publish to the blog

Making a POST request to / with an address will trigger the build of a new blog template and it's deployment to IPFS