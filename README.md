# Quick-Credit

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners

[![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express)
[![Build Status](https://travis-ci.com/mekzy-o/Quick-Credit.svg?branch=develop)](https://travis-ci.com/mekzy-o/Quick-Credit)
[![Coverage Status](https://coveralls.io/repos/github/mekzy-o/Quick-Credit/badge.svg?branch=develop)](https://coveralls.io/github/mekzy-o/Quick-Credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d998719ca8d68e4afaee/maintainability)](https://codeclimate.com/github/mekzy-o/Quick-Credit/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d998719ca8d68e4afaee/test_coverage)](https://codeclimate.com/github/mekzy-o/Quick-Credit/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Introduction](#introduction)
- [UI Templates](#ui-templates)
- [API](#api)
- [API Documentation](#api-documentation)
- [Pivotal Tracker ID](https://www.pivotaltracker.com/n/projects/2326723)
- [Technologies](#technologies)
- [Installing](#installing)
- [Working Routes](#working-routes)
- [License](#license)

# Introduction

## _Project Overview_

Quick Credit is an online lending platform that provides short term soft loans to individuals earning low-income. Loans are provided instantly upon administrator approval.

### **Style guide**

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

## Screenshot(UI template)

![quickcredit](https://user-images.githubusercontent.com/40548599/56082718-eb80ff00-5e13-11e9-9f35-90b4bff1f4cf.PNG)

# UI Templates

Preview UI templates :+1: [Github Pages](/)

# API

The API is currently in version 1 (v1) and is hosted at https://quick-credit-loan.herokuapp.com

# API-Documentation

The API endpoints are documented using swagger.json and can be accessed here [API-Docs](https://app.swaggerhub.com/apis-docs/mekzy4/Quick-Credit/1.0.0)

# Pivotal Tracker ID

https://www.pivotaltracker.com/n/projects/2326723

## Required Features

- Users can sign up.
- Users can login.
- User can apply for loan.
- User can view loan repayment history.
- Admin can mark user as verified`.
- Admin can view all loan applications
- Admin can view a specific loan application
- Admin can view current loans (not fully repaid)
- Admin can view all repaid loans
- Admin can approve or reject a client's loan application
- Admin can post loan repayment transaction in favour of client

# Technologies

- NodeJs
- Express
- Mocha & Chai
- ESLint
- Babel
- Travis
- Code Climate
- Coveralls

# Installing

#### _Prerequisites_

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed, go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

`git clone https://github.com/mekzy-o/Quick-Credit`

And install the required dependencies

`npm install`

Run server

`npm run start-dev`

Server listens on port `8080`

## Running the tests

To run test cases

`npm test`

# Working Routes

## _API Endpoints_

| Endpoint                                     |              Functionality               | HTTP method |
| -------------------------------------------- | :--------------------------------------: | ----------: |
| /api/v1/auth/signup                          |          Create a user account           |        POST |
| /api/v1/auth/login                           |               Login a user               |        POST |
| /api/v1/loans                                |        Create a loan application         |        POST |
| /api/v1/loans                                |        Get all loan applications         |         GET |
| /api/v1/loans/_loan_id_                      |     Get a specific loan application      |         GET |
| /api/v1/_loan_id_/repayments                 |     View all loan repayment History      |         GET |
| /api/v1/_user_email_/verify                  |          Mark User as Verified           |       PATCH |
| /api/v1/loans?_status=approved&repaid=false_ | View all current loans(not fully repaid) |         GET |
| /api/v1/loans?_status=approved&repaid=true_  |      View all current repaid loans       |         GET |
| /api/v1/loan/_loan_id_                       |          Reject or approve loan          |       PATCH |
| /api/v1/_loan_id_/repayment                  |        Create a repayment record         |        POST |
| /api/v1/users/password                       |              Reset Pasword               |        POST |
| /api/v1/users/                               |              Get All Users               |         GET |
| /api/v1/users/:email                         |            Get A Single User             |         GET |
| /api/v1/docs                                 |          Read API documentation          |         GET |

## License :boom:

This project is under the MIT LICENSE
