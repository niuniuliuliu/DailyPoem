var cacheKey = "first-pwa";  //缓存的key，可以添加多个不同的缓存

var cacheList = [   //需要缓存的文件列表
    'index.html',
    'icon.png',
    'main.css'
];

//在安装过程中缓存已知的资源
self.addEventListener('install', event => {  //监听install事件
    event.waitUntil(  //install完成后
        caches.open(cacheKey)  //打开cache
            .then(cache => cache.addAll(cacheList))  //将需要缓存的文件加入cache列表
            .then(() => self.skipWaiting())  //使 Service Worker 解雇当前活动的worker，
        // 并且一旦进入等待阶段就会激活自身，触发activate事件
        //无需等待用户跳转或刷新页面
    );
});


//拦截fetch请求
self.addEventListener('fetch', event => {
    if (event.request.headers.get('save-data')) {
        // 我们想要节省数据，所以限制了图标和字体
        if (event.request.url.includes('fonts.googleapis.com')) {
            // 不返回任何内容
            event.respondWith(new Promise(resolve => resolve(new Response('', {
                status: 417,
                statusText: 'Ignore fonts to save data.'
            }))));
        }
    }
    if (/register/.test(event.request.url)) {
        event.respondWith(fetch(event.request));
    } else {
        event.respondWith(
            caches.match(event.request).then(response => { //如果请求的资源在缓存中
                if (response != null) return response;  //返回缓存资源

                //通过网络获取资源，并缓存
                var requestToCache = event.request.clone(); //克隆当前请求
                return fetch(requestToCache.url).then(response => {
                    if (!response || response.status !== 200) {
                        return response;  //返回错误的响应
                    }
                    var responseToCache = response.clone(); //克隆响应
                    caches.open(cacheKey)
                        .then(cache => {
                            cache.put(requestToCache, responseToCache);  //将响应添加到缓存中
                        });
                    return response;  //返回响应
                });
            })
        );
    }
});


self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim(); //确保底层 Service Worker 的更新立即生效
});

self.addEventListener('push', function (event) {
    var payload = event.data ? JSON.parse(event.data.text()) : 'no payload';
    var title = 'First PWA';
    event.waitUntil(
        self.registration.showNotification(title, {
            body: payload.msg,
            url: payload.url,
            icon: payload.icon
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: "window"
        }).then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url == '/' && 'focus' in client)
                    return client.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow('http://www.baidu.com');
            }
        })
    );
});