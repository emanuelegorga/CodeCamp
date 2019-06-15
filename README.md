*CodeCamp - JavaScript Web Application*
------

The approach I used to solve this challenge:
1. User Stories
2. Diagramming with pen and paper along the process for what I needed to develop
3. Adding new features and aterwards refactoring commits

The idea of this project, with only an educational scope, is a website where people can organize campgrounds to study and code using a specific programming language while enjoying the nature being in a campground.

* Features available now:
    - User authentications;
    - Create a coding campground deciding a price per night (to create a campground the visitor needs to be an user of CodeCamp website):
        - A campground has a name, a picture, a price per night and a description;
    - Leave comments to campgrounds (to leave a comment the user needs to be logged in);
    - Deleting comments (only who writes the comment can delete it);
    - Deleting campgrounds (only who creates the campgrounds can delete it);

* Next: 
    - Google Maps API;
    - Improving UI on login page;
    - Improving UI on register page;

:clipboard: User Stories
------
```
As a User,
I would like to see a landing page.

As the Owner of the website,
I would like my users to be able to create campgrounds.
The campgrounds have a title, a picture, a price per night and a description.

As a User,
In order to ask questions and share ideas/info with other users,
I want to be able to leave comments to a specific campground.

As the Owner of the website,
I would like the visitors to be trackable for their interactions on the website,
So I want them to be able to have a registration form available.

As a User,
In order to have a good navigation experience,
I would like to have a navigation bar which I can use to sign up, login, logout and go back to the homepage.

As a User,
When I create a campground but afterwards a problem comes up,
I would like to be able to delete a campground.

As a User,
When I leave a comment I could potentially make typos or just change my mind,
I want to be able to edit or delete my comment.

As the Owner of the website,
In order to improve the navigation experiene,
I would like to show users flash messages when they sign up, login and logout.
```

:memo: Getting started
------
1. Clone this repo `git@github.com:emanuelegorga/CodeCamp.git`
2. Change directory `cd codecamp`

:point_right: Usage
-----
3. Start mongodb database `mongod` on your local environment through the terminal
4. Start the application `nodemon app.js` from the terminal
5. Open your browser, navigate to `http://localhost:3000` and enjoy the experience

![landingPage](https://user-images.githubusercontent.com/40179292/59554294-cab26280-8f98-11e9-980e-230da1931bd8.png)
![camps](https://user-images.githubusercontent.com/40179292/59554295-cb4af900-8f98-11e9-8b64-1a6a1642f059.png)


:construction: Technologies I used
-----
* JavaScript ES6
* MongoDB

## :scroll: License

© [Emanuele Gorga][linkedin] | [CV Github][github]

[github]:  https://github.com/emanuelegorga/CV
[linkedin]: https://www.linkedin.com/in/emanuelegorga/
