# RESTless Readers

## Specifications

* The database models have the following fields and associations:

  * `User`

    * `id`: primary key

    * `Username`

    * `email`

    * `password`

  * `Book`

    * `id`: primary key

    * `name`

    * `description`

    * `review`


    * `user_id`: foreign key that references `User.id`

  * Users have many projects, and projects belong to a user.

    * If a user is deleted, all associated projects are also deleted.