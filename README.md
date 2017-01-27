# An Open Course Discussion Platform

Our discussion platform, Veranda, in its most basic form, provides a Question & Answer interface for students, grouped by courses. Each "course" is facilitated by an "Instructor" who ultimately possesses administrative rights over the individual course.

Students can create new threads by asking a Question. Questions are automatically tagged according to their content. Once a question is posted, other students in the course can submit Answers. Each Answer is listed individually. Students can further discuss individual answers (or even the original question to ask clarification)
using the comments for said question or answer. Answers can be "upvoted" by other students. Both Questions and Answers can be flagged to notify the Instructor that his/her attention is required. Both Questions & Answers are capable of rich formatting.

In addition to the Q&A component of the platform, Instructors can post bulletins and course documents accessible to all students enrolled in the course. Students can also privately message the Instructor with questions and concerns.

Our platform essentially takes the best features of Piazza, StackOverflow, and Reddit - all platforms which have been proven to work on their own, and yet which brought together, go above and beyond a simple course discussion platform.

## Target Users

Our application is perfect for the facilitation of class discussions for high school and university students. The instructor configures a course and then provides his/her students with a private link, thus keeping the control of the discussion platform in the hands of the instructor.


# Veranda

A description for every aspect of our application is contained within the aspect's GitHub issue. All features which have not been implemented, our outstanding / open issues in GitHub.

Issues/Design: https://github.com/CSC309-Fall-2016/group12/issues

It's not currently hosted anywhere, although the database is hosted on a private server. The database credentials are set up in a "constants" file. As long as you have an internet connection, you can connect.

Just `npm install`, then `npm run build`, then `npm start`.

Click Login, and then type the credentials:

Test Account:
```
email: johnsmith@example.com
password: test
```

# Veranda Technical Documentation

## Development Environment

To install:
```
$ npm install
```

### Build

To build _only_ css:
```
$ npm run build-css
```

To build _only_ js:
```
$ npm run build-js
```

To build all:
```
$ npm run build
```

### Test

To validate code before committing:
```
$ npm test
```

#### Testing a Specific View
If a route has not been created for a view which you would like to test, you can use the wildcard debug endpoint:
```
http://server:PORT/debug/PATH_TO_VIEW_EJS
```

### Start

To start nodemon:
```
$ npm start
```

## File System

JavaScript, SASS, and EJS files are located in the src directory. These files are processed and bundled before being sent to the client. _Nearly_ all of development will occur in this directory.
