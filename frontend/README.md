# reactcom

React.js based, platform agnostic eCommerce - code name “Recom”

Our idea is to create eCommerce frontend that can be connected to many different eCommerce backends. By backend I mean eCommerce platforms like:
- Magento1,
- Magento2, 
- Shopify Pro,
- Prestashop
 -You name it!

**No backend = No problem**
Recom is backend agnostic what means it can work without backend access; it has it’s own non-sql database (Elastic Search or MongoDB); it’s linearly scalable and support sharding; all communication with backend goes by Message Bus (Rabbit MQ or Kafka) and via REST services / connectors.


**Run**
```
docker-compose up -d
```

**Wait a little bit to install all dependencies in containers.**

**Backend Magento 2**

```
http://127.0.0.1:8061
```

**Magento 2 API**

```
http://devdocs.magento.com/swagger/
```

**Frontend using ReactJS**
```
http://127.0.0.1:8060/
```

**Architecture draft**

![Architecture draft](https://www.dropbox.com/s/1q3xedpmalfzwzv/Zrzut%20ekranu%202017-03-06%2005.59.37.png?dl=1)
