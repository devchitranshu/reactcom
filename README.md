# reactcom

Run 
```
docker-compose up -d
```

**Wait a little bit to install all dependencies in containers.**

**Backend API**

```
http://127.0.0.1:8059
```

**Available static API**

Get product list
```
http://127.0.0.1:8059/api/product
```

Get product by ID where X should be integer
```
http://127.0.0.1:8059/api/product/X
```

**Frontend using ReactJS**
```
http://127.0.0.1:8060/
```

** TODO LIST **
* add api authentication & authorization using symfony security component
* use backend api in react js to retrieve product by id
