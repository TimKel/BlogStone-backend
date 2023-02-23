## Blogstone
---
Blogstone is a simple webapp for users to post their thoughts and experience regarding any subject they desire. There are a handful of categories to choose from, but you are not limited to these categories. Users can create an account and create their own blog, view others blogs as well as update or delete their own content.

## User Demographic
--- 
Blogstone is targeted toward anyone who finds writing as a creative or peaceful outlet. 

## Data
--- 
Profiles are anonymous. While users can use their own info for username/email a random profile avatar is generated using Faker.

If users choose to omit blog images, an image will be provided using Picsum's external API for image generation.

All posts are stored in a Postgresql Database, each post will have it's creators ID tied to it.

## Tech Stack
--- 
- ### Front-end: 
    - React/React Router/Reactstrap
    - Picsum image generator
- ### Back-end: 
    - Node/Express
    - Faker profile photo generator

## Database Schema
--- 
DB is SQL using Postgres. There are two tables, Users and Posts. User passwords are encrypted using BCrypt. Users will have a one-to-many relationship with Posts as they can add/delete as many as they want.

![DB-Schema](https://user-images.githubusercontent.com/91156228/209449620-8726ef2d-3fc5-46f2-bec4-67ff751c3b78.png)


## User Flow
--- 
Blogstone is a Single Page Application using React. Users do not need to create an account to view blogs but will need to create an account to enable them to create their own blog and edit/delete them.

![User Flow](https://user-images.githubusercontent.com/91156228/209449636-d9b215a1-83ac-40ac-80f9-54f8bfc7e40d.png)
