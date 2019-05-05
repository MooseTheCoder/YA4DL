# YA4DL

Yet Another 4chan Downloader.

I made this learning how to use the Puppeteer framework. This project is nothing special but it does the job.

------

### Installation

This thing is made using node, so the standard `npm install` will do the job.

### Configuration

The first line of the file is your download location, change this to where you want your stuff downloaded to.

### Usage

Once everything is set up, you can download a thread with:

`npm run dl [thread]/thread/[id]`

basically the last part of the url, like this one:

`npm run dl wsg/thread/2796326`

### Issues

This is something I care about that much, with that in mind. Sometimes when downloading a thread, it will just stop. Re running the script seems to solve this.

Each run will download /everything/ even if it already exists.

### Future

If I find myself using this to download gondolas I might the ability to watch for thread updates and download recent content, right now its not something I have the time for or really need. 

 

