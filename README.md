1. create `app.ts` 👇

```js
import * as createApp from "create-action-server";

const app = createApp();

app.listen(23333);
```

2. mkdir `/api`

then you can add your first action api to `/api` like test.ts👇

```
.
├── api
│   └── testApi.ts
└── app.ts


```

start your server...

3. get a request

```
  {
    "Action": "testApi",
    "testParam": 1
  }
```

more usage...
