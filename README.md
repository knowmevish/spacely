#Spacely

##IMAGE UPLOADER with drag and drop 

This is a simple image uploader with the following features

* Upload images by by drag and drop
* Upload images from remote url
* Upload images from the computer

__Spacely__ is __rails__ 3.2.6 with Mysql database. Additional gems that were used to handle file uploads are carrierwave, fog and Rmagic.
The app is powered by __backbone.js__ in the forntend.

##Deploying the app on Cloud Foundry
Fork the project and then 
```ruby
git clone git@github.com:<your_name>/spacely.git spacely
cd spacely
bundle install;bundle package
rake assets:precompile
```
The images are stored in s3. The secret, id and bucket name are to be set after deploying the app.

To deploy the app 
```ruby
$ vmc push --runtime ruby19 --nostart
Would you like to deploy from the current directory? [Yn]: y
Application Name: spacely
Detected a Rails Application, is this correct? [Yn]: y
Application Deployed URL [contributingcod.cloudfoundry.com]: y
Memory reservation (128M, 256M, 512M, 1G, 2G) [256M]: 256M
How many instances? [1]: 1
Create services to bind to 'spacely'? [yN]: y
1: mongodb
2: mysql
3: postgresql
4: rabbitmq
5: redis
What kind of service?: 2
Specify the name of the service [mysql-3e25d]: mydb
Create another? [yN]: n
Would you like to save this configuration? [yN]: y
Manifest written to manifest.yml.
Creating Application: OK
Creating Service [mydb]: OK
Binding Service [mydb]: OK
Uploading Application:
  Checking for available resources: OK
  Processing resources: OK
  Packing application: OK
  Uploading (558K): OK   
Push Status: OK
```
The environmental variables are set as follows
```ruby
vmc env-add spacely aws_access_key_id='aws key id'
vmc env-add spacely aws_secret_access_key = 'aws secret'
vmc env-add spacely fog_directory = 'aws s3 bucket name'
```

Finally to start your app on cloudfoundry 
```ruby 
vmc app start spacely
```

Visit spacely.cloudfoundry.com to view your web application 

PS: The app name is subject to availability so you may not get the same app name as 'spacely' instead 
give your own app names.
